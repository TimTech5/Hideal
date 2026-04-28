const logger = require('../utils/logger');
const { Response, Questionnaire, Consumer } = require('../models');
const { Op } = require('sequelize');

class ResponseService {
  /**
   * Submit survey response
   */
  static async submitResponse(data, barAgentId) {
    try {
      const { questionnaireId, consumerId, responseData } = data;

      // Verify questionnaire exists and is published
      const questionnaire = await Questionnaire.findByPk(questionnaireId);
      if (!questionnaire) {
        const error = new Error('Questionnaire not found');
        error.statusCode = 404;
        error.errorCode = 3001;
        throw error;
      }

      if (questionnaire.status !== 'PUBLISHED') {
        const error = new Error('Questionnaire is not published');
        error.statusCode = 400;
        error.errorCode = 4002;
        throw error;
      }

      // Verify consumer exists
      const consumer = await Consumer.findByPk(consumerId);
      if (!consumer) {
        const error = new Error('Consumer not found');
        error.statusCode = 404;
        error.errorCode = 3001;
        throw error;
      }

      // Create response
      const response = await Response.create({
        questionnaireId,
        consumerId,
        barAgentId,
        responseData,
        completionDate: new Date()
      });

      logger.info(`Response submitted: ${response.id} for questionnaire: ${questionnaireId}`);
      return {
        success: true,
        data: {
          id: response.id,
          questionnaireId: response.questionnaireId,
          consumerId: response.consumerId,
          completionDate: response.completionDate
        },
        message: 'Response submitted successfully'
      };
    } catch (error) {
      logger.error('Error submitting response:', error);
      throw error;
    }
  }

  /**
   * Get all responses for a questionnaire
   */
  static async getResponsesByQuestionnaire(questionnaireId, page = 1, limit = 10) {
    try {
      const offset = (page - 1) * limit;

      const { count, rows } = await Response.findAndCountAll({
        where: { questionnaireId },
        offset,
        limit,
        include: [
          {
            model: Consumer,
            attributes: ['id', 'firstName', 'lastName', 'email', 'ageGroup', 'gender']
          }
        ],
        order: [['completionDate', 'DESC']]
      });

      logger.info(`Fetched ${rows.length} responses for questionnaire: ${questionnaireId}`);
      return {
        success: true,
        data: rows.map(r => ({
          id: r.id,
          questionnaireId: r.questionnaireId,
          consumer: r.Consumer,
          responseData: r.responseData,
          completionDate: r.completionDate
        })),
        pagination: {
          page,
          limit,
          total: count,
          pages: Math.ceil(count / limit)
        },
        message: 'Responses retrieved successfully'
      };
    } catch (error) {
      logger.error('Error fetching responses:', error);
      throw error;
    }
  }

  /**
   * Get all responses by consumer
   */
  static async getResponsesByConsumer(consumerId, page = 1, limit = 10) {
    try {
      const offset = (page - 1) * limit;

      const { count, rows } = await Response.findAndCountAll({
        where: { consumerId },
        offset,
        limit,
        include: [
          {
            model: Questionnaire,
            attributes: ['id', 'title', 'description']
          }
        ],
        order: [['completionDate', 'DESC']]
      });

      logger.info(`Fetched ${rows.length} responses for consumer: ${consumerId}`);
      return {
        success: true,
        data: rows.map(r => ({
          id: r.id,
          questionnaire: r.Questionnaire,
          responseData: r.responseData,
          completionDate: r.completionDate
        })),
        pagination: {
          page,
          limit,
          total: count,
          pages: Math.ceil(count / limit)
        },
        message: 'Responses retrieved successfully'
      };
    } catch (error) {
      logger.error('Error fetching responses:', error);
      throw error;
    }
  }

  /**
   * Get response by ID
   */
  static async getResponseById(responseId) {
    try {
      const response = await Response.findByPk(responseId, {
        include: [
          {
            model: Consumer,
            attributes: ['id', 'firstName', 'lastName', 'email']
          },
          {
            model: Questionnaire,
            attributes: ['id', 'title']
          }
        ]
      });

      if (!response) {
        const error = new Error('Response not found');
        error.statusCode = 404;
        error.errorCode = 3001;
        throw error;
      }

      logger.info(`Fetched response: ${responseId}`);
      return {
        success: true,
        data: {
          id: response.id,
          questionnaire: response.Questionnaire,
          consumer: response.Consumer,
          responseData: response.responseData,
          completionDate: response.completionDate,
          createdAt: response.createdAt
        },
        message: 'Response retrieved successfully'
      };
    } catch (error) {
      logger.error('Error fetching response:', error);
      throw error;
    }
  }

  /**
   * Get response statistics
   */
  static async getResponseStatistics(questionnaireId) {
    try {
      const responses = await Response.findAll({
        where: { questionnaireId },
        attributes: ['responseData']
      });

      const stats = {
        totalResponses: responses.length,
        completionRate: responses.length > 0 ? 100 : 0,
        responsesByDay: {},
        questionAnswerStats: {}
      };

      // Group responses by day
      responses.forEach(r => {
        const date = new Date(r.completionDate).toISOString().split('T')[0];
        stats.responsesByDay[date] = (stats.responsesByDay[date] || 0) + 1;
      });

      logger.info(`Generated statistics for questionnaire: ${questionnaireId}`);
      return {
        success: true,
        data: stats,
        message: 'Statistics retrieved successfully'
      };
    } catch (error) {
      logger.error('Error fetching response statistics:', error);
      throw error;
    }
  }

  /**
   * Delete response
   */
  static async deleteResponse(responseId) {
    try {
      const response = await Response.findByPk(responseId);

      if (!response) {
        const error = new Error('Response not found');
        error.statusCode = 404;
        error.errorCode = 3001;
        throw error;
      }

      await response.destroy();
      logger.info(`Response deleted: ${responseId}`);

      return {
        success: true,
        data: { id: responseId },
        message: 'Response deleted successfully'
      };
    } catch (error) {
      logger.error('Error deleting response:', error);
      throw error;
    }
  }

  /**
   * Export responses to array (for CSV/Excel)
   */
  static async exportResponses(questionnaireId) {
    try {
      const responses = await Response.findAll({
        where: { questionnaireId },
        include: [
          {
            model: Consumer,
            attributes: ['id', 'firstName', 'lastName', 'email', 'ageGroup', 'gender']
          }
        ]
      });

      logger.info(`Exported ${responses.length} responses for questionnaire: ${questionnaireId}`);
      return {
        success: true,
        data: responses,
        message: 'Responses exported successfully'
      };
    } catch (error) {
      logger.error('Error exporting responses:', error);
      throw error;
    }
  }
}

module.exports = ResponseService;
