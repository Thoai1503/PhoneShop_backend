import type { Request, Response } from 'express';

type SuccessOptions = {
  message?: string;
  data?: any;
  meta?: any;
};

export function shouldUseStandardResponse(req: Request): boolean {
  const headerValue = String(
    req.header('x-response-format') || '',
  ).toLowerCase();
  const queryValue = String(
    (req.query?.responseFormat as string) ||
      (req.query?.format as string) ||
      '',
  ).toLowerCase();

  return (
    headerValue === 'standard' ||
    headerValue === 'unified' ||
    headerValue === 'v2' ||
    queryValue === 'standard' ||
    queryValue === 'unified' ||
    queryValue === 'v2'
  );
}

export function respondSuccess(
  req: Request,
  res: Response,
  statusCode: number,
  legacyBody: any,
  options?: SuccessOptions,
): Response {
  if (!shouldUseStandardResponse(req)) {
    return res.status(statusCode).json(legacyBody);
  }

  return res.status(statusCode).json({
    success: true,
    statusCode,
    message: options?.message || 'Success',
    data: options?.data !== undefined ? options.data : legacyBody,
    meta: options?.meta,
    timestamp: new Date().toISOString(),
  });
}

export function respondError(
  req: Request,
  res: Response,
  statusCode: number,
  legacyBody: any,
  message = 'Error',
): Response {
  if (!shouldUseStandardResponse(req)) {
    return res.status(statusCode).json(legacyBody);
  }

  return res.status(statusCode).json({
    success: false,
    statusCode,
    message,
    data: null,
    error: legacyBody,
    timestamp: new Date().toISOString(),
  });
}
