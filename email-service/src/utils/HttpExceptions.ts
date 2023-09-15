export class HttpException extends Error {
  constructor(public statusCode: number, errorMessage: string) {
    super(errorMessage);
  }
}

export class UnprocessableEntity extends HttpException {
  constructor(errorMessage: string) {
    super(422, errorMessage);
  }
}