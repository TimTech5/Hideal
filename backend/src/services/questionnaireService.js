const logger = require('../utils/logger');
const { Questionnaire, Question, Response, User } = require('../models');
const { Op } = require('sequelize');

class QuestionnaireService {
  /**
   * Create a new questionnaire
   */
  static async createQuestionnaire(data, userId) {
    try {
      const {
        title,
        description,
        targetAudience,
        questions
      } = data;

      const questionnaire = await Questionnaire.create({
        title,
        description,
        creatorId: userId,
        targetAudience,
        version: 1,
        status: 'DRAFT'
      });

      // Add questions if provided
      if (questions && Array.isArray(questions) && questions.length > 0) {
        const questionsWithOrder = questions.map((q, index) => ({
          ...q,
          questionnaireId: questionnaire.id,
          order: index + 1
        }));
        await Question.bulkCreate(questionsWithOrder);
      }

      logger.info(`Questionnaire created: ${questionnaire.id}`);
      return {
        success: true,
        data: {
          id: questionnaire.id,
          title: questionnaire.title,
          description: questionnaire.description,
          status: questionnaire.status,
          version: questionnaire.version,
          createdAt: questionnaire.createdAt
        },
        message: 'Questionnaire created successfully'
      };
    } catch (error) {
      logger.error('Error creating questionnaire:', error);
      throw error;
    }
  }

  /**
   * Get all questionnaires with pagination
   */
  static async getQuestionnaires(page = 1, limit = 10, filters = {}) {
    try {
      const offset = (page - 1) * limit;
      const where = {};

      if (filters.status) {
        where.status = filters.status;
      }
      if (filters.title) {
        where.title = { [Op.iLike]: `%${filters.title}%` };
      }
      if (filters.creatorId) {
        where.creatorId = filters.creatorId;
      }

      const { count, rows } = await Questionnaire.findAndCountAll({
        where,
        offset,
        limit,
        include: [
          {
            model: User,
            as: 'creator',
            attributes: ['id', 'fullName', 'email']
          }
        ],
        order: [['createdAt', 'DESC']]
      });

      logger.info(`Fetched ${rows.length} questionnaires (page ${page})`);
      return {
        success: true,
        data: rows.map(q => ({
          id: q.id,
          title: q.title,
          description: q.description,
          status: q.status,
          version: q.version,
          targetAudience: q.targetAudience,
          creator: q.creator,
          createdAt: q.createdAt,
          updatedAt: q.updatedAt
        })),
        pagination: {
          page,
          limit,
          total: count,
          pages: Math.ceil(count / limit)
        },
        message: 'Questionnaires retrieved successfully'
      };
    } catch (error) {
      logger.error('Error fetching questionnaires:', error);
      throw error;
    }
  }

  /**
   * Get questionnaire by ID with questions
   */
  static async getQuestionnaireById(questionnaireId) {
    try {
      const questionnaire = await Questionnaire.findByPk(questionnaireId, {
        include: [
          {
            model: Question,
            as: 'questions',
            attributes: ['id', 'questionText', 'questionType', 'requiredFlag', 'options', 'order']
          },
          {
            model: User,
            as: 'creator',
            attributes: ['id', 'fullName', 'email']
          }
        ],
        order: [[{ model: Question, as: 'questions' }, 'order', 'ASC']]
      });

      if (!questionnaire) {
        const error = new Error('Questionnaire not found');
        error.statusCode = 404;
        error.errorCode = 3001;
        throw error;
      }

      logger.info(`Fetched questionnaire: ${questionnaireId}`);
      return {
        success: true,
        data: {
          id: questionnaire.id,
          title: questionnaire.title,
          description: questionnaire.description,
          status: questionnaire.status,
          version: questionnaire.version,
          targetAudience: questionnaire.targetAudience,
          creator: questionnaire.creator,
          questions: questionnaire.questions,
          createdAt: questionnaire.createdAt,
          updatedAt: questionnaire.updatedAt
        },
        message: 'Questionnaire retrieved successfully'
      };
    } catch (error) {
      logger.error('Error fetching questionnaire:', error);
      throw error;
    }
  }

