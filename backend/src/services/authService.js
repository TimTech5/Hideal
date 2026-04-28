const jwt = require('jsonwebtoken');
const config = require('../config/environment');
const { User } = require('../models');
const logger = require('../utils/logger');

class AuthService {
  /**
   * Register a new user
   */
  static async register(userData) {
    try {
      const existingUser = await User.findOne({ where: { email: userData.email } });
      
      if (existingUser) {
        const error = new Error('Email already exists');
        error.code = 2004;
        throw error;
      }

      const user = await User.create({
        email: userData.email,
        passwordHash: userData.password,
        fullName: userData.fullName,
        role: userData.role || 'CONSUMER'
      });

      const tokens = this.generateTokens(user);
      logger.info(`User registered: ${user.id} (${user.email})`);

      return {
        user: this.sanitizeUser(user),
        ...tokens
      };
    } catch (error) {
      logger.error('Registration error:', error);
      throw error;
    }
  }

  /**
   * Login user
   */
  static async login(email, password) {
    try {
      const user = await User.findOne({ where: { email } });

      if (!user || !(await user.comparePassword(password))) {
        const error = new Error('Invalid email or password');
        error.code = 1001;
        throw error;
      }

      if (!user.active) {
        const error = new Error('User account is inactive');
        error.code = 4002;
        throw error;
      }

      // Update last login
      await user.update({ lastLoginAt: new Date() });

      const tokens = this.generateTokens(user);
      logger.info(`User logged in: ${user.id} (${user.email})`);

      return {
        user: this.sanitizeUser(user),
        ...tokens
      };
    } catch (error) {
      logger.error('Login error:', error);
      throw error;
    }
  }

  /**
   * Generate JWT tokens
   */
  static generateTokens(user) {
    const payload = {
      sub: user.id,
      email: user.email,
      role: user.role,
      iat: Math.floor(Date.now() / 1000)
    };

    const token = jwt.sign(payload, config.jwt.secret, {
      expiresIn: config.jwt.expiresIn
    });

    const refreshToken = jwt.sign(payload, config.jwt.secret, {
      expiresIn: config.jwt.refreshExpiresIn
    });

    return { token, refreshToken };
  }

  /**
   * Verify refresh token and generate new access token
   */
  static refreshToken(refreshToken) {
    try {
      const decoded = jwt.verify(refreshToken, config.jwt.secret);
      
      const payload = {
        sub: decoded.sub,
        email: decoded.email,
        role: decoded.role,
        iat: Math.floor(Date.now() / 1000)
      };

      const newToken = jwt.sign(payload, config.jwt.secret, {
        expiresIn: config.jwt.expiresIn
      });

      return { token: newToken };
    } catch (error) {
      const err = new Error('Invalid refresh token');
      err.code = 1003;
      throw err;
    }
  }

  /**
   * Remove sensitive information from user object
   */
  static sanitizeUser(user) {
    return {
      id: user.id,
      email: user.email,
      fullName: user.fullName,
      role: user.role,
      active: user.active,
      createdAt: user.createdAt
    };
  }
}

module.exports = AuthService;
