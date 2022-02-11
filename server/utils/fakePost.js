const { faker } = require('@faker-js/faker');

exports.fakePost = () => {
	faker.setLocale('pt_BR');
	const titulo = faker.lorem.sentence(
		faker.datatype.number({ min: 1, max: 5 })
	);
	const pais = faker.address.country();
	const fotografo = faker.name.findName();

	const postDados = {
		titulo: titulo,
		pais: pais,
		fotografo: fotografo,
		privado: false,
	};

	return postDados;
};
