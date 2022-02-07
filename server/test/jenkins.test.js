const axios = require('axios');
const userService = require('../service/userService');
const utilservice = require('../service/utilService');
const { endPoints } = require('../consts');
const { fakeUser } = require('../utils/fakeUser');
const dataBase = require('../config/database').pool;
require('dotenv/config');

const request = (endPoint, method, data) => {
	const URL_PADRAO = 'http://localhost:3000';
	const url = `${URL_PADRAO}${endPoint}`;

	return axios({
		url,
		method,
		data,
		validateStatus: false,
	});

	// const parms = new URLSearchParams(obj).toString();
	// const { data } = await request(
	// 	`${endPoints.cadastrar}?${parms}`,
	// 	'get',
	// 	''
	// );
};

beforeAll(async () => {
	await dataBase.query(
		`SET search_path TO '${process.env.SCHEMA_TESTE_VUL}'`
	);
});

afterAll(async () => {
	await dataBase.end();
});

afterEach(async () => {
	await utilservice.clearAllPosts();
	await utilservice.clearAllUsers();
});

describe('Jenkins | Quality Gate', () => {
	describe('Vuln method attribute', () => {
		test('Deve existir um rota para /login utilizando o método "post"', async () => {
			const { status } = await request(endPoints.login, 'post', '');
			expect(status).not.toBe(404);
			// expect(response.statusText).not.toBe('Not Found');
		});
		test('Deve existir um rota para /cadastrar utilizando o método "post"', async () => {
			const { status } = await request(endPoints.cadastrar, 'post', '');
			expect(status).not.toBe(404);
			// expect(response.statusText).not.toBe('Not Found');
		});
	});

	describe('Vuln SQL Injection', () => {
		test('Deve sanitizar os dados de login antes de executar a query', async () => {
			const dados = fakeUser();

			await userService.createUser(dados);

			const email = '';
			const senha = "' OR TRUE --";

			const { rowCount } = await userService.login(email, senha);

			expect(rowCount).toBe(0);
		});
	});
});
