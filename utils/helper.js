import dotenv from 'dotenv'
dotenv.config();

export const sendResponse = (
  res,
  statusCode,
  message,
  data = null,
  errors = null
) => {
  return res.status(statusCode).json({
    status: statusCode,
    message: message || 'success',
    data,
    errors,
  });
};

export const validate = (schema, options = {}) => {
  return (req, res, next) => {
    const { value, error } = schema.validate(
      // @ts-ignore
      options?.field ? req[options.field] : req.body,
      {
        abortEarly: false,
        allowUnknown: true,
        stripUnknown: true,
        errors: {
          wrap: {
            label: '',
          },
        },
        ...options,
      }
    );

    if (error) {
      const errors = error.details.reduce(
        (prev, cur) => ({
          ...prev,
          [cur.context?.key || 'error']: cur.message,
        }),
        { error: null }
      );
      // @ts-ignore
      errors.error = error.message;
      return sendResponse(res, 422, 'Validation error', null, errors);
    }

    req.body = value;
    next();
  };
};

export const verifyApiKey = (req, res, next) => {
  const providedApiKey = req.headers['x-api-key'];
  console.log(providedApiKey)
  console.log(process.env.XAPI_KEY)
 
  if (!providedApiKey || providedApiKey !== process.env.XAPI_KEY) {
    return res.status(401).json({ message: 'Unauthorized: Invalid API key' });
  }
  next();
}