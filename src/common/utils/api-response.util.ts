export class ApiResponse {
  static success<T>(data: T, message = 'Success') {
    return {
      status: true,
      message,
      data,
    };
  }

  static pagination<T>(data: T, meta: Record<string, unknown>, message = 'Success') {
    return {
      status: true,
      message,
      data,
      meta,
    };
  }

  static error(message = 'Something went wrong', statusCode = 500, errors?: unknown) {
    return {
      status: false,
      statusCode,
      message,
      errors,
    };
  }
}
