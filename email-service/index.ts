import express from 'express';
import * as containerConfig from './container';

const server = express();
server.use(
  express.json(),
  containerConfig.dependencyInjectionRequestScope,
  containerConfig.controllerLoading
);

const port = 3333;
server.listen(port, () => {
  console.debug(`
  - Email service listening to port ${port}`);
});