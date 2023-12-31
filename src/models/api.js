'use strict';
const {
  Model
} = require('sequelize');
const bcrypt=require("bcrypt")
module.exports = (sequelize, DataTypes) => {
  class api extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsToMany(models.Role, { through: 'User_roles', /* options */ });
    }
  }
  api.init({
    email:{
     type: DataTypes.STRING,
     allowNull:false,
     unique:true,
     validate:{
      isEmail:true
     }
    },

    password: {
      type:DataTypes.STRING,
      allowNull:false,
      validate:{
        len:[5,10]
      }
  }
}, {
    sequelize,
    modelName: 'api',
  });

  api.beforeCreate(function encryted(user){
      const response=bcrypt.hashSync(user.password,8);
      user.password=response
  })
  return api;
};