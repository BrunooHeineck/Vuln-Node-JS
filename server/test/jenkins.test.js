const { request } = require('../utils/utils');
const userService = require('../service/userService');
const postService = require('../service/postService');
const utilservice = require('../service/utilService');
const { endpoints } = require('../consts');
const { fakeUser } = require('../utils/fakeUser');
const { fakePost } = require('../utils/fakePost');
const dataBase = require('../config/database').pool;
require('dotenv/config');

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
		test(`Deve existir um rota para /login utilizando o método "post"`, async () => {
			const { status } = await request(
				endpoints.realizarLogin,
				'post',
				''
			);
			expect(status).not.toBe(404);
			// expect(response.statusText).not.toBe('Not Found');
		});
		test('Deve existir um rota para /cadastrar utilizando o método "post"', async () => {
			const { status } = await request(
				endpoints.realizarCadastro,
				'post',
				''
			);
			expect(status).not.toBe(404);
			// expect(response.statusText).not.toBe('Not Found');
		});

		test('Deve existir um rota para /createpost utilizando o método "post"', async () => {
			const { status } = await request(endpoints.createPost, 'post', '');
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

	// describe('Vuln Authenticate', () => {
	// 	test('Re-registration', () => {});
	// 	test('No Auth', () => {});
	// });

	describe('Vuln XSS', () => {
		test('Deve sanetizar os dados ao criar um novo post', async () => {
			const userDados = fakeUser();

			const idUser = await userService.createUser(userDados);

			const postDados = fakePost();
			postDados.usuario = idUser;
			postDados.titulo = '<script>alert("XSS")</script>';

			await postService.createPost(postDados);

			const { rows } = await postService.getAllPost();

			console.log(rows);

			expect(rows[0].posts_titulo).toContain('&lt;script&gt;');
			expect(rows[0].posts_titulo).not.toContain('<script>');
		});
	});
});
