const jwt = require('jsonwebtoken');
const config = require('../config/environment');
const logger = require('../utils/logger');
const { ERROR_CODES } = require('../config/constants');

/**
 * Verify JWT token and attach user to request
 */
const verifyToken = (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
      return res.status(401).json({
        error: {
          code: ERROR_CODES.TOKEN_INVALID,
          message: 'No token provided'
        }
      });
    }

    jwt.verify(token, config.jwt.secret, (err, decoded) => {
      if (err) {
        const code = err.name === 'TokenExpiredError' 
          ? ERROR_CODES.TOKEN_EXPIRED 
          : ERROR_CODES.TOKEN_INVALID;
        
        return res.status(401).json({
          error: {
            code,
            message: err.message
          }
        });
      }

      req.user = decoded;
      next();
    });
  } catch (error) {
    logger.error('Token verification error:', error);
    res.status(500).json({
      error: {
        code: ERROR_CODES.INTERNAL_SERVER_ERROR,
        message: 'Token verification failed'
      }
    });
  }
};

/**
 * Check if user has required role
 */
const authorize = (...allowedRoles) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({
        error: {
          code: ERROR_CODES.UNAUTHORIZED,
          message: 'User not authenticated'
        }
      });
    }

    if (!allowedRoles.includes(req.user.role)) {
      logger.warn(`Unauthorized access attempt by user ${req.user.id} for role ${req.user.role}`);
      return res.status(403).json({
        error: {
          code: ERROR_CODES.FORBIDDEN,
          message: 'You do not have permission to access this resource'
        }
      });
    }

    next();
  };
};

module.exports = {
  verifyToken,
  authorize
};
