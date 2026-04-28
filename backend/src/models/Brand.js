const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const Brand = sequelize.define('Brand', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    category: {
      type: DataTypes.STRING(100)
    },
    description: {
      type: DataTypes.TEXT
    },
    colorCode: {
      type: DataTypes.STRING(7),
      field: 'color_code'
    },
    logoUrl: {
      type: DataTypes.STRING(500),
      field: 'logo_url'
    },
    companyId: {
      type: DataTypes.INTEGER,
      field: 'company_id'
    },
    activeStatus: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
      field: 'active_status'
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
    tableName: 'brands'
  });

  return Brand;
};
