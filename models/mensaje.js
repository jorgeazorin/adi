
"use strict";

module.exports = function(sequelize, DataTypes) {
	var Mensaje = sequelize.define('Mensaje',{
    fecha: DataTypes.DATE,
    texto: DataTypes.TEXT,
    visto: DataTypes.BOOLEAN}, {
	name: {singular: 'Mensaje', plural: 'Mensajes'}
	},{
    classMethods: {
      associate: function(models) {
        
		    
      }
    }
  });
  return Mensaje;
};