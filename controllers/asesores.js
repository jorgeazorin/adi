var Sequelize = require('sequelize');
var models = require("../models");
var express = require('express');
var router = express.Router();
var session = require('express-session');

function isInteger(value) {
  var x = parseFloat(value);
  return !isNaN(value) && (x | 0) === x;
}

router.post('/doLogin', function(pet, resp) {
	var loginstr=new Buffer(pet.headers.authorization.split(' ')[1], 'base64').toString('ascii').split(':');
	if(models.Asesor.findOne({where: {nombre:loginstr[0]}})!=null){
		if (loginstr[1]=="123456") {
			session.usuarioActual = {login: loginstr};
			resp.send("Login OK");
	   }
	   else {
	        resp.status(401);
	        resp.send("login y password incorrecto");
	   }
	}else{
		resp.status(401);
	    resp.send("login y/o password incorrecto");
	}
});

router.get('/doLogout', function(pet, resp) {
    pet.session.destroy();
    resp.send("logout");
});



router.get('/', function(req, res) {
	res.status(200);
	models.Asesor.findAll().then(function(results){
		res.send(results);
	}); 
});

router.post('/', function(req, res) {
	res.status(201);
	 models.Asesor.create({nombre:req.body.nombre, fecha_nac:req.body.fecha_nac,dni:req.body.dni}).then(function(asesor){
		res.send(asesor);
	});
});

router.put('/:id', function(req, res) {
	if(isInteger(req.params.id)){
		return models.Asesor.findById(req.params.id).then(function(result){
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
		return models.Asesor.findById(req.params.id).then(function(result){
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
		return models.Asesor.findById(req.params.id).then(function(result){
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
		return models.Asesor.findById(req.params.id).then(function(result){
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
		return models.Asesor.findById(req.params.id).then(function(result){
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
		return models.Asesor.findById(req.params.id).then(function(result){
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

router.get('/:id/clientes', function(req, res) {
	if(isInteger(req.params.id)){
		return models.Asesor.findById(req.params.id).then(function(result){
			if(result != null){
					return result.getClientes().then(function(result){
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

router.post('/:id/clientes/:id1', function(req, res) {
	if(isInteger(req.params.id)){
		return models.Asesor.findById(req.params.id).then(function(result){
			if(result != null){
				return models.Cliente.findById(req.params.id1).then(function(result1){
					if(result1!=null){
						result.addCliente(result1);
						res.status(200);
						res.send(result1);
					}else{
						res.status(404);
						res.send('El cliente '+req.params.id1+' no existe');
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

router.delete('/:id/clientes/:id1', function(req, res) {
	if(isInteger(req.params.id)){
		return models.Asesor.findById(req.params.id).then(function(result){
			if(result != null){
				return models.Cliente.findById(req.params.id1).then(function(result1){
					if(result1!=null){
						result.removeCliente(result1);
						res.status(200);
						res.send('borrado correctamente');
					}else{
						res.status(404);
						res.send('El cliente '+req.params.id1+' no existe');
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