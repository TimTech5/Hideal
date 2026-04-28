const BrandService = require('../services/brandService');
const logger = require('../utils/logger');

class BrandController {
  /**
   * Create new brand
   */
  static async createBrand(req, res, next) {
    try {
      const result = await BrandService.createBrand(req.body);
      return res.status(201).json(result);
    } catch (error) {
      logger.error('Error in createBrand controller:', error);
      next(error);
    }
  }

  /**
   * Get all brands with pagination
   */
  static async getBrands(req, res, next) {
    try {
      const { page = 1, limit = 10, category, name, activeStatus } = req.query;
      const filters = {};

      if (category) filters.category = category;
      if (name) filters.name = name;
      if (activeStatus !== undefined) filters.activeStatus = activeStatus === 'true';

      const result = await BrandService.getBrands(
        parseInt(page),
        parseInt(limit),
        filters
      );
      return res.status(200).json(result);
    } catch (error) {
      logger.error('Error in getBrands controller:', error);
      next(error);
    }
  }

  /**
   * Get brand by ID
   */
  static async getBrandById(req, res, next) {
    try {
      const { id } = req.params;
      const result = await BrandService.getBrandById(id);
      return res.status(200).json(result);
    } catch (error) {
      logger.error('Error in getBrandById controller:', error);
      next(error);
    }
  }

  /**
   * Update brand
   */
  static async updateBrand(req, res, next) {
    try {
      const { id } = req.params;
      const result = await BrandService.updateBrand(id, req.body);
      return res.status(200).json(result);
    } catch (error) {
      logger.error('Error in updateBrand controller:', error);
      next(error);
    }
  }

  /**
   * Delete brand
   */
  static async deleteBrand(req, res, next) {
    try {
      const { id } = req.params;
      const result = await BrandService.deleteBrand(id);
      return res.status(200).json(result);
    } catch (error) {
      logger.error('Error in deleteBrand controller:', error);
      next(error);
    }
  }

  /**
   * Get brands by category
   */
  static async getBrandsByCategory(req, res, next) {
    try {
      const { category } = req.params;
      const result = await BrandService.getBrandsByCategory(category);
      return res.status(200).json(result);
    } catch (error) {
      logger.error('Error in getBrandsByCategory controller:', error);
      next(error);
    }
  }

  /**
   * Toggle brand active status
   */
  static async toggleBrandStatus(req, res, next) {
    try {
      const { id } = req.params;
      const { activeStatus } = req.body;

      if (activeStatus === undefined) {
        const error = new Error('activeStatus is required');
        error.statusCode = 400;
        error.errorCode = 2001;
        throw error;
      }

      const result = await BrandService.toggleBrandStatus(id, activeStatus);
      return res.status(200).json(result);
    } catch (error) {
      logger.error('Error in toggleBrandStatus controller:', error);
      next(error);
    }
  }
}

module.exports = BrandController;
