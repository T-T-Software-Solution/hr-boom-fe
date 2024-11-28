import type { ApiError } from '@backoffice/services/api';
import { ZodError } from 'zod';

enum ErrorMessages {
  DEFAULT = 'เกิดข้อผิดพลาดไม่ทราบสาเหตุ',
}

const zodErrorToString = (error: ZodError): string => {
  return error.errors
    .map(
      (issue) =>
        `${issue.path.length > 0 ? issue.path.join('.') : 'form'}: ${issue.message}`,
    )
    .join('\n');
};

const apiErrorToString = (errors: Record<string, string[]>): string =>
  Object.entries(errors)
    .map(([key, value]) => `${key}: ${value.join(', ')}`)
    .join('\n');

const isApiError = (error: unknown): error is ApiError => {
  return (error as ApiError)?.errors !== undefined;
};

const handleZodError = (error: ZodError): string => {
  return zodErrorToString(error) || ErrorMessages.DEFAULT;
};

const handleApiError = (error: ApiError): string => {
  return error.errors
    ? apiErrorToString(error.errors)
    : error.message ?? ErrorMessages.DEFAULT;
};

export const getErrorMessage = (
  error: unknown,
  defaultMessage = ErrorMessages.DEFAULT,
): string => {
  if (!error) return defaultMessage;

  if (error instanceof ZodError) return handleZodError(error);
  if (isApiError(error)) return handleApiError(error);
  if (error instanceof Error) return error.message;
  if (typeof error === 'string') return error;
  if (typeof error === 'object' && error !== null) return JSON.stringify(error);

  return defaultMessage;
};
