const { Consumer, ConsumerPreference } = require('../models');
const logger = require('../utils/logger');

class ConsumerService {
  /**
   * Create consumer
   */
  static async createConsumer(data) {
    try {
      const consumer = await Consumer.create(data);
      logger.info(`Consumer created: ${consumer.id}`);
      return consumer;
    } catch (error) {
      logger.error('Create consumer error:', error);
      throw error;
    }
  }

  /**
   * Get all consumers with pagination
   */
  static async getConsumers(page = 1, limit = 20, filters = {}) {
    try {
      const offset = (page - 1) * limit;
      const where = {};

      if (filters.search) {
        const { Op } = require('sequelize');
        where[Op.or] = [
          { firstName: { [Op.iLike]: `%${filters.search}%` } },
          { lastName: { [Op.iLike]: `%${filters.search}%` } },
          { email: { [Op.iLike]: `%${filters.search}%` } }
        ];
      }

      if (filters.ageGroup) {
        where.ageGroup = filters.ageGroup;
      }

      const { count, rows } = await Consumer.findAndCountAll({
        where,
        limit,
        offset,
        order: [['createdAt', 'DESC']]
      });

      return {
        data: rows,
        pagination: {
          page,
          limit,
          total: count,
          pages: Math.ceil(count / limit)
        }
      };
    } catch (error) {
      logger.error('Get consumers error:', error);
      throw error;
    }
  }

  /**
   * Get consumer by ID
   */
  static async getConsumerById(id) {
    try {
      const consumer = await Consumer.findByPk(id, {
        include: ['preferences']
      });

      if (!consumer) {
        const error = new Error('Consumer not found');
        error.code = 3002;
        throw error;
      }

      return consumer;
    } catch (error) {
      logger.error('Get consumer error:', error);
      throw error;
    }
  }

  /**
   * Update consumer
   */
  static async updateConsumer(id, data) {
    try {
      const consumer = await Consumer.findByPk(id);

      if (!consumer) {
        const error = new Error('Consumer not found');
        error.code = 3002;
        throw error;
      }

      await consumer.update(data);
      logger.info(`Consumer updated: ${id}`);
      return consumer;
    } catch (error) {
      logger.error('Update consumer error:', error);
      throw error;
    }
  }

  /**
   * Delete consumer
   */
  static async deleteConsumer(id) {
    try {
      const consumer = await Consumer.findByPk(id);

      if (!consumer) {
        const error = new Error('Consumer not found');
        error.code = 3002;
        throw error;
      }

      await consumer.destroy();
      logger.info(`Consumer deleted: ${id}`);
      return { message: 'Consumer deleted successfully' };
    } catch (error) {
      logger.error('Delete consumer error:', error);
      throw error;
    }
  }

  /**
   * Add consumer preference
   */
  static async addPreference(consumerId, brandId, data) {
    try {
      const preference = await ConsumerPreference.create({
        consumerId,
        brandId,
        ...data
      });

      logger.info(`Preference added for consumer ${consumerId}, brand ${brandId}`);
      return preference;
    } catch (error) {
      logger.error('Add preference error:', error);
      throw error;
    }
  }

  /**
   * Get consumer preferences
   */
  static async getPreferences(consumerId) {
    try {
      const preferences = await ConsumerPreference.findAll({
        where: { consumerId },
        include: ['Brand']
      });

      return preferences;
    } catch (error) {
      logger.error('Get preferences error:', error);
      throw error;
    }
  }
}

module.exports = ConsumerService;
