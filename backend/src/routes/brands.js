const express = require('express');
const { verifyToken, authorize } = require('../middleware/auth');
const { validate } = require('../utils/validators');
const BrandController = require('../controllers/brandController');
const Joi = require('joi');

const router = express.Router();

// Validation schema for creating brand
const createBrandSchema = Joi.object({
  name: Joi.string().required().min(2).max(100),
  category: Joi.string().required(),
  description: Joi.string().optional().max(500),
  colorCode: Joi.string().optional().pattern(/^#[0-9A-F]{6}$/i),
  logoUrl: Joi.string().optional().uri(),
  companyId: Joi.number().optional()
});

// Validation schema for updating brand
const updateBrandSchema = Joi.object({
  name: Joi.string().optional().min(2).max(100),
  category: Joi.string().optional(),
  description: Joi.string().optional().max(500),
  colorCode: Joi.string().optional().pattern(/^#[0-9A-F]{6}$/i),
  logoUrl: Joi.string().optional().uri(),
  activeStatus: Joi.boolean().optional()
});

// Routes

/**
 * POST /api/brands
 * Create new brand
 * Role: ADMIN, BAR_MANAGER
 */
router.post(
  '/',
  verifyToken,
  authorize(['ADMIN', 'BAR_MANAGER']),
  validate(createBrandSchema),
  BrandController.createBrand
);

/**
 * GET /api/brands
 * Get all brands with pagination and filters
 * Role: All authenticated users
 */
router.get(
  '/',
  verifyToken,
  BrandController.getBrands
);

/**
 * GET /api/brands/:id
 * Get brand by ID
 * Role: All authenticated users
 */
router.get(
  '/:id',
  verifyToken,
  BrandController.getBrandById
);

/**
 * GET /api/brands/category/:category
 * Get brands by category
 * Role: All authenticated users
 */
router.get(
  '/category/:category',
  verifyToken,
  BrandController.getBrandsByCategory
);

/**
 * PUT /api/brands/:id
 * Update brand
 * Role: ADMIN, BAR_MANAGER
 */
router.put(
  '/:id',
  verifyToken,
  authorize(['ADMIN', 'BAR_MANAGER']),
  validate(updateBrandSchema),
  BrandController.updateBrand
);

/**
 * PATCH /api/brands/:id/status
 * Toggle brand active status
 * Role: ADMIN
 */
router.patch(
  '/:id/status',
  verifyToken,
  authorize(['ADMIN']),
  BrandController.toggleBrandStatus
);

/**
 * DELETE /api/brands/:id
 * Delete brand
 * Role: ADMIN
 */
router.delete(
  '/:id',
  verifyToken,
  authorize(['ADMIN']),
  BrandController.deleteBrand
);

module.exports = router;
