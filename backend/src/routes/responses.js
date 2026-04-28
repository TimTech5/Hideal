const express = require('express');
const { verifyToken, authorize } = require('../middleware/auth');
const { validate } = require('../utils/validators');
const ResponseController = require('../controllers/responseController');
const Joi = require('joi');

const router = express.Router();

// Validation schema for submitting response
const submitResponseSchema = Joi.object({
  questionnaireId: Joi.number().required(),
  consumerId: Joi.number().required(),
  responseData: Joi.object().required()
});

// Routes

/**
 * POST /api/responses
 * Submit survey response
 * Role: CONSUMER, BAR_AGENT
 */
router.post(
  '/',
  verifyToken,
  authorize(['CONSUMER', 'BAR_AGENT']),
  validate(submitResponseSchema),
  ResponseController.submitResponse
);

/**
 * GET /api/responses/questionnaire/:questionnaireId
 * Get all responses for a questionnaire
 * Role: ADMIN, BAR_MANAGER
 */
router.get(
  '/questionnaire/:questionnaireId',
  verifyToken,
  authorize(['ADMIN', 'BAR_MANAGER']),
  ResponseController.getResponsesByQuestionnaire
);

/**
 * GET /api/responses/consumer/:consumerId
 * Get all responses by consumer
 * Role: CONSUMER, ADMIN
 */
router.get(
  '/consumer/:consumerId',
  verifyToken,
  authorize(['CONSUMER', 'ADMIN']),
  ResponseController.getResponsesByConsumer
);

/**
 * GET /api/responses/:id
 * Get response by ID
 * Role: ADMIN, BAR_MANAGER
 */
router.get(
  '/:id',
  verifyToken,
  authorize(['ADMIN', 'BAR_MANAGER']),
  ResponseController.getResponseById
);

/**
 * GET /api/responses/questionnaire/:questionnaireId/statistics
 * Get response statistics
 * Role: ADMIN, BAR_MANAGER
 */
router.get(
  '/questionnaire/:questionnaireId/statistics',
  verifyToken,
  authorize(['ADMIN', 'BAR_MANAGER']),
  ResponseController.getResponseStatistics
);

/**
 * GET /api/responses/questionnaire/:questionnaireId/export
 * Export responses
 * Role: ADMIN, BAR_MANAGER
 */
router.get(
  '/questionnaire/:questionnaireId/export',
  verifyToken,
  authorize(['ADMIN', 'BAR_MANAGER']),
  ResponseController.exportResponses
);

/**
 * DELETE /api/responses/:id
 * Delete response
 * Role: ADMIN
 */
router.delete(
  '/:id',
  verifyToken,
  authorize(['ADMIN']),
  ResponseController.deleteResponse
);

module.exports = router;
