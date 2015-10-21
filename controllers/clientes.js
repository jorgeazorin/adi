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
	models.Cliente.findAll().then(function(results){
		res.send(results);
	}); 
});

router.post('/', function(req, res) {
	res.status(201);
	 models.Cliente.create(req.body).then(function(asesor){
		res.send(asesor);
	});
});

router.put('/:id', function(req, res) {
	if(isInteger(req.params.id)){
		return models.Cliente.findById(req.params.id).then(function(result){
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
		return models.Cliente.findById(req.params.id).then(function(result){
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
		return models.Cliente.findById(req.params.id).then(function(result){
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


router.get('/:id/documentos', function(req, res) {
	if(isInteger(req.params.id)){
		return models.Cliente.findById(req.params.id).then(function(result){
			if(result != null){
					return result.getDocumentos().then(function(result){
						res.status(200);
						res.send(result);
					})
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

router.get('/:id/mensajes', function(req, res) {
	if(isInteger(req.params.id)){
		return models.Cliente.findById(req.params.id).then(function(result){
			if(result != null){
					return result.getMensajes().then(function(result){
						res.status(200);
						res.send(result);
					})
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

router.get('/:id/noticias', function(req, res) {
	if(isInteger(req.params.id)){
		return models.Cliente.findById(req.params.id).then(function(result){
			if(result != null){
					return result.getNoticias().then(function(result){
						res.status(200);
						res.send(result);
					})
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

router.get('/:id/asesores', function(req, res) {
	if(isInteger(req.params.id)){
		return models.Cliente.findById(req.params.id).then(function(result){
			if(result != null){
					return result.getAsesors().then(function(result){
						res.status(200);
						res.send(result);
					})
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

router.post('/:id/asesores/:id1', function(req, res) {
	if(isInteger(req.params.id)){
		return models.Cliente.findById(req.params.id).then(function(result){
			if(result != null){
				return models.Asesor.findById(req.params.id1).then(function(result1){
					if(result1!=null){
						result.addAsesor(result1);
						res.status(200);
						res.send(result1);
					}else{
						res.status(404);
						res.send('El asesor '+req.params.id1+' no existe');
					}
				});
			}else{
				res.status(404);
				res.send('no encontrado el asesor '+req.params.id);
			}
		})
	}else{
		res.status(400);
		res.send('Id no int');
	}	
});

router.delete('/:id/asesores/:id1', function(req, res) {
	if(isInteger(req.params.id)){
		return models.Cliente.findById(req.params.id).then(function(result){
			if(result != null){
				return models.Asesor.findById(req.params.id1).then(function(result1){
					if(result1!=null){
						result.removeAsesor(result1);
						res.status(200);
						res.send('borrado correctamente');
					}else{
						res.status(404);
						res.send('El asesor '+req.params.id1+' no existe');
					}
				});
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