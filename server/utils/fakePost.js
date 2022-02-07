const { faker } = require('@faker-js/faker');

exports.fakePost = () => {
	const titulo = faker.lorem.sentence();
	const conteudo = faker.lorem.paragraph(10);

	const postDados = {
		titulo: titulo,
		conteudo: conteudo,
		privado: false,
	};

	return postDados;
};
