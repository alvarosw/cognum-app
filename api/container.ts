import { asClass, asValue, createContainer } from 'awilix';
import { loadControllers, scopePerRequest } from 'awilix-express';

import { PrismaClient } from '@prisma/client';
import EmployeeService from './src/services/EmployeeService';

const container = createContainer({
  injectionMode: 'CLASSIC',
});

const prisma = new PrismaClient();

container.register({
  prisma: asValue(prisma),
  employeeService: asClass(EmployeeService)
});

export const dependencyInjectionRequestScope = scopePerRequest(container);
export const controllerLoading = loadControllers(
  './src/controllers/*.{js,ts}',
  { cwd: __dirname }
);
