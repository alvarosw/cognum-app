import joi from 'joi';
import { Request, Response } from 'express';
import { route, GET, POST, PUT, DELETE } from 'awilix-express';
import { EmployeeRole } from '@prisma/client';
import { HttpException, UnprocessableEntity } from '../utils/HttpExceptions';
import EmployeeService from '../services/EmployeeService';

@route('/api/employee')
export default class HelloController {
  employeeService: EmployeeService;
  saveEmployeeValidator: joi.ObjectSchema;

  constructor(employeeService: EmployeeService) {
    this.employeeService = employeeService;

    this.saveEmployeeValidator = joi.object({
      name: joi.string()
        .required()
        .error(new UnprocessableEntity('Property "name" is required and must be string.')),
      role: joi.string()
        .valid(...Object.values(EmployeeRole))
        .required()
        .error(new UnprocessableEntity(
          'Property "role" is required and must be one of the acceptable values: ' + Object.values(EmployeeRole).join(', ')
        ))
    });
  }

  @GET()
  async get(_: Request, res: Response) {
    try {
      return res.send(await this.employeeService.getEmployees());
    } catch (error) {
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
      if (error instanceof HttpException)
        return res.status(error.statusCode).send({ message: error.message });
      return res.status(500).send({ message: 'Something went wrong. Try again later.' });
    }
  }

  @POST()
  async create(req: Request, res: Response) {
    try {
      const payload = await this.saveEmployeeValidator.validateAsync(req.body);
      return res.send(await this.employeeService.createEmployee(payload));
    } catch (error) {
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
      return res.send(await this.employeeService.updateEmployee(id, payload));
    } catch (error) {
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
      if (error instanceof HttpException)
        return res.status(error.statusCode).send({ message: error.message });
      return res.status(500).send({ message: 'Something went wrong. Try again later.' });
    }
  }
}