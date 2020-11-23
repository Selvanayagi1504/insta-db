
'use strict';
module.exports = (sequelize, DataTypes) => {
  const instausr = sequelize.define('instausr', {
    moboremail: DataTypes.String,
    fname: DataTypes.String,
    uname: DataTypes.String,
    pass: DataTypes.String,
    phone: DataTypes.String,
    email: DataTypes.String,
    website: DataTypes.String,
    bio: DataTypes.String,
    gender: DataTypes.String,
    profile: DataTypes.String,
    posts: DataTypes.String,
    fav: DataTypes.String
  }, {
    tableName:'users'
  });
  instausr.associate = function(models) {
    // associations can be defined here
  };
  return instausr;
};