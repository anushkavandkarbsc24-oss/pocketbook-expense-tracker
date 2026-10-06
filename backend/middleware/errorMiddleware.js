// Runs when no route matched
const notFound = (req, res) => {
  res.status(404).json({ message: `Route not found: ${req.originalUrl}` });
};

// Central error handler: any controller can call next(error)
const errorHandler = (err, req, res, next) => {
  console.error(err.message);
  if (err.name === 'CastError') {
    return res.status(400).json({ message: 'Invalid ID' });
  }
  if (err.name === 'ValidationError') {
    return res.status(400).json({ message: err.message });
  }
  res.status(500).json({ message: 'Server error. Please try again.' });
};

module.exports = { notFound, errorHandler };
