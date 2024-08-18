class AppError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
    this.isOperational = true;

    Error.captureStackTrace(this, this.constructor);
  }
}

export class ServerError extends AppError {
  constructor(message = "Internal Server Error") {
    super(message, 500);
  }
}

export class AuthError extends AppError {
  constructor(message = "Authentication Failed") {
    super(message, 401);
  }
}

export class ValidationError extends AppError {
  constructor(message = "Invalid Input") {
    super(message, 400);
  }
}

export class NotFoundError extends AppError {
  constructor(message = "User Not Found") {
    super(message, 404);
  }
}
