import { asClass, asValue, createContainer } from 'awilix';
import { loadControllers, scopePerRequest } from 'awilix-express';

import { PrismaClient } from '@prisma/client';
import ContactService from './src/services/ContactService';
import EmailService from './src/services/EmailService';
import CacheService from './src/services/CacheService';

const container = createContainer({
  injectionMode: 'CLASSIC',
});

const prisma = new PrismaClient();

container.register({
  prisma: asValue(prisma),
  contactService: asClass(ContactService),
  emailService: asClass(EmailService),
  cacheService: asClass(CacheService),
});

export const dependencyInjectionRequestScope = scopePerRequest(container);
export const controllerLoading = loadControllers(
  './src/controllers/*.{js,ts}',
  { cwd: __dirname }
);
