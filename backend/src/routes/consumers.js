const express = require('express');
const router = express.Router();
const ConsumerController = require('../controllers/consumerController');
const { verifyToken, authorize } = require('../middleware/auth');
const { validate, schemas } = require('../utils/validators');

/**
 * POST /api/consumers
 * Create a new consumer
 */
router.post('/', validate(schemas.createConsumer), ConsumerController.createConsumer);

/**
 * GET /api/consumers
 * Get all consumers with pagination
 */
router.get('/', verifyToken, ConsumerController.getConsumers);

/**
 * GET /api/consumers/:id
 * Get consumer by ID
 */
router.get('/:id', verifyToken, ConsumerController.getConsumerById);

/**
 * PUT /api/consumers/:id
 * Update consumer
 */
router.put('/:id', verifyToken, validate(schemas.updateConsumer), ConsumerController.updateConsumer);

/**
 * DELETE /api/consumers/:id
 * Delete consumer
 */
router.delete('/:id', verifyToken, authorize('ADMIN', 'BAR_MANAGER'), ConsumerController.deleteConsumer);

/**
 * POST /api/consumers/:id/preferences
 * Add consumer preference
 */
router.post('/:id/preferences', verifyToken, ConsumerController.addPreference);

/**
 * GET /api/consumers/:id/preferences
 * Get consumer preferences
 */
router.get('/:id/preferences', verifyToken, ConsumerController.getPreferences);

module.exports = router;
