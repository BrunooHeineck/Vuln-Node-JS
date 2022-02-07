const router = require('express').Router();
const cookieParser = require('cookie-parser');
const { endPoints } = require('../consts');
const { setCookies, clearCookies } = require('../utils/utils');
router.use(cookieParser());

router.get('/', async (req, res, next) => {
	const solicitandoLogoff = req.url.endsWith(endPoints.logoff);

	if (solicitandoLogoff) clearCookies(req.cookies, res, '/');
	else {
		res.render('initial_page', {
			logado: false,
			nome: '',

			endPointLogoff: '',
			hrefCadastrar: '',
			posts: '',
		});
	}
});

// router.get('/login', async (req, res) => {
// 	const jaLogado = req.cookies;

// 	const email = req.query.email;
// 	const senha = req.query.senha;
// 	const lembrarDeMim = req.query.lembrarDeMim;

// 	const loginErr = req.url.includes('loginerr');
// 	const requestLogin = req.url.includes('email');
// 	const loginErrUserEncontrado = req.url.endsWith('usernotfound');

// 	const jaLogado = req.cookies?.username;

// 	const loginErrorMensagem = loginErrUserEncontrado
// 		? 'Usuário não encontrado'
// 		: 'Login Incorreto';

// 	//Realiza a atribuição dos cookies
// 	const setCookie = response => {
// 		res.clearCookie('username');
// 		res.clearCookie('ud_nome');

// 		const { rowsLogin, userEncontrado } = response;

// 		console.log(rowsLogin);

// 		if (rowsLogin) {
// 			res.cookie('username', rowsLogin.usr_username);
// 			res.cookie('admin', Boolean(rowsLogin.usr_admin));
// 			res.cookie('id', rowsLogin.usr_id);
// 			res.cookie('response', rowsLogin);
// 			res.redirect('/');
// 		} else {
// 			res.redirect(
// 				userEncontrado
// 					? endPointLoginErr
// 					: endPointloginErrUserEncontrado
// 			);
// 		}
// 	};

// 	if (jaLogado) res.redirect('/');
// 	else if (requestLogin) {
// 		const response = await service.login(email, senha);
// 		setCookie(response);
// 	} else {
// 		res.render('login', {
// 			loginError: loginErr ? loginErrorMensagem : '',
// 			hrefCadastrar: hrefCadastrar,
// 			actionLogin: actionLogin,
// 		});
// 	}
// });

router.get('/setCookies', async (req, res) => {
	const obj = {
		a: 'aa',
		b: 'bb',
		c: 'cc',
		d: 'dd',
		e: 'ee',
	};

	setCookies(obj, res);
	res.end();
});

router.get('/clearCookies', async (req, res) => {
	const obj = {
		a: 'aa',
		b: 'bb',
		c: 'cc',
		d: 'dd',
		e: 'ee',
	};
	clearCookies(obj, res);
	res.end();
});

module.exports = router;
