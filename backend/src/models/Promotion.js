const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const Promotion = sequelize.define('Promotion', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
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
    title: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    description: {
      type: DataTypes.TEXT
    },
    discountPercentage: {
      type: DataTypes.DECIMAL(5, 2),
      field: 'discount_percentage'
    },
    validFrom: {
      type: DataTypes.DATE,
      field: 'valid_from'
    },
    validTo: {
      type: DataTypes.DATE,
      field: 'valid_to'
    },
    targetAgeGroup: {
      type: DataTypes.STRING(100),
      field: 'target_age_group'
    },
    barIds: {
      type: DataTypes.JSON,
      field: 'bar_ids',
      defaultValue: []
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
    tableName: 'promotions'
  });

  return Promotion;
};
