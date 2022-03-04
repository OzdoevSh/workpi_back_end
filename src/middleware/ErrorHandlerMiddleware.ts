import ApiError = require('../error/ApiError');

export default function errorHandler(err, req, res, next) {
  if (err instanceof ApiError) {
    return res.status(err.status).json({ message: err.message })
  }
  return res.status(500).json({ message: "Unexpectable error!" })
}