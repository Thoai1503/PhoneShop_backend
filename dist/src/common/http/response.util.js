export function shouldUseStandardResponse(req) {
    const headerValue = String(req.header('x-response-format') || '').toLowerCase();
    const queryValue = String(req.query?.responseFormat ||
        req.query?.format ||
        '').toLowerCase();
    return (headerValue === 'standard' ||
        headerValue === 'unified' ||
        headerValue === 'v2' ||
        queryValue === 'standard' ||
        queryValue === 'unified' ||
        queryValue === 'v2');
}
export function respondSuccess(req, res, statusCode, legacyBody, options) {
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
export function respondError(req, res, statusCode, legacyBody, message = 'Error') {
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
//# sourceMappingURL=response.util.js.map