  /**
   * Update questionnaire (only DRAFT can be updated)
   */
  static async updateQuestionnaire(questionnaireId, data) {
    try {
      const questionnaire = await Questionnaire.findByPk(questionnaireId);

      if (!questionnaire) {
        const error = new Error('Questionnaire not found');
        error.statusCode = 404;
        error.errorCode = 3001;
        throw error;
      }

      if (questionnaire.status !== 'DRAFT') {
        const error = new Error('Only DRAFT questionnaires can be edited');
        error.statusCode = 400;
        error.errorCode = 4002;
        throw error;
      }

      const { title, description, targetAudience, questions } = data;

      await questionnaire.update({
        title: title || questionnaire.title,
        description: description || questionnaire.description,
        targetAudience: targetAudience || questionnaire.targetAudience
      });

      // Update questions if provided
      if (questions && Array.isArray(questions)) {
        await Question.destroy({
          where: { questionnaireId }
        });

        const questionsWithOrder = questions.map((q, index) => ({
          ...q,
          questionnaireId,
          order: index + 1
        }));
        await Question.bulkCreate(questionsWithOrder);
      }

      logger.info(`Questionnaire updated: ${questionnaireId}`);
      return {
        success: true,
        data: {
          id: questionnaire.id,
          title: questionnaire.title,
          description: questionnaire.description,
          status: questionnaire.status,
          version: questionnaire.version
        },
        message: 'Questionnaire updated successfully'
      };
    } catch (error) {
      logger.error('Error updating questionnaire:', error);
      throw error;
    }
  }

  /**
   * Publish questionnaire
   */
  static async publishQuestionnaire(questionnaireId) {
    try {
      const questionnaire = await Questionnaire.findByPk(questionnaireId, {
        include: [{ model: Question, as: 'questions' }]
      });

      if (!questionnaire) {
        const error = new Error('Questionnaire not found');
        error.statusCode = 404;
        error.errorCode = 3001;
        throw error;
      }

      if (questionnaire.questions.length === 0) {
        const error = new Error('Cannot publish questionnaire without questions');
        error.statusCode = 400;
        error.errorCode = 4002;
        throw error;
      }

      if (questionnaire.status !== 'DRAFT') {
        const error = new Error('Only DRAFT questionnaires can be published');
        error.statusCode = 400;
        error.errorCode = 4002;
        throw error;
      }

      await questionnaire.update({ status: 'PUBLISHED' });
      logger.info(`Questionnaire published: ${questionnaireId}`);

      return {
        success: true,
        data: {
          id: questionnaire.id,
          title: questionnaire.title,
          status: questionnaire.status,
          questionCount: questionnaire.questions.length
        },
        message: 'Questionnaire published successfully'
      };
    } catch (error) {
      logger.error('Error publishing questionnaire:', error);
      throw error;
    }
  }

  /**
   * Close questionnaire (no more responses)
   */
  static async closeQuestionnaire(questionnaireId) {
    try {
      const questionnaire = await Questionnaire.findByPk(questionnaireId);

      if (!questionnaire) {
        const error = new Error('Questionnaire not found');
        error.statusCode = 404;
        error.errorCode = 3001;
        throw error;
      }

      await questionnaire.update({ status: 'CLOSED' });
      logger.info(`Questionnaire closed: ${questionnaireId}`);

      return {
        success: true,
        data: {
          id: questionnaire.id,
          title: questionnaire.title,
          status: questionnaire.status
        },
        message: 'Questionnaire closed successfully'
      };
    } catch (error) {
      logger.error('Error closing questionnaire:', error);
      throw error;
    }
  }

  /**
   * Delete questionnaire (only DRAFT)
   */
  static async deleteQuestionnaire(questionnaireId) {
    try {
      const questionnaire = await Questionnaire.findByPk(questionnaireId);

      if (!questionnaire) {
        const error = new Error('Questionnaire not found');
        error.statusCode = 404;
        error.errorCode = 3001;
        throw error;
      }

      if (questionnaire.status !== 'DRAFT') {
        const error = new Error('Only DRAFT questionnaires can be deleted');
        error.statusCode = 400;
        error.errorCode = 4002;
        throw error;
      }

      await questionnaire.destroy();
      logger.info(`Questionnaire deleted: ${questionnaireId}`);

      return {
        success: true,
        data: { id: questionnaireId },
        message: 'Questionnaire deleted successfully'
      };
    } catch (error) {
      logger.error('Error deleting questionnaire:', error);
      throw error;
    }
  }

  /**
   * Get questions for questionnaire
   */
  static async getQuestions(questionnaireId) {
    try {
      const questions = await Question.findAll({
        where: { questionnaireId },
        order: [['order', 'ASC']]
      });

      logger.info(`Fetched ${questions.length} questions for questionnaire: ${questionnaireId}`);
      return {
        success: true,
        data: questions,
        message: 'Questions retrieved successfully'
      };
    } catch (error) {
      logger.error('Error fetching questions:', error);
      throw error;
    }
  }

  /**
   * Get response count for questionnaire
   */
  static async getResponseCount(questionnaireId) {
    try {
      const count = await Response.count({
        where: { questionnaireId }
      });

      logger.info(`Questionnaire ${questionnaireId} has ${count} responses`);
      return {
        success: true,
        data: { questionnaireId, responseCount: count },
        message: 'Response count retrieved successfully'
      };
    } catch (error) {
      logger.error('Error getting response count:', error);
      throw error;
    }
  }
}

module.exports = QuestionnaireService;
