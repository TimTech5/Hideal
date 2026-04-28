const express = require('express');
const router = express.Router();
const AuthController = require('../controllers/authController');
const { verifyToken } = require('../middleware/auth');
const { validate, schemas } = require('../utils/validators');

/**
 * POST /api/auth/register
 * Register a new user
 */
router.post('/register', validate(schemas.register), AuthController.register);

/**
 * POST /api/auth/login
 * Login user
 */
router.post('/login', validate(schemas.login), AuthController.login);

/**
 * POST /api/auth/refresh-token
 * Refresh access token
 */
router.post('/refresh-token', AuthController.refreshToken);

/**
 * GET /api/auth/me
 * Get current user details
 */
router.get('/me', verifyToken, AuthController.getCurrentUser);

/**
 * POST /api/auth/logout
 * Logout user
 */
router.post('/logout', verifyToken, AuthController.logout);

module.exports = router;
