import express from 'express';
import * as containerConfig from './container';
import prometheusMiddleware, { metricsHandler } from './prometheus/middleware';

const server = express();

server.use(
  express.json(),
  prometheusMiddleware,
  containerConfig.dependencyInjectionRequestScope,
  containerConfig.controllerLoading,
);

server.get('/metrics', metricsHandler);

const port = 3333;
server.listen(port, () => {
  console.debug(`
  - Email service listening to port ${port}`);
});