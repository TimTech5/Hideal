const logger = require('../utils/logger');
const { ERROR_CODES } = require('../config/constants');

/**
 * Express error handling middleware
 */
const errorHandler = (err, req, res, next) => {
  logger.error('Error occurred:', {
    message: err.message,
    stack: err.stack,
    url: req.originalUrl,
    method: req.method
  });

  // Sequelize validation error
  if (err.name === 'SequelizeValidationError') {
    return res.status(400).json({
      error: {
        code: ERROR_CODES.VALIDATION_ERROR,
        message: 'Validation error',
        details: err.errors.map(e => ({
          field: e.path,
          message: e.message
        }))
      }
    });
  }

  // Sequelize unique constraint error
  if (err.name === 'SequelizeUniqueConstraintError') {
    return res.status(409).json({
      error: {
        code: ERROR_CODES.DUPLICATE_ENTRY,
        message: 'A record with this value already exists',
        field: err.errors?.[0]?.path
      }
    });
  }

  // JWT errors
  if (err.name === 'JsonWebTokenError') {
    return res.status(401).json({
      error: {
        code: ERROR_CODES.TOKEN_INVALID,
        message: 'Invalid token'
      }
    });
  }

  // Default error response
  res.status(err.statusCode || 500).json({
    error: {
      code: err.code || ERROR_CODES.INTERNAL_SERVER_ERROR,
      message: err.message || 'Internal server error',
      requestId: req.id
    }
  });
};

module.exports = errorHandler;
