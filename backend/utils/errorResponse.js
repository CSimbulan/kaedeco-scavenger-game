// Custom Error Handling by extending Error class
export class ErrorResponse extends Error {
  // It will take a "message" and "statusCode"
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
  }
}
