const QuestionnaireService = require('../services/questionnaireService');
const logger = require('../utils/logger');

class QuestionnaireController {
  /**
   * Create new questionnaire
   */
  static async createQuestionnaire(req, res, next) {
    try {
      const result = await QuestionnaireService.createQuestionnaire(req.body, req.user.id);
      return res.status(201).json(result);
    } catch (error) {
      logger.error('Error in createQuestionnaire controller:', error);
      next(error);
    }
  }

  /**
   * Get all questionnaires
   */
  static async getQuestionnaires(req, res, next) {
    try {
      const { page = 1, limit = 10, status, title, creatorId } = req.query;
      const filters = {};

      if (status) filters.status = status;
      if (title) filters.title = title;
      if (creatorId) filters.creatorId = creatorId;

      const result = await QuestionnaireService.getQuestionnaires(
        parseInt(page),
        parseInt(limit),
        filters
      );
      return res.status(200).json(result);
    } catch (error) {
      logger.error('Error in getQuestionnaires controller:', error);
      next(error);
    }
  }

  /**
   * Get questionnaire by ID
   */
  static async getQuestionnaireById(req, res, next) {
    try {
      const { id } = req.params;
      const result = await QuestionnaireService.getQuestionnaireById(id);
      return res.status(200).json(result);
    } catch (error) {
      logger.error('Error in getQuestionnaireById controller:', error);
      next(error);
    }
  }

  /**
   * Update questionnaire
   */
  static async updateQuestionnaire(req, res, next) {
    try {
      const { id } = req.params;
      const result = await QuestionnaireService.updateQuestionnaire(id, req.body);
      return res.status(200).json(result);
    } catch (error) {
      logger.error('Error in updateQuestionnaire controller:', error);
      next(error);
    }
  }

  /**
   * Publish questionnaire
   */
  static async publishQuestionnaire(req, res, next) {
    try {
      const { id } = req.params;
      const result = await QuestionnaireService.publishQuestionnaire(id);
      return res.status(200).json(result);
    } catch (error) {
      logger.error('Error in publishQuestionnaire controller:', error);
      next(error);
    }
  }

  /**
   * Close questionnaire
   */
  static async closeQuestionnaire(req, res, next) {
    try {
      const { id } = req.params;
      const result = await QuestionnaireService.closeQuestionnaire(id);
      return res.status(200).json(result);
    } catch (error) {
      logger.error('Error in closeQuestionnaire controller:', error);
      next(error);
    }
  }

  /**
   * Delete questionnaire
   */
  static async deleteQuestionnaire(req, res, next) {
    try {
      const { id } = req.params;
      const result = await QuestionnaireService.deleteQuestionnaire(id);
      return res.status(200).json(result);
    } catch (error) {
      logger.error('Error in deleteQuestionnaire controller:', error);
      next(error);
    }
  }

  /**
   * Get questions for questionnaire
   */
  static async getQuestions(req, res, next) {
    try {
      const { id } = req.params;
      const result = await QuestionnaireService.getQuestions(id);
      return res.status(200).json(result);
    } catch (error) {
      logger.error('Error in getQuestions controller:', error);
      next(error);
    }
  }

  /**
   * Get response count
   */
  static async getResponseCount(req, res, next) {
    try {
      const { id } = req.params;
      const result = await QuestionnaireService.getResponseCount(id);
      return res.status(200).json(result);
    } catch (error) {
      logger.error('Error in getResponseCount controller:', error);
      next(error);
    }
  }
}

module.exports = QuestionnaireController;
