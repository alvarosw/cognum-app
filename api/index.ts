import express from 'express';
import * as containerConfig from './container';

const server = express();

server.use(
  containerConfig.dependencyInjectionRequestScope,
  containerConfig.controllerLoading
);

const port = 3000;
server.listen(port, () => {
  console.debug(`
    - API server listening on http://localhost:${port}/api/
  `);
});