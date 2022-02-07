const data = require('../data/userData');

exports.createUser = async dados => {
	return await data.createUser(dados);
};

exports.updateUser = async (usr_id, dados) => {
	return await data.updateUser(usr_id, dados);
};

exports.deleteUser = async usr_id => {
	await data.deleteUser(usr_id);
};

exports.login = async (email, senha) => {
	return await data.login(email, senha);
};
