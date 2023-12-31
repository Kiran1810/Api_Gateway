'use strict';
const {
  Model
} = require('sequelize');
const {Enums}=require("../utils/common");
const {CUSTOMER,FLIGHT_COMPANY,ADMIN}=Enums.USER_ROLE_ENUMS
module.exports = (sequelize, DataTypes) => {
  class Role extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsToMany(models.api, { through: 'User_roles', /* options */ });
    }
  }
  Role.init({
    name: {
      type:DataTypes.ENUM({
        values:[CUSTOMER,FLIGHT_COMPANY,ADMIN]
      },
      ),
      allowNull:false,
      defaultValue:CUSTOMER

    }
  }, {
    sequelize,
    modelName: 'Role',
  });
  return Role;
};