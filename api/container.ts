import { createContainer } from 'awilix';
import { loadControllers, scopePerRequest } from 'awilix-express';

const container = createContainer({
  injectionMode: 'CLASSIC',
});

export const dependencyInjectionRequestScope = scopePerRequest(container);
export const controllerLoading = loadControllers(
  './src/controllers/*.{js,ts}',
  { cwd: __dirname }
);
