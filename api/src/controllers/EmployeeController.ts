import joi from 'joi';
import { Request, Response } from 'express';
import { route, GET, POST, PUT, DELETE } from 'awilix-express';
import { Employee, EmployeeRole } from '@prisma/client';
import { HttpException, UnprocessableEntity } from '../utils/HttpExceptions';

import EmployeeService from '../services/EmployeeService';
import UserApiService from '../services/UserApiService';
import WebhookService from '../services/WebhookService';

type EmployeeWithEmail = Omit<Employee, 'id'> & { email: string; };

@route('/api/employee')
export default class HelloController {
  employeeService: EmployeeService;
  userApiService: UserApiService;
  webhookService: WebhookService;
  saveEmployeeValidator: joi.ObjectSchema<EmployeeWithEmail>;

  constructor(employeeService: EmployeeService, userApiService: UserApiService, webhookService: WebhookService) {
    this.employeeService = employeeService;
    this.userApiService = userApiService;
    this.webhookService = webhookService;

    this.saveEmployeeValidator = joi.object<EmployeeWithEmail>({
      name: joi.string()
        .required()
        .error(new UnprocessableEntity('Property "name" is required and must be string.')),
      email: joi.string()
        .required()
        .email()
        .error(new UnprocessableEntity('Property "email" is required and must be a valid email.')),
      role: joi.string()
        .valid(...Object.values(EmployeeRole))
        .required()
        .error(new UnprocessableEntity(
          'Property "role" is required and must be one of the acceptable values: ' + Object.values(EmployeeRole).join(', ')
        ))
    });
  }

  @GET()
  @route('/populate')
  async populate(_: Request, res: Response) {
    try {
      const randomUsers = await this.userApiService.fetchUsers();
      const employeeRoles = Object.values(EmployeeRole);
      const randomEmployees: Omit<EmployeeWithEmail, 'id'>[] = randomUsers.map(user => ({
        name: user.name,
        email: user.email,
        role: employeeRoles[Math.floor(Math.random() * employeeRoles.length)] // random role
      }));

      const result = await this.employeeService.saveBatch(randomEmployees.map(this.removeEmailFromEmployee));
      this.webhookService.postEmployee(randomEmployees);

      return res.status(201).send(result);
    } catch (error) {
      console.error(error);
      if (error instanceof HttpException)
        return res.status(error.statusCode).send({ message: error.message });
      return res.status(500).send({ message: 'Something went wrong. Try again later.' });
    }
  }

  @GET()
  async get(_: Request, res: Response) {
    try {
      return res.send(await this.employeeService.getEmployees());
    } catch (error) {
      console.error(error);
      if (error instanceof HttpException)
        return res.status(error.statusCode).send({ message: error.message });
      return res.status(500).send({ message: 'Something went wrong. Try again later.' });
    }
  }

  @GET()
  @route('/:id')
  async getById(req: Request, res: Response) {
    try {
      const { id } = req.params;
      return res.send(await this.employeeService.getEmployeeById(id));
    } catch (error) {
      console.error(error);
      if (error instanceof HttpException)
        return res.status(error.statusCode).send({ message: error.message });
      return res.status(500).send({ message: 'Something went wrong. Try again later.' });
    }
  }

  @POST()
  async create(req: Request, res: Response) {
    try {
      const payload = await this.saveEmployeeValidator.validateAsync(req.body);

      const result = await this.employeeService.createEmployee(this.removeEmailFromEmployee(payload));
      this.webhookService.postEmployee(payload);

      return res.status(201).send(result);
    } catch (error) {
      console.error(error);
      if (error instanceof HttpException)
        return res.status(error.statusCode).send({ message: error.message });
      return res.status(500).send({ message: 'Something went wrong. Try again later.' });
    }
  }

  @PUT()
  @route('/:id')
  async update(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const payload = await this.saveEmployeeValidator.validateAsync(req.body);

      const result = await this.employeeService.updateEmployee(id, this.removeEmailFromEmployee(payload));
      this.webhookService.postEmployee(payload);

      return res.send(result);
    } catch (error) {
      console.error(error);
      if (error instanceof HttpException)
        return res.status(error.statusCode).send({ message: error.message });
      return res.status(500).send({ message: 'Something went wrong. Try again later.' });
    }
  }

  @DELETE()
  @route('/:id')
  async delete(req: Request, res: Response) {
    try {
      const { id } = req.params;
      return res.send(await this.employeeService.deleteEmployee(id));
    } catch (error) {
      console.error(error);
      if (error instanceof HttpException)
        return res.status(error.statusCode).send({ message: error.message });
      return res.status(500).send({ message: 'Something went wrong. Try again later.' });
    }
  }

  private removeEmailFromEmployee(data: EmployeeWithEmail): Omit<Employee, 'id'> {
    const noEmailEmployee: Omit<Employee, 'id'> = Object.assign({}, data); // cloning without reference
    delete (noEmailEmployee as { email?: string; }).email;

    return noEmailEmployee;
  }
}