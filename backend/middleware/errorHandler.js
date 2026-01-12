export default function errorHandler(err, req, res, next) {
  console.error(err);

  const status = err.statusCode || 500;
  const message = err.message || "Server error";
  const code = err.code || "SERVER_ERROR";

  res.status(status).json({
    success: false,
    message,
    error: { code, details: err.details || [] }
  });
}
