const { request } = require('../utils/utils');
const userService = require('../service/userService');
const postService = require('../service/postService');
const utilservice = require('../service/utilService');
const { fakeUser, fakePost } = require('../utils/fake');
const dataBase = require('../config/database').pool;
const fetch = require('node-fetch');

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
	describe('Vuln: Method attribute', () => {
		test(`Deve existir um rota para /createpost utilizando o método "post"
		path: routes > postsRouter`, async () => {
			const { status, statusText } = await request(
				'/api/createpost',
				'post',
				''
			);

			expect(status).toBe(201);
			expect(statusText).toBe('Created');
		});

		test(`Deve existir um rota para /login utilizando o método "post" 
		path: routes > userRouter`, async () => {
			const { status } = await request('/api/login', 'post', '');
			expect(status).not.toBe(404);
		});

		test(`Deve existir um rota para /signup utilizando o método "post" 
		path: routes > userRouter`, async () => {
			const { status, statusText } = await request(
				'/api/signup',
				'post',
				''
			);

			expect(status).toBe(201);
			expect(statusText).toBe('Created');
		});
	});

	describe('Vuln: SQL Injection', () => {
		test('Deve sanitizar os dados de login antes de executar a query', async () => {
			const dados = fakeUser();

			await userService.createUser(dados);

			const email = '';
			const senha = "' OR TRUE --";

			const { rowCount: sucessoLoginComSQLi } = await userService.login(
				email,
				senha
			);

			expect(sucessoLoginComSQLi).toBe(false);
		});
	});

	describe('Vuln: Cross-site Scripting (XSS)', () => {
		test('Deve sanetizar os dados ao criar um novo post', async () => {
			const userDados = fakeUser();

			const idUser = await userService.createUser(userDados);

			const postDados = fakePost();
			postDados.usuario = idUser;
			postDados.titulo = '<script>console.log("XSS")</script>';

			await postService.createPost(postDados);

			const { rows } = await postService.getAllPost();

			expect(rows[0].posts_titulo).toContain(
				'&#60;script&#62;console.log(&#34;XSS&#34;)&#60;/script&#62;'
			);
			expect(rows[0].posts_titulo).not.toContain(
				'<script>console.log("XSS")</script>'
			);
		});
	});

	describe('Vuln: Senha salva em texto limpo', () => {
		test('Deve usar um hash e salt para salvar a senha no banco de dados', async () => {
			const dados = fakeUser();
			const usr_id = await userService.createUser(dados);

			const { rows } = await utilservice.getUserById(usr_id);

			expect(rows[0].usr_senha).not.toBe(dados.senha);
		});
	});

	describe.only('asgyudags', () => {
		test('jafiuydusfbia', async () => {
			const dados = fakeUser();
			const usr_id = await userService.createUser(dados);

			const userDados = fakeUser();

			const userSignup = new URLSearchParams(userDados);

			await request(`/api/signup?${userSignup}`, 'get', '');

			const userLogin = new URLSearchParams({
				email: userDados.username,
				senha: userDados.senha,
			});

			const response = await fetch(
				`http://localhost:3000/login?${userLogin}`
			);

			console.log(response.headers.raw()['set-cookie']);
		});
	});
});
