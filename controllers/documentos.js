var Sequelize = require('sequelize');
var models = require("../models");
var express = require('express');
var router = express.Router();

function isInteger(value) {
  var x = parseFloat(value);
  return !isNaN(value) && (x | 0) === x;
}

router.get('/', function(req, res) {
	res.status(200);
	models.Noticia.findAll().then(function(results){
		res.send(results);
	}); 
});

router.post('/', function(req, res) {
	res.status(201);
	 models.Noticia.create(req.body).then(function(asesor){
		res.send(asesor);
	});
});

router.put('/:id', function(req, res) {
	if(isInteger(req.params.id)){
		return models.Noticia.findById(req.params.id).then(function(result){
			if(result != null){
				result.update(req.body);
				res.status(200);				
				res.send();
			}else{
				res.status(404);
				res.send('no encontrado');
			}
		})
	}else{
		res.status(400);
		res.send('Id no int');
	}	
});

router.get('/:id', function(req, res) {
	if(isInteger(req.params.id)){
		return models.Noticia.findById(req.params.id).then(function(result){
			if(result != null){
				res.status(200);				
				res.send(result);
			}else{
				res.status(404);
				res.send('no encontrado');
			}
		})
	}else{
		res.status(400);
		res.send('Id no int');
	}	
});

router.delete('/:id', function(req, res) {
	if(isInteger(req.params.id)){
		return models.Noticia.findById(req.params.id).then(function(result){
			if(result != null){
				res.status(204);
				result.destroy();
				res.send('');
			}else{
				res.status(404);
				res.send('no encontrado');
			}
		})
	}else{
		res.status(400);
		res.send('Id no int');
	}	
});


module.exports = router;