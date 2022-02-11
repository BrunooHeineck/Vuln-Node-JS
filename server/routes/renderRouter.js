const router = require('express').Router();
const cookieParser = require('cookie-parser');
const { endpoints } = require('../consts');
const postService = require('../service/postService');
const { setCookies, clearCookies, request } = require('../utils/utils');
router.use(cookieParser());

const renderData = {
	//login
	formActionLogin: endpoints.login,
	formMethodLogin: 'get',

	//Signup
	formActionSignup: endpoints.signup,
	formMethodSignup: 'get',

	//CreatePost
	formActionCreatePost: endpoints.createPost,
	formMethodCreatePost: 'get',

	endpointPaginaInicial: endpoints.renderPaginaInicial,

	endpointSignup: endpoints.renderSignup,
	endpointLogin: endpoints.renderLogin,
	endPointLogout: endpoints.logout,
	endPointCreatePost: endpoints.renderCreatePost,
	endpointPaginaInicial: endpoints.renderPaginaInicial,
};

router.get('/', async (req, res, next) => {
	const logout = req.url.endsWith(endpoints.logout);
	if (logout) clearCookies(req.cookies, res, '/');
	else {
		const { usr_username, usr_id } = req.cookies;

		const { rows } = await postService.getAllPost();

		renderData.logado = Boolean(usr_username);
		renderData.username = usr_username;
		renderData.posts = rows;

		res.render('initial_page', renderData);
	}
});

router.get(endpoints.renderLogin, async (req, res, next) => {
	const { usr_username } = req.cookies;
	const logado = Boolean(usr_username);
	const loginError = req.url.includes('loginerr');
	const userNotFound = req.url.includes('usernotfound');

	renderData.loginErrorMessage =
		loginError && userNotFound
			? 'Usuário não encontrado'
			: loginError
			? 'Login Inválido'
			: '';

	logado
		? res.redirect(endpoints.renderPaginaInicial)
		: res.render('login', renderData);
});

router.get(endpoints.renderSignup, async (req, res) => {
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
		? res.redirect(endpoints.renderPaginaInicial)
		: res.render('signup', renderData);
});

router.get(endpoints.renderCreatePost, async (req, res) => {
	res.render('create_post', renderData);
});

module.exports = router;
