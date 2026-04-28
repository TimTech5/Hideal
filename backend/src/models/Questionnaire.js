const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const Questionnaire = sequelize.define('Questionnaire', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    title: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    description: {
      type: DataTypes.TEXT
    },
    creatorId: {
      type: DataTypes.INTEGER,
      field: 'creator_id',
      references: {
        model: 'users',
        key: 'id'
      }
    },
    targetAudience: {
      type: DataTypes.STRING(50),
      field: 'target_audience',
      defaultValue: 'all'
    },
    version: {
      type: DataTypes.INTEGER,
      defaultValue: 1
    },
    status: {
      type: DataTypes.ENUM('DRAFT', 'PUBLISHED', 'ARCHIVED', 'CLOSED'),
      defaultValue: 'DRAFT'
    },
    createdAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
      field: 'created_at'
    },
    updatedAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
      field: 'updated_at'
    }
  }, {
    timestamps: true,
    underscored: true,
    tableName: 'questionnaires'
  });

  return Questionnaire;
};
