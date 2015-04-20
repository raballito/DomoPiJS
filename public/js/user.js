//construction standard, longue a écrire et sûrement a manipuler
var users = [
		{ id: 1, username: 'bob', password: 'secret', email: 'bob@example.com' },
		{ id: 2, username: 'joe', password: 'birthday', email: 'joe@example.com' },
		{id: 3, username: 'admin', password: 'admin', email: 'admin@example.com' }
];

/* Tentative de constructeur pour la même chose, simplifiée
//Définition de l'objet User via le constructeur
function User(id, username, password, email){
	this.id = id;
	this.username = username;
	this.password = password;
	this.email = email;	
}
//Ici on créer les variales contenant une instance de l'objet User
var bob = new User('1', 'bob', 'secret', 'bob@example.com', {} );
var joe = new User('2', 'joe', 'birthday', joe@example.com', {} );
var admin = new User('3', 'admin', 'admin', 'admin@example.com',{} );

*/