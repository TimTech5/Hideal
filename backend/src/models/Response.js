const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const Response = sequelize.define('Response', {
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
    consumerId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: 'consumer_id',
      references: {
        model: 'consumers',
        key: 'id'
      }
    },
    barAgentId: {
      type: DataTypes.INTEGER,
      field: 'bar_agent_id',
      references: {
        model: 'users',
        key: 'id'
      },
      allowNull: true
    },
    responseData: {
      type: DataTypes.JSON,
      field: 'response_data',
      defaultValue: {}
    },
    completionDate: {
      type: DataTypes.DATE,
      field: 'completion_date'
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
    tableName: 'responses'
  });

  return Response;
};
