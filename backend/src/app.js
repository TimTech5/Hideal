const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const morgan = require('morgan');
const config = require('./config/environment');
const errorHandler = require('./middleware/errorHandler');
const logger = require('./utils/logger');

const app = express();

// ========== Security Middleware ==========
app.use(helmet());
app.use(cors(config.cors));

// ========== Rate Limiting ==========
const limiter = rateLimit({
  windowMs: config.rateLimit.windowMs,
  max: config.rateLimit.max
});
app.use('/api/', limiter);

// ========== Logging Middleware ==========
app.use(morgan('combined', {
  stream: {
    write: (message) => logger.info(message.trim())
  }
}));

// ========== Body Parsing Middleware ==========
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ limit: '10mb', extended: true }));

// ========== Request ID Middleware ==========
app.use((req, res, next) => {
  req.id = `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
  next();
});

// ========== Routes ==========

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.status(200).json({
    status: 'OK',
    timestamp: new Date(),
    uptime: process.uptime()
  });
});

// Authentication routes
app.use('/api/auth', require('./routes/auth'));

// Consumer routes
app.use('/api/consumers', require('./routes/consumers'));

// Brand routes
app.use('/api/brands', require('./routes/brands'));

// API Documentation
app.get('/api', (req, res) => {
  res.status(200).json({
    message: 'HiDeal API Server',
    version: '1.0.0',
    endpoints: {
      auth: '/api/auth',
      consumers: '/api/consumers',
      brands: '/api/brands',
      health: '/api/health'
    }
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    error: {
      code: 404,
      message: 'Endpoint not found'
    }
  });
});

// ========== Error Handling Middleware ==========
app.use(errorHandler);

// ========== Export App ==========
module.exports = app;
