const { Sequelize } = require('sequelize');
const config = require('../config/database');
const logger = require('../utils/logger');

const env = process.env.NODE_ENV || 'development';
const dbConfig = config[env];

// Initialize Sequelize
const sequelize = new Sequelize(
  dbConfig.database,
  dbConfig.username,
  dbConfig.password,
  {
    host: dbConfig.host,
    port: dbConfig.port,
    dialect: dbConfig.dialect,
    logging: dbConfig.logging,
    pool: dbConfig.pool
  }
);

// Import models
const User = require('./User')(sequelize);
const Consumer = require('./Consumer')(sequelize);
const Bar = require('./Bar')(sequelize);
const Brand = require('./Brand')(sequelize);
const Questionnaire = require('./Questionnaire')(sequelize);
const Question = require('./Question')(sequelize);
const Response = require('./Response')(sequelize);
const Promotion = require('./Promotion')(sequelize);
const ConsumerPreference = require('./ConsumerPreference')(sequelize);

// Define relationships
// User relationships
User.hasMany(Consumer, { foreignKey: 'userId', as: 'consumers' });
Consumer.belongsTo(User, { foreignKey: 'userId' });

// Bar relationships
User.hasMany(Bar, { foreignKey: 'managerId', as: 'managedBars' });
Bar.belongsTo(User, { foreignKey: 'managerId', as: 'manager' });

// Questionnaire relationships
User.hasMany(Questionnaire, { foreignKey: 'creatorId', as: 'questionnaires' });
Questionnaire.belongsTo(User, { foreignKey: 'creatorId', as: 'creator' });
Questionnaire.hasMany(Question, { foreignKey: 'questionnaireId', as: 'questions' });
Question.belongsTo(Questionnaire, { foreignKey: 'questionnaireId' });

// Response relationships
Consumer.hasMany(Response, { foreignKey: 'consumerId', as: 'responses' });
Response.belongsTo(Consumer, { foreignKey: 'consumerId' });
Questionnaire.hasMany(Response, { foreignKey: 'questionnaireId', as: 'responses' });
Response.belongsTo(Questionnaire, { foreignKey: 'questionnaireId' });

// Brand relationships
Brand.hasMany(Promotion, { foreignKey: 'brandId', as: 'promotions' });
Promotion.belongsTo(Brand, { foreignKey: 'brandId' });

// Consumer Preference relationships
Consumer.hasMany(ConsumerPreference, { foreignKey: 'consumerId', as: 'preferences' });
ConsumerPreference.belongsTo(Consumer, { foreignKey: 'consumerId' });
Brand.hasMany(ConsumerPreference, { foreignKey: 'brandId', as: 'consumerPreferences' });
ConsumerPreference.belongsTo(Brand, { foreignKey: 'brandId' });

// Test database connection
sequelize.authenticate()
  .then(() => {
    logger.info('Database connection established successfully');
  })
  .catch((error) => {
    logger.error('Database connection failed:', error);
  });

// Export sequelize and models
module.exports = {
  sequelize,
  User,
  Consumer,
  Bar,
  Brand,
  Questionnaire,
  Question,
  Response,
  Promotion,
  ConsumerPreference
};
