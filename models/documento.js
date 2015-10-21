
"use strict";

module.exports = function(sequelize, DataTypes) {
	var Documento = sequelize.define('Documento',{
    fecha: DataTypes.DATE,
    nombre: DataTypes.STRING,
    texto: DataTypes.TEXT,
    URL: DataTypes.STRING}, {
		name: {singular: 'Documento', plural: 'Documentos'}
	},{
    classMethods: {
      associate: function(models) {
      }
    }
  });
  return Documento;
};

