import e from "express";

export class WebApplicationError extends Error {
  constructor(
    message: string,
    readonly status: number,
  ) {
    super(message);
  }

  reject(): Promise<never> {
    return Promise.reject(this);
  }

  static handler(): e.ErrorRequestHandler {
    return (err, _, res, next) => {
      if (err instanceof WebApplicationError) {
        res
          .status(err.status)
          .json({
            type: err.constructor.name,
            message: err.message,
          });
      }

      next(err);
    }
  }
}