"use strict"
let EJDB = require("ejdb");

let db = EJDB.open('Dbs/ujdb',
                    EJDB.DEFAULT_OPEN_MODE );
 
var DataBase = module.exports = function () {
	this.init()
}

DataBase.prototype.init = function () {
	var self = this
	console.log("connected to ejdb");
}

DataBase.prototype.close = function () {
	var self = this
	db.close();
	console.log("disconnected from ejdb");
}


DataBase.prototype.saveUser = function(username,password,name,lastname,ocupation,_callback) {
	var self = this

	var user = {
		username : username,
    	password : password,
    	name : name,
    	lastname : lastname,
    	ocupation : ocupation
	};
	
	console.log(user);
	
	db.save("users", user, function(err, oids) {
		if (err) {
			console.error(err);
			return _callback(false);
		}
		console.log("User OID: " + user["_id"],user);	 
		return _callback(true);
	});
	 
}

DataBase.prototype.listUsers = function (_callback) {
	var self = this;
	
	db.find('users', function(err, cursor, count) {
        if (err) {
            console.error(err);
            return _callback(null);
		}
		
		var data = [];
        console.log("Found " + count + " users");
		
		while (cursor.next()) {
			var tmp = {};
			tmp.id = cursor.field('_id');
			tmp.username = cursor.field('username');
			tmp.password = cursor.field('password');
			tmp.name = cursor.field('name');
			tmp.lastname = cursor.field('lastname'); 
			tmp.ocupation = cursor.field('ocupation'); 
			console.log("User --- ", tmp);
			data.push(tmp);
		}

        cursor.close();
        return _callback(data);
    });
}

DataBase.prototype.loadUser = function (id,_callback) {
	var self = this;
	
	db.load('users',id, function(err, data) {
        if (err) {
            console.error(err);
            return _callback(null);
		}
        console.log("Found " + data + " users");
        return _callback(data);
    });
}

DataBase.prototype.checkifexists = function (username,_callback) {
	var self = this;
	
	console.log(" load "+username)
	db.find('users', { 'username': username },
        function(err, cursor, count) {
            if (err) {
                console.error(err);
                return;
            }
            console.log("Found " + count + " parrots");
            if ( count > 0){
            	return _callback(true);
            }
            else {
            	return _callback(false);
            }
            cursor.close();
        });
}

DataBase.prototype.removeUser = function (id,_callback) {
	var self = this;
	
	db.remove('users',id, function(data) {
        if (data != undefined) {
            return _callback(false);
		}
        console.log("removed " + data + " users");
        return _callback(true);
    });
}

DataBase.prototype.updateUser = function (id,name,male,age,_callback) {
	var self = this;

    db.update('users',{ '_id': id, $set :{'name': name, 'male': male, 'age' : age}}, function(err,count) {
        if (err != undefined) {
            return _callback(false);
		}
        console.log("updated " + count +"  err: "+ err+ " users");
        return _callback(true);
	});
	
}

