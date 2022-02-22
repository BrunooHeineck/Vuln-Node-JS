const router = require('express').Router();
const cookieParser = require('cookie-parser');
const { response } = require('express');
const { endpoints } = require('../consts');
const postService = require('../service/postService');
const { setCookies, clearCookies, request } = require('../utils/utils');
router.use(cookieParser());

const renderData = {
	//login
	formActionLogin: '/login',
	formMethodLogin: 'get',

	//Signup
	formActionSignup: '/signup',
	formMethodSignup: 'get',

	//CreatePost
	formActionCreatePost: '/createpost',
	formMethodCreatePost: 'get',

	endpointSignup: '/signup',
	endpointLogin: '/login',
	endPointLogout: '/?logout',
	endPointCreatePost: '/createpost',
	endpointPaginaInicial: '/',
};

// {
// 	"req.query": {
// 			"nome": "nome",
// 			"sobrenome": "sobrenome",
// 			"telefone": "telefone",
// 			"username": "username",
// 			"email": "email",
// 			"senha": "senha",
// }

router.get('/', async (req, res) => {
	const logout = req.url.endsWith(endpoints.logout);
	if (logout) clearCookies(req.cookies, res, '/');
	else {
		const { usr_username } = req.cookies;

		const { rows } = await postService.getAllPost();

		renderData.logado = Boolean(usr_username);
		renderData.username = usr_username;
		renderData.posts = rows;

		res.render('initial_page', renderData);
	}
});

router.get('/login', async (req, res) => {
	const { usr_username } = req.cookies;
	const logado = Boolean(usr_username);
	const loginError = req.url.includes('loginerr');
	const userNotFound = req.url.includes('usernotfound');
	// REALIZAR LOGIN {
	const loginRequest = req.url.includes('email') && req.url.includes('senha');

	if (loginRequest) {
		const { email, senha } = req.query;
		const params = new URLSearchParams({ email, senha });
		const { data } = await request(`/api/login?${params}`, 'get', '');

		if (data.userInfo) {
			clearCookies(req.cookies, res);
			setCookies(data.userInfo, res);
		}

		res.redirect(data.redirect);
		//REALIZAR LOGIN }
	} else {
		renderData.loginErrorMessage =
			loginError && userNotFound
				? 'Usuário não encontrado'
				: loginError
				? 'Senha incorreta'
				: '';

		logado
			? res.redirect(endpoints.paginaInicial)
			: res.render('login', renderData);
	}
});

router.get('/signup', async (req, res) => {
	const { usr_username } = req.cookies;
	const logado = Boolean(usr_username);
	const emailErr = req.url.includes('emailerr');
	const usernameErr = req.url.includes('usernameerr');
	// REALIZAR CADASTRO {
	const userCreateRequest = req.url.includes('email');

	if (userCreateRequest) {
		const dados = req.query;
		const params = new URLSearchParams(dados);
		const { data } = await request(`/api/signup?${params}`, 'get', '');
		res.redirect(data.redirect);
		// REALIZAR CADASTRO }
	} else {
		renderData.signupErrorMessage = emailErr
			? 'E-mail já cadastrado'
			: usernameErr
			? 'Username já cadastrado'
			: '';

		logado
			? res.redirect(endpoints.paginaInicial)
			: res.render('signup', renderData);
	}
});

router.get('/createpost', async (req, res) => {
	const logado = Boolean(req.cookies.usr_id);
	// REALIZAR CREATE POST {
	const postCreateRequest = req.url.includes('titulo');

	if (postCreateRequest) {
		const dados = req.query;
		if (dados.usuario === undefined) dados.usuario = req.cookies.usr_id;
		const params = new URLSearchParams(dados);
		const { data } = await request(`/api/createpost?${params}`, 'get', '');
		res.redirect(data.redirect);
		// REALIZAR CREATE POST }
	} else {
		logado ? res.render('create_post', renderData) : res.redirect('/login');
	}
});

module.exports = router;
