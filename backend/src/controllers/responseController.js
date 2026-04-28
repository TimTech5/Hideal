const ResponseService = require('../services/responseService');
const logger = require('../utils/logger');

class ResponseController {
  /**
   * Submit survey response
   */
  static async submitResponse(req, res, next) {
    try {
      const barAgentId = req.user.role === 'BAR_AGENT' ? req.user.id : null;
      const result = await ResponseService.submitResponse(req.body, barAgentId);
      return res.status(201).json(result);
    } catch (error) {
      logger.error('Error in submitResponse controller:', error);
      next(error);
    }
  }

  /**
   * Get responses by questionnaire
   */
  static async getResponsesByQuestionnaire(req, res, next) {
    try {
      const { questionnaireId } = req.params;
      const { page = 1, limit = 10 } = req.query;

      const result = await ResponseService.getResponsesByQuestionnaire(
        questionnaireId,
        parseInt(page),
        parseInt(limit)
      );
      return res.status(200).json(result);
    } catch (error) {
      logger.error('Error in getResponsesByQuestionnaire controller:', error);
      next(error);
    }
  }

  /**
   * Get responses by consumer
   */
  static async getResponsesByConsumer(req, res, next) {
    try {
      const { consumerId } = req.params;
      const { page = 1, limit = 10 } = req.query;

      const result = await ResponseService.getResponsesByConsumer(
        consumerId,
        parseInt(page),
        parseInt(limit)
      );
      return res.status(200).json(result);
    } catch (error) {
      logger.error('Error in getResponsesByConsumer controller:', error);
      next(error);
    }
  }

  /**
   * Get response by ID
   */
  static async getResponseById(req, res, next) {
    try {
      const { id } = req.params;
      const result = await ResponseService.getResponseById(id);
      return res.status(200).json(result);
    } catch (error) {
      logger.error('Error in getResponseById controller:', error);
      next(error);
    }
  }

  /**
   * Get response statistics
   */
  static async getResponseStatistics(req, res, next) {
    try {
      const { questionnaireId } = req.params;
      const result = await ResponseService.getResponseStatistics(questionnaireId);
      return res.status(200).json(result);
    } catch (error) {
      logger.error('Error in getResponseStatistics controller:', error);
      next(error);
    }
  }

  /**
   * Delete response
   */
  static async deleteResponse(req, res, next) {
    try {
      const { id } = req.params;
      const result = await ResponseService.deleteResponse(id);
      return res.status(200).json(result);
    } catch (error) {
      logger.error('Error in deleteResponse controller:', error);
      next(error);
    }
  }

  /**
   * Export responses
   */
  static async exportResponses(req, res, next) {
    try {
      const { questionnaireId } = req.params;
      const result = await ResponseService.exportResponses(questionnaireId);
      return res.status(200).json(result);
    } catch (error) {
      logger.error('Error in exportResponses controller:', error);
      next(error);
    }
  }
}

module.exports = ResponseController;
