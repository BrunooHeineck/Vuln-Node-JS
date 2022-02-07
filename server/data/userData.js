const dataBase = require('../config/database').pool;

exports.createUser = async dados => {
	const { rows } = await dataBase.query(
		`
	INSERT INTO users 
	(
		usr_nome,
		usr_sobrenome,
		usr_telefone,
		usr_username,
		usr_email,
		usr_senha
	) 
	VALUES 
	(
		'${dados.nome}',
		'${dados.sobrenome}',
		'${dados.telefone}',
		'${dados.username}',
		'${dados.email}',
		'${dados.senha}'
	) 
	RETURNING usr_id
	`
	);

	return rows[0].usr_id;
};

exports.updateUser = async (usr_id, dados) => {
	return dataBase.query(
		`
	UPDATE users SET 
		usr_nome = '${dados.nome}',
		usr_sobrenome = '${dados.sobrenome}',
		usr_telefone = '${dados.telefone}',
		usr_username = '${dados.username}',
		usr_email  = '${dados.email}'
	WHERE 
		usr_id = ${usr_id}
	`
	);
};

exports.deleteUser = async usr_id => {
	await dataBase.query(`DELETE FROM users WHERE usr_id=${usr_id}`);
};

exports.login = (login, senha) => {
	return dataBase.query(
		`SELECT * FROM users WHERE (usr_email='${login}' OR usr_username='${login}') AND usr_senha='${senha}'`
	);
};
