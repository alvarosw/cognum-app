import express from 'express';

const server = express();
server.use(express.json());

server.post('/webhook', (req: any, res: any) => {
  return res.send('Hello, world!');
});

const port = 3333;
server.listen(port, () => {
  console.debug(`
  - Email service listening to port ${port}`);
});