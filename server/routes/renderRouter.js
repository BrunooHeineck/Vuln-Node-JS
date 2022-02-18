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
	formActionSignup: endpoints.apiSignup,
	formMethodSignup: 'get',

	//CreatePost
	formActionCreatePost: endpoints.apiCreatePost,
	formMethodCreatePost: 'get',

	endpointPaginaInicial: endpoints.paginaInicial,

	endpointSignup: endpoints.signup,
	endpointLogin: '/login',
	endPointLogout: endpoints.logout,
	endPointCreatePost: endpoints.createPost,
	endpointPaginaInicial: endpoints.paginaInicial,
};

router.get('/', async (req, res, next) => {
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

router.get('/login', async (req, res, next) => {
	const { usr_username } = req.cookies;
	const logado = Boolean(usr_username);
	const loginError = req.url.includes('loginerr');
	const userNotFound = req.url.includes('usernotfound');
	const loginRequest = req.url.includes('email') && req.url.includes('senha');

	if (loginRequest) {
		const { email, senha } = req.query;
		const params = new URLSearchParams({ email, senha });
		const { data } = await request(`/api/login?${params}`, 'get', '');

		clearCookies(req.cookies, res);
		setCookies(data.userInfo, res);
		res.redirect('/');
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

	renderData.signupErrorMessage = emailErr
		? 'E-mail já cadastrado'
		: usernameErr
		? 'Username já cadastrado'
		: '';

	logado
		? res.redirect(endpoints.paginaInicial)
		: res.render('signup', renderData);
});

router.get('/createpost', async (req, res) => {
	const { usr_username } = req.cookies;
	const logado = Boolean(usr_username);

	logado ? res.render('create_post', renderData) : res.redirect('/login');
});

module.exports = router;
