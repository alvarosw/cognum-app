import { Request, Response } from 'express';
import { route, GET } from 'awilix-express';

@route('/api/hello')
export default class HelloController {
  @GET()
  async getHello(_: Request, res: Response) {
    return res.send({ message: "Hello, Cognum!" });
  }
}