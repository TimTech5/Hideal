const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const Question = sequelize.define('Question', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    questionnaireId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: 'questionnaire_id',
      references: {
        model: 'questionnaires',
        key: 'id'
      }
    },
    questionText: {
      type: DataTypes.TEXT,
      allowNull: false,
      field: 'question_text'
    },
    questionType: {
      type: DataTypes.ENUM('TEXT', 'MULTIPLE_CHOICE', 'RATING', 'DATE', 'CHECKBOX'),
      field: 'question_type',
      defaultValue: 'TEXT'
    },
    requiredFlag: {
      type: DataTypes.BOOLEAN,
      field: 'required_flag',
      defaultValue: false
    },
    options: {
      type: DataTypes.JSON,
      defaultValue: []
    },
    order: {
      type: DataTypes.INTEGER,
      defaultValue: 0
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
    tableName: 'questions'
  });

  return Question;
};
