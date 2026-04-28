const AuthService = require('../services/authService');
const logger = require('../utils/logger');

class AuthController {
  /**
   * Register endpoint
   */
  static async register(req, res, next) {
    try {
      const result = await AuthService.register(req.validatedData);
      logger.info(`Registration successful: ${result.user.email}`);
      res.status(201).json(result);
    } catch (error) {
      logger.error('Registration error:', error);
      next(error);
    }
  }

  /**
   * Login endpoint
   */
  static async login(req, res, next) {
    try {
      const { email, password } = req.validatedData;
      const result = await AuthService.login(email, password);
      logger.info(`Login successful: ${result.user.email}`);
      res.status(200).json(result);
    } catch (error) {
      logger.error('Login error:', error);
      next(error);
    }
  }

  /**
   * Refresh token endpoint
   */
  static async refreshToken(req, res, next) {
    try {
      const { refreshToken } = req.body;
      
      if (!refreshToken) {
        return res.status(400).json({
          error: {
            code: 2001,
            message: 'Refresh token is required'
          }
        });
      }

      const result = AuthService.refreshToken(refreshToken);
      res.status(200).json(result);
    } catch (error) {
      logger.error('Token refresh error:', error);
      next(error);
    }
  }

  /**
   * Get current user
   */
  static async getCurrentUser(req, res) {
    try {
      const { User } = require('../models');
      const user = await User.findByPk(req.user.sub);
      
      if (!user) {
        return res.status(404).json({
          error: {
            code: 3002,
            message: 'User not found'
          }
        });
      }

      res.status(200).json({
        user: AuthService.sanitizeUser(user)
      });
    } catch (error) {
      logger.error('Get current user error:', error);
      res.status(500).json({
        error: {
          code: 5001,
          message: 'Internal server error'
        }
      });
    }
  }

  /**
   * Logout endpoint
   */
  static async logout(req, res) {
    try {
      logger.info(`Logout successful: ${req.user.email}`);
      res.status(200).json({
        message: 'Logout successful'
      });
    } catch (error) {
      logger.error('Logout error:', error);
      res.status(500).json({
        error: {
          code: 5001,
          message: 'Internal server error'
        }
      });
    }
  }
}

module.exports = AuthController;
