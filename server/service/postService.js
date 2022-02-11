const data = require('../data/postData');

exports.createPost = async dados => {
	return await data.createPost(dados);
};

exports.getAllPost = async () => {
	return await data.getAllPost();
};

exports.getPostById = async posts_id => {
	return await data.getPostById(posts_id);
};

exports.updatePost = async (posts_id, dados) => {
	return await data.updatePost(posts_id, dados);
};

exports.deletePost = async posts_id => {
	await data.deletePost(posts_id);
};
