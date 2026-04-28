const ConsumerService = require('../services/consumerService');
const logger = require('../utils/logger');

class ConsumerController {
  /**
   * Create consumer
   */
  static async createConsumer(req, res, next) {
    try {
      const consumer = await ConsumerService.createConsumer(req.validatedData);
      res.status(201).json(consumer);
    } catch (error) {
      logger.error('Create consumer error:', error);
      next(error);
    }
  }

  /**
   * Get all consumers
   */
  static async getConsumers(req, res, next) {
    try {
      const page = parseInt(req.query.page) || 1;
      const limit = parseInt(req.query.limit) || 20;
      const filters = {
        search: req.query.search,
        ageGroup: req.query.ageGroup
      };

      const result = await ConsumerService.getConsumers(page, limit, filters);
      res.status(200).json(result);
    } catch (error) {
      logger.error('Get consumers error:', error);
      next(error);
    }
  }

  /**
   * Get consumer by ID
   */
  static async getConsumerById(req, res, next) {
    try {
      const consumer = await ConsumerService.getConsumerById(req.params.id);
      res.status(200).json(consumer);
    } catch (error) {
      logger.error('Get consumer by ID error:', error);
      next(error);
    }
  }

  /**
   * Update consumer
   */
  static async updateConsumer(req, res, next) {
    try {
      const consumer = await ConsumerService.updateConsumer(req.params.id, req.validatedData);
      res.status(200).json(consumer);
    } catch (error) {
      logger.error('Update consumer error:', error);
      next(error);
    }
  }

  /**
   * Delete consumer
   */
  static async deleteConsumer(req, res, next) {
    try {
      const result = await ConsumerService.deleteConsumer(req.params.id);
      res.status(200).json(result);
    } catch (error) {
      logger.error('Delete consumer error:', error);
      next(error);
    }
  }

  /**
   * Add consumer preference
   */
  static async addPreference(req, res, next) {
    try {
      const { brandId, ...data } = req.body;
      const preference = await ConsumerService.addPreference(req.params.id, brandId, data);
      res.status(201).json(preference);
    } catch (error) {
      logger.error('Add preference error:', error);
      next(error);
    }
  }

  /**
   * Get consumer preferences
   */
  static async getPreferences(req, res, next) {
    try {
      const preferences = await ConsumerService.getPreferences(req.params.id);
      res.status(200).json(preferences);
    } catch (error) {
      logger.error('Get preferences error:', error);
      next(error);
    }
  }
}

module.exports = ConsumerController;
