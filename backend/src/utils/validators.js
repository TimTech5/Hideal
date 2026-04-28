const Joi = require('joi');

// Validation schemas
const schemas = {
  // Authentication
  register: Joi.object({
    email: Joi.string().email().required().lowercase(),
    password: Joi.string()
      .min(8)
      .pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])/)
      .required()
      .messages({
        'string.pattern.base': 'Password must contain uppercase, lowercase, number, and special character'
      }),
    fullName: Joi.string().max(255).required(),
    role: Joi.string().valid('CONSUMER', 'BAR_AGENT', 'BAR_MANAGER').default('CONSUMER')
  }),

  login: Joi.object({
    email: Joi.string().email().required().lowercase(),
    password: Joi.string().required()
  }),

  // Consumer
  createConsumer: Joi.object({
    firstName: Joi.string().max(255).required(),
    lastName: Joi.string().max(255).required(),
    email: Joi.string().email().lowercase(),
    phone: Joi.string().max(20),
    ageGroup: Joi.string().max(50),
    gender: Joi.string().max(50)
  }),

  updateConsumer: Joi.object({
    firstName: Joi.string().max(255),
    lastName: Joi.string().max(255),
    email: Joi.string().email().lowercase(),
    phone: Joi.string().max(20),
    ageGroup: Joi.string().max(50),
    gender: Joi.string().max(50)
  }).min(1),

  // Brand
  createBrand: Joi.object({
    name: Joi.string().max(255).required(),
    category: Joi.string().max(100),
    description: Joi.string(),
    colorCode: Joi.string().max(7)
  }),

  // Questionnaire
  createQuestionnaire: Joi.object({
    title: Joi.string().max(255).required(),
    description: Joi.string(),
    targetAudience: Joi.string().default('all'),
    questions: Joi.array().items(
      Joi.object({
        text: Joi.string().required(),
        type: Joi.string().valid('TEXT', 'MULTIPLE_CHOICE', 'RATING', 'DATE', 'CHECKBOX').required(),
        required: Joi.boolean().default(true),
        options: Joi.array().items(Joi.string())
      })
    )
  })
};

/**
 * Validate request data against schema
 */
const validate = (schema) => {
  return (req, res, next) => {
    const { error, value } = schema.validate(req.body, {
      abortEarly: false,
      stripUnknown: true
    });

    if (error) {
      const details = error.details.map(detail => ({
        field: detail.path.join('.'),
        message: detail.message
      }));

      return res.status(400).json({
        error: {
          code: 2001,
          message: 'Validation error',
          details
        }
      });
    }

    req.validatedData = value;
    next();
  };
};

module.exports = {
  schemas,
  validate
};
