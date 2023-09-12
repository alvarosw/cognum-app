import express from 'express';

const server = express();

const port = 3333;
server.listen(port, () => {
  console.debug(`
    - API server listening on http://localhost:${port}/
  `);
});