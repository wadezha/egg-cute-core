
export class BaseError extends Error {
  status: number;
  code: number;
  msg: string;
  params: string[];

  constructor(code: number, msg: string, status: number = 200, ...params: string[]) {
    super(msg);
    this.code = code;
    this.msg = msg;
    this.status = status;
    this.params = params;
    Error.captureStackTrace(this, this.constructor);
  }
}
