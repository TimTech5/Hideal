const express = require('express');
const { verifyToken, authorize } = require('../middleware/auth');
const { validate } = require('../utils/validators');
const QuestionnaireController = require('../controllers/questionnaireController');
const Joi = require('joi');

const router = express.Router();

// Validation schema for creating questionnaire
const createQuestionnaireSchema = Joi.object({
  title: Joi.string().required().min(3).max(200),
  description: Joi.string().optional().max(1000),
  targetAudience: Joi.string().optional(),
  questions: Joi.array().items(
    Joi.object({
      questionText: Joi.string().required(),
      questionType: Joi.string().required().valid(
        'TEXT',
        'MULTIPLE_CHOICE',
        'RATING',
        'DATE',
        'CHECKBOX'
      ),
      requiredFlag: Joi.boolean().optional(),
      options: Joi.array().items(Joi.string()).optional()
    })
  ).optional()
});

// Validation schema for updating questionnaire
const updateQuestionnaireSchema = Joi.object({
  title: Joi.string().optional().min(3).max(200),
  description: Joi.string().optional().max(1000),
  targetAudience: Joi.string().optional(),
  questions: Joi.array().items(
    Joi.object({
      questionText: Joi.string().required(),
      questionType: Joi.string().required().valid(
        'TEXT',
        'MULTIPLE_CHOICE',
        'RATING',
        'DATE',
        'CHECKBOX'
      ),
      requiredFlag: Joi.boolean().optional(),
      options: Joi.array().items(Joi.string()).optional()
    })
  ).optional()
});

// Routes

/**
 * POST /api/questionnaires
 * Create new questionnaire
 * Role: ADMIN, BAR_MANAGER
 */
router.post(
  '/',
  verifyToken,
  authorize(['ADMIN', 'BAR_MANAGER']),
  validate(createQuestionnaireSchema),
  QuestionnaireController.createQuestionnaire
);

/**
 * GET /api/questionnaires
 * Get all questionnaires with pagination and filters
 * Role: All authenticated users
 */
router.get(
  '/',
  verifyToken,
  QuestionnaireController.getQuestionnaires
);

/**
 * GET /api/questionnaires/:id
 * Get questionnaire by ID with questions
 * Role: All authenticated users
 */
router.get(
  '/:id',
  verifyToken,
  QuestionnaireController.getQuestionnaireById
);

/**
 * GET /api/questionnaires/:id/questions
 * Get questions for questionnaire
 * Role: All authenticated users
 */
router.get(
  '/:id/questions',
  verifyToken,
  QuestionnaireController.getQuestions
);

/**
 * GET /api/questionnaires/:id/response-count
 * Get response count for questionnaire
 * Role: All authenticated users
 */
router.get(
  '/:id/response-count',
  verifyToken,
  QuestionnaireController.getResponseCount
);

/**
 * PUT /api/questionnaires/:id
 * Update questionnaire (only DRAFT)
 * Role: ADMIN, BAR_MANAGER
 */
router.put(
  '/:id',
  verifyToken,
  authorize(['ADMIN', 'BAR_MANAGER']),
  validate(updateQuestionnaireSchema),
  QuestionnaireController.updateQuestionnaire
);

/**
 * PATCH /api/questionnaires/:id/publish
 * Publish questionnaire
 * Role: ADMIN, BAR_MANAGER
 */
router.patch(
  '/:id/publish',
  verifyToken,
  authorize(['ADMIN', 'BAR_MANAGER']),
  QuestionnaireController.publishQuestionnaire
);

/**
 * PATCH /api/questionnaires/:id/close
 * Close questionnaire (no more responses)
 * Role: ADMIN, BAR_MANAGER
 */
router.patch(
  '/:id/close',
  verifyToken,
  authorize(['ADMIN', 'BAR_MANAGER']),
  QuestionnaireController.closeQuestionnaire
);

/**
 * DELETE /api/questionnaires/:id
 * Delete questionnaire (only DRAFT)
 * Role: ADMIN
 */
router.delete(
  '/:id',
  verifyToken,
  authorize(['ADMIN']),
  QuestionnaireController.deleteQuestionnaire
);

module.exports = router;
