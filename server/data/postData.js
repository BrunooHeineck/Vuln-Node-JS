const dataBase = require('../config/database').pool;

exports.createPost = async dados => {
	const { rows } = await dataBase.query(
		`
	INSERT INTO posts 
	(
		posts_titulo,
		posts_pais,
		posts_fotografo,
		posts_usuario,
		posts_privado
	) 
	VALUES 
	(
		'${dados.titulo}',
		'${dados.pais}',
		'${dados.fotografo}',
		'${dados.usuario}',
		'false'
		) 
		RETURNING posts_id
		`
		// '${dados.privado}'
	);

	return rows[0].posts_id;
};

exports.getPostById = async posts_id => {
	return await dataBase.query(
		`SELECT * FROM posts WHERE posts_id=${posts_id}`
	);
};
exports.getAllPost = async () => {
	return await dataBase.query(`SELECT * FROM posts`);
};

exports.updatePost = async (posts_id, dados) => {
	return dataBase.query(`
	UPDATE posts SET 

		posts_titulo = '${dados.titulo}',
		posts_pais = '${dados.pais}',
		posts_fotografo = '${dados.fotografo}',
		posts_privado = '${dados.privado}'

	WHERE 
		posts_id = ${posts_id}
	`);
};

exports.deletePost = async posts_id => {
	await dataBase.query(`DELETE FROM posts WHERE posts_id=${posts_id}`);
};
