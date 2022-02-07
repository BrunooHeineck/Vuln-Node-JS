const dataBase = require('../config/database').pool;

exports.clearAllUsers = async () => {
	await dataBase.query('DELETE FROM users');
};

exports.clearAllPosts = async () => {
	await dataBase.query('DELETE FROM posts');
};

exports.getUserById = async id => {
	return await dataBase.query(`SELECT * FROM users WHERE usr_id=${id}`);
};

exports.getAllUsers = async () => {
	return await dataBase.query('SELECT * FROM users');
};
