const logger = require('../utils/logger');
const { Brand } = require('../models');
const { Op } = require('sequelize');

class BrandService {
  /**
   * Create a new brand
   */
  static async createBrand(data) {
    try {
      const { name, category, description, colorCode, logoUrl, companyId } = data;

      // Check if brand already exists
      const existing = await Brand.findOne({ where: { name } });
      if (existing) {
        const error = new Error('Brand already exists');
        error.statusCode = 409;
        error.errorCode = 4001;
        throw error;
      }

      const brand = await Brand.create({
        name,
        category,
        description,
        colorCode,
        logoUrl,
        companyId,
        activeStatus: true
      });

      logger.info(`Brand created: ${brand.id} - ${name}`);
      return {
        success: true,
        data: {
          id: brand.id,
          name: brand.name,
          category: brand.category,
          description: brand.description,
          colorCode: brand.colorCode,
          logoUrl: brand.logoUrl,
          activeStatus: brand.activeStatus,
          createdAt: brand.createdAt
        },
        message: 'Brand created successfully'
      };
    } catch (error) {
      logger.error('Error creating brand:', error);
      throw error;
    }
  }

  /**
   * Get all brands with pagination and filters
   */
  static async getBrands(page = 1, limit = 10, filters = {}) {
    try {
      const offset = (page - 1) * limit;
      const where = {};

      // Apply filters
      if (filters.category) {
        where.category = filters.category;
      }
      if (filters.name) {
        where.name = { [Op.iLike]: `%${filters.name}%` };
      }
      if (filters.activeStatus !== undefined) {
        where.activeStatus = filters.activeStatus;
      }

      const { count, rows } = await Brand.findAndCountAll({
        where,
        offset,
        limit,
        order: [['createdAt', 'DESC']]
      });

      logger.info(`Fetched ${rows.length} brands (page ${page})`);
      return {
        success: true,
        data: rows.map(brand => ({
          id: brand.id,
          name: brand.name,
          category: brand.category,
          description: brand.description,
          colorCode: brand.colorCode,
          logoUrl: brand.logoUrl,
          activeStatus: brand.activeStatus,
          createdAt: brand.createdAt,
          updatedAt: brand.updatedAt
        })),
        pagination: {
          page,
          limit,
          total: count,
          pages: Math.ceil(count / limit)
        },
        message: 'Brands retrieved successfully'
      };
    } catch (error) {
      logger.error('Error fetching brands:', error);
      throw error;
    }
  }

  /**
   * Get brand by ID
   */
  static async getBrandById(brandId) {
    try {
      const brand = await Brand.findByPk(brandId);

      if (!brand) {
        const error = new Error('Brand not found');
        error.statusCode = 404;
        error.errorCode = 3001;
        throw error;
      }

      logger.info(`Fetched brand: ${brandId}`);
      return {
        success: true,
        data: {
          id: brand.id,
          name: brand.name,
          category: brand.category,
          description: brand.description,
          colorCode: brand.colorCode,
          logoUrl: brand.logoUrl,
          activeStatus: brand.activeStatus,
          createdAt: brand.createdAt,
          updatedAt: brand.updatedAt
        },
        message: 'Brand retrieved successfully'
      };
    } catch (error) {
      logger.error('Error fetching brand:', error);
      throw error;
    }
  }

  /**
   * Update brand
   */
  static async updateBrand(brandId, data) {
    try {
      const brand = await Brand.findByPk(brandId);

      if (!brand) {
        const error = new Error('Brand not found');
        error.statusCode = 404;
        error.errorCode = 3001;
        throw error;
      }

      // Check if name is being changed and if it conflicts
      if (data.name && data.name !== brand.name) {
        const existing = await Brand.findOne({ where: { name: data.name } });
        if (existing) {
          const error = new Error('Brand name already exists');
          error.statusCode = 409;
          error.errorCode = 4001;
          throw error;
        }
      }

      await brand.update(data);
      logger.info(`Brand updated: ${brandId}`);

      return {
        success: true,
        data: {
          id: brand.id,
          name: brand.name,
          category: brand.category,
          description: brand.description,
          colorCode: brand.colorCode,
          logoUrl: brand.logoUrl,
          activeStatus: brand.activeStatus,
          createdAt: brand.createdAt,
          updatedAt: brand.updatedAt
        },
        message: 'Brand updated successfully'
      };
    } catch (error) {
      logger.error('Error updating brand:', error);
      throw error;
    }
  }

  /**
   * Delete brand
   */
  static async deleteBrand(brandId) {
    try {
      const brand = await Brand.findByPk(brandId);

      if (!brand) {
        const error = new Error('Brand not found');
        error.statusCode = 404;
        error.errorCode = 3001;
        throw error;
      }

      await brand.destroy();
      logger.info(`Brand deleted: ${brandId}`);

      return {
        success: true,
        data: { id: brandId },
        message: 'Brand deleted successfully'
      };
    } catch (error) {
      logger.error('Error deleting brand:', error);
      throw error;
    }
  }

  /**
   * Get brands by category
   */
  static async getBrandsByCategory(category) {
    try {
      const brands = await Brand.findAll({
        where: { category, activeStatus: true },
        order: [['name', 'ASC']]
      });

      logger.info(`Fetched ${brands.length} brands in category: ${category}`);
      return {
        success: true,
        data: brands.map(brand => ({
          id: brand.id,
          name: brand.name,
          category: brand.category,
          colorCode: brand.colorCode,
          logoUrl: brand.logoUrl
        })),
        message: 'Brands retrieved successfully'
      };
    } catch (error) {
      logger.error('Error fetching brands by category:', error);
      throw error;
    }
  }

  /**
   * Toggle brand active status
   */
  static async toggleBrandStatus(brandId, activeStatus) {
    try {
      const brand = await Brand.findByPk(brandId);

      if (!brand) {
        const error = new Error('Brand not found');
        error.statusCode = 404;
        error.errorCode = 3001;
        throw error;
      }

      await brand.update({ activeStatus });
      logger.info(`Brand status toggled: ${brandId} - ${activeStatus}`);

      return {
        success: true,
        data: {
          id: brand.id,
          name: brand.name,
          activeStatus: brand.activeStatus
        },
        message: 'Brand status updated successfully'
      };
    } catch (error) {
      logger.error('Error toggling brand status:', error);
      throw error;
    }
  }
}

module.exports = BrandService;
