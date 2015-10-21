
"use strict";

module.exports = function(sequelize, DataTypes) {
	var Cliente = sequelize.define('Cliente',{
	nombre: DataTypes.STRING,
    fecha_nac: DataTypes.DATEONLY,
    dni: DataTypes.STRING,
    info: DataTypes.TEXT},{
    classMethods: {
      associate: function(models) {
                Cliente.belongsToMany(models.Asesor, {through: 'UserProject'});
                Cliente.hasMany(models.Documento);
                Cliente.hasMany(models.Mensaje);

      }
    }
  });
  return Cliente;
};