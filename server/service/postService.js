const data = require('../data/postData');

exports.createPost = async dados => {
	const entrada = dados.titulo;

	dados.titulo = function convert(entrada) {
		entrada = entrada.replace(/&/g, '&amp;');
		entrada = entrada.replace(/>/g, '&gt;');
		entrada = entrada.replace(/</g, '&lt;');
		entrada = entrada.replace(/"/g, '&quot;');
		entrada = entrada.replace(/'/g, '&#039;');
		return entrada;
	};

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
