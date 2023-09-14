import { asClass, asValue, createContainer } from 'awilix';
import { loadControllers, scopePerRequest } from 'awilix-express';

import { PrismaClient } from '@prisma/client';
import EmployeeService from './src/services/EmployeeService';
import UserApiService from './src/services/UserApiService';
import WebhookService from './src/services/WebhookService';

const container = createContainer({
  injectionMode: 'CLASSIC',
});

const prisma = new PrismaClient();

container.register({
  prisma: asValue(prisma),
  employeeService: asClass(EmployeeService),
  userApiService: asClass(UserApiService),
  webhookService: asClass(WebhookService)
});

export const dependencyInjectionRequestScope = scopePerRequest(container);
export const controllerLoading = loadControllers(
  './src/controllers/*.{js,ts}',
  { cwd: __dirname }
);
