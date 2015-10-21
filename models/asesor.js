
"use strict";

module.exports = function(sequelize, DataTypes) {
	var Asesor = sequelize.define('Asesor', {
    nombre: DataTypes.STRING,
    fecha_nac: DataTypes.DATEONLY,
    dni: DataTypes.STRING},{
    classMethods: {
      associate: function(models) {
                Asesor.belongsToMany(models.Cliente, {through: 'UserProject'});
                Asesor.hasMany(models.Documento);
                Asesor.hasMany(models.Mensaje);
                Asesor.hasMany(models.Noticia);
      }
    }
  });
  return Asesor;
};