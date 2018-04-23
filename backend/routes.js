"use strict"
let path = require('path')
let sess;

module.exports = (app,dataBase,session) => {
	console.log('mak')
	app.get('/', (req,res) => {
		sess = req.session;
		if (sess.username){
			res.sendFile(path.resolve('./backend/pages/index.html'))
		} else {
			res.sendFile(path.resolve('./backend/pages/login.html'))
		}
	})

	app.get('/registration', (req,res) => {
		res.sendFile(path.resolve('./backend/pages/registration.html'))
	})

	app.get('/login', (req,res) => {
		sess = req.session;
		if (sess.username){
			res.sendFile(path.resolve('./backend/pages/index.html'))
		} else {
			res.sendFile(path.resolve('./backend/pages/login.html'))
		}
	})
	
	app.get('/home', (req,res) => {
		sess = req.session;
		if (sess.username){
			res.sendFile(path.resolve('./backend/pages/index.html'))
		} else {
			res.sendFile(path.resolve('./backend/pages/login.html'))
		}
	})
	
	app.get('/logout', (req,res) => {
		req.session.destroy(function(err) {
		if(err) {
	    	console.log(err);
		  } else {
		    res.redirect('/');
		  }
		})
	})

	app.get('/api/saveUser', (req, res) => {
		var objBody;
		
		if(req.query.name != undefined){
			objBody = req.query
			console.log(req.query);
		}
		else{
			objBody = req.body
			console.log(req.body);
		}
		var name = objBody.name;
		var male = objBody.male;	
		var age = objBody.age;
		dataBase.saveUser(name,male,age,function(callback){
			if(callback){
				res.json(callback);
			}
		})
	})

	app.get('/api/listUsers', (req,res) => {
	
		console.log('list');
	
		dataBase.listUsers(function(data){ 
			res.json(data);           
		})
	})

	app.get('/api/loadUser', (req,res) => {
		var id = req.query.id;
		console.log('load', id);
	
		dataBase.loadUser(id,function(data){ 
			res.json(data);           
		})
	})
	
	app.get('/api/removeUser', (req,res) => {
		var id = req.query.id;
		console.log('load', id);
	
		dataBase.removeUser(id,function(data){ 
			res.json(data);           
		})
	})
	
	app.get('/api/updateUser', (req, res) => {
		var objBody;
		
		if(req.query.id != undefined){
			objBody = req.query
			console.log(req.query);
		}
		else{
			objBody = req.body
			console.log(req.body);
		}
		var id = objBody.id;
		var name = objBody.name;
		var male = objBody.male;	
		var age = objBody.age;
		dataBase.updateUser(id,name,male,age,function(callback){
			res.json(callback);
		})
	})
	
	
	app.post('/api/login', (req, res) => {
		var objBody;
		console.log("login ")
		sess = req.session;
		objBody = req.query
		console.info(sess);

		var username = objBody.username;
		var password = objBody.password;
		dataBase.checkifexists(username,function(callback){
			console.log("lassuk csak "+ username)
			sess.username = username;
			res.json(callback);
		})
	})
	
	app.get('/api/register', (req, res) => {
		var objBody;
		console.log("login ")
		objBody = req.query
		var username = objBody.username;
		var password = objBody.password;
		var name = objBody.name;
		var lastname = objBody.lastname;
		var ocupation = objBody.ocupation;
		dataBase.saveUser(username,password,name,lastname,ocupation,function(callback){
			if(callback){
				res.json(callback);
			}
		})
	})
	
	app.get('/api/getuserfromsession', (req,res) =>{
		res.json(req.session.username);
	})
}
