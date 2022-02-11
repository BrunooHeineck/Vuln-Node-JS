const data = require('../data/utilData');

exports.clearAllUsers = async () => {
	await data.clearAllUsers();
};
exports.clearAllPosts = async () => {
	await data.clearAllPosts();
};

exports.getUserById = async id => {
	return await data.getUserById(id);
};

exports.getAllUsers = async () => {
	return await data.getAllUsers();
};

exports.getUserByEmail = async email => {
	return await data.getUserByEmail(email);
};

exports.getUserByUsername = async username => {
	return await data.getUserByUsername(username);
};
