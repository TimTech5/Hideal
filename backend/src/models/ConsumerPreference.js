const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const ConsumerPreference = sequelize.define('ConsumerPreference', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
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
    brandId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: 'brand_id',
      references: {
        model: 'brands',
        key: 'id'
      }
    },
    frequency: {
      type: DataTypes.STRING(50)
    },
    lastConsumedDate: {
      type: DataTypes.DATE,
      field: 'last_consumed_date'
    },
    preferenceScore: {
      type: DataTypes.DECIMAL(3, 1),
      field: 'preference_score'
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
    tableName: 'consumer_preferences'
  });

  return ConsumerPreference;
};
