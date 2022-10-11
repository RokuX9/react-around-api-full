module.exports = (err, req, res, next) => {
  const { message, code = 500 } = err;
  res.status(code).send({ message: code === 500 ? "Server Error" : message });
};
