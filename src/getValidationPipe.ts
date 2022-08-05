import { ValidationPipe, BadRequestException } from '@nestjs/common';

const formatError = (
  errors: any[],
  message: Record<string, any>,
  acumulatedProperty = '',
) => {
  errors.forEach((error) => {
    if (error.children?.length) {
      formatError(
        error.children,
        message,
        acumulatedProperty + error.property + '.',
      );
    } else {
      message[acumulatedProperty + error.property] = Object.values(
        error.constraints,
      );
    }
  });
};

export function getValidationPipe() {
  return new ValidationPipe({
    forbidUnknownValues: true,
    whitelist: true,
    exceptionFactory(errors) {
      const message = {};

      formatError(errors, message);

      throw new BadRequestException({
        statusCode: 400,
        message,
        error: 'Bad Request',
      });
    },
    transform: true,
  });
}
