const { request } = require('../utils/utils');
const userService = require('../service/userService');
const postService = require('../service/postService');
const utilservice = require('../service/utilService');
const { fakeUser, fakePost } = require('./mock/fake');
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
		test(`Deve existir um rota para /createpost utilizando o método POST
		path: routes/router
		Criar um nova rota POST`, async () => {
			const { status } = await request('/createpost', 'post', '');

			expect(status).not.toBe(404);
		});

		test(`Deve existir um rota para /login utilizando o método POST 
		path: routes/router
		Criar um nova rota POST`, async () => {
			const { status } = await request('/login', 'post', '');
			expect(status).not.toBe(404);
		});

		test(`Deve existir um rota para /signup utilizando o método POST 
		path: routes/router
		Criar um nova rota POST`, async () => {
			const { status } = await request('/signup', 'post', '');

			expect(status).not.toBe(404);
		});

		test(`Deve existir um rota para /api/createpost utilizando o método POST
		path: routes/api/apiPostRouter
		Alterar a rota de GET para POST`, async () => {
			const { status } = await request('/createpost', 'post', '');

			expect(status).not.toBe(404);
		});

		test(`Deve existir um rota para /api/login utilizando o método POST 
		path: routes/api/apiUserRouter
		Alterar a rota de GET para POST`, async () => {
			const { status } = await request('/login', 'post', '');
			expect(status).not.toBe(404);
		});

		test(`Deve existir um rota para /api/signup utilizando o método POST 
		path: routes/api/apiUserRouter
		Alterar a rota de GET para POST`, async () => {
			const { status } = await request('/signup', 'post', '');

			expect(status).not.toBe(404);
		});
	});

	describe('Vuln: SQL Injection', () => {
		test(`Deve sanitizar os dados de login antes de executar a query 
		path: data/userData
		Remover a concateção de strings na query SQL e substituir por uma consulta parametrizada
		Exemplo de consulta parametrizada encontrada no README`, async () => {
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
		test(`Deve sanitizar os dados ao criar um novo post
		path: service/postService
		Sanitizar os dados antes de salva-los no banco de dados
		Exemplo de sanitização encontrado no README`, async () => {
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
		test(`Deve usar hash e salt para salvar a senha no banco de dados 
		path: service/userService
		Substituir a senha por um hash com salt antes de salver no banco de dados`, async () => {
			const dados = fakeUser();
			const usr_id = await userService.createUser(dados);

			const { rows } = await utilservice.getUserById(usr_id);

			expect(rows[0].usr_senha).not.toBe(dados.senha);
		});
	});
});
