const data = require('../data/userData');
const utilService = require('../service/utilService');

exports.createUser = async dados => {
	const { rowCount: emailJaUtilizado } = await utilService.getUserByEmail(
		dados.email
	);

	const { rowCount: usernameJaUtilizado } =
		await utilService.getUserByUsername(dados.username);

	if (usernameJaUtilizado || emailJaUtilizado) {
		return { usernameJaUtilizado, emailJaUtilizado };
	} else return await data.createUser(dados);
};

exports.updateUser = async (usr_id, dados) => {
	return await data.updateUser(usr_id, dados);
};

exports.deleteUser = async usr_id => {
	await data.deleteUser(usr_id);
};

exports.login = async (email, senha) => {
	const userEncontrado = await validaEmailUsername(email);

	const response = await data.login(email, senha);
	response.userFound = userEncontrado;

	return response;
};

async function validaEmailUsername(email) {
	const { rowCount: emailEncontrado } = await utilService.getUserByEmail(
		email
	);
	const { rowCount: usernameEncontrado } =
		await utilService.getUserByUsername(email);

	return Boolean(emailEncontrado || usernameEncontrado);
}
