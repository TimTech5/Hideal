const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const Consumer = sequelize.define('Consumer', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    firstName: {
      type: DataTypes.STRING(255),
      allowNull: false,
      field: 'first_name'
    },
    lastName: {
      type: DataTypes.STRING(255),
      allowNull: false,
      field: 'last_name'
    },
    email: {
      type: DataTypes.STRING(255),
      unique: true,
      lowercase: true,
      validate: {
        isEmail: true
      }
    },
    phone: {
      type: DataTypes.STRING(20)
    },
    ageGroup: {
      type: DataTypes.STRING(50),
      field: 'age_group'
    },
    gender: {
      type: DataTypes.STRING(50)
    },
    locationId: {
      type: DataTypes.INTEGER,
      field: 'location_id',
      allowNull: true
    },
    consentStatus: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
      field: 'consent_status'
    },
    registrationDate: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
      field: 'registration_date'
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
    tableName: 'consumers'
  });

  return Consumer;
};
