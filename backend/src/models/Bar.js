const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const Bar = sequelize.define('Bar', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    location: {
      type: DataTypes.STRING(255)
    },
    address: {
      type: DataTypes.STRING(500)
    },
    latitude: {
      type: DataTypes.DECIMAL(10, 8)
    },
    longitude: {
      type: DataTypes.DECIMAL(11, 8)
    },
    managerId: {
      type: DataTypes.INTEGER,
      field: 'manager_id',
      references: {
        model: 'users',
        key: 'id'
      }
    },
    establishedDate: {
      type: DataTypes.DATE,
      field: 'established_date'
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
    tableName: 'bars'
  });

  return Bar;
};
