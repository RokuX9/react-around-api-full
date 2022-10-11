module.exports.responseStatus = {
  success: {
    code: 200,
  },
  badRequest: {
    code: 400,
    message: (err) => ({ message: err }),
  },
  notFound: {
    code: 404,
    message: () => ({ message: 'Not found' }),
  },
  serverError: {
    code: 500,
    message: () => ({ message: 'Server error' }),
  },
};

module.exports.customErrors = {
  badRequest: (message) => {
    const error = new Error(message);
    error.code = 400;
    return error;
  },
  notAuthorized: () => {
    const error = new Error('Not Authorized');
    error.code = 403;
    return error;
  },
  notFound: () => {
    const error = new Error('Not Found');
    error.code = 404;
    return error;
  },
  alreadyExist: () => {
    const error = new Error('Already Exist');
    error.code = 409;
    return error;
  },
  serverError: () => {
    const error = new Error('Server Error');
    error.code = 500;
  },
};

module.exports.serverURL = 'mongodb://localhost:27017/aroundb';
