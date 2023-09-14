import { Employee, PrismaClient } from '@prisma/client';

export default class EmployeeService {
  employeeRepo;
  constructor(prisma: PrismaClient) {
    this.employeeRepo = prisma.employee;
  }

  async getEmployees() {
    return this.employeeRepo.findMany();
  }

  async getEmployeeById(id: string) {
    return this.employeeRepo.findFirst({ where: { id } });
  }

  async createEmployee(employee: Omit<Employee, 'id'>) {
    return this.employeeRepo.create({ data: employee });
  }

  async updateEmployee(id: string, employee: Omit<Employee, 'id'>) {
    return this.employeeRepo.update({ where: { id }, data: employee });
  }

  async deleteEmployee(id: string) {
    return this.employeeRepo.delete({ where: { id } });
  }
}