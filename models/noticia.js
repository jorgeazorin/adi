
"use strict";

module.exports = function(sequelize, DataTypes) {
	var Noticia = sequelize.define('Noticia',{
    fecha: DataTypes.DATE,
    texto: DataTypes.TEXT,
    titulo: DataTypes.STRING}, {
	name: {singular: 'Noticia', plural: 'Noticias'}
	},{
    classMethods: {
      associate: function(models) {
      
      }
    }
  });
  return Noticia;
};
