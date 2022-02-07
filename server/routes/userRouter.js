const router = require('express').Router();
const { response } = require('express');
const { endPoints } = require('../consts');
const service = require('../service/userService');

// router.post('/login', async (req, res) => {
// 	console.log(req);
// 	console.log(req.body);
// 	res.end();
// });

router.get(endPoints.login, async (req, res) => {
	//query => get
	//body => post

	const { email, senha } = req.query;

	const response = await service.login(email, senha);

	res.end();
	// const lembrarDeMim = req.query.lembrarDeMim;

	// const loginErr = req.url.includes('loginerr');
	// const requestLogin = req.url.includes('email');
	// const loginErrUserEncontrado = req.url.endsWith('usernotfound');

	// const jaLogado = req.cookies?.username;

	// const loginErrorMensagem = loginErrUserEncontrado
	// 	? 'Usuário não encontrado'
	// 	: 'Login Incorreto';
	// const setCookie = response => {
	// 	res.clearCookie('username');
	// 	res.clearCookie('ud_nome');

	// 	const { rowsLogin, userEncontrado } = response;

	// 	console.log(rowsLogin);

	// 	if (rowsLogin) {
	// 		res.cookie('username', rowsLogin.usr_username);
	// 		res.cookie('admin', Boolean(rowsLogin.usr_admin));
	// 		res.cookie('id', rowsLogin.usr_id);
	// 		res.cookie('response', rowsLogin);
	// 		res.redirect('/');
	// 	} else {
	// 		res.redirect(
	// 			userEncontrado
	// 				? endPointLoginErr
	// 				: endPointloginErrUserEncontrado
	// 		);
	// 	}
	// };
	// if (jaLogado) res.redirect('/');
	// else if (requestLogin) {
	// 	const response = await service.login(email, senha);
	// 	setCookie(response);
	// } else {
	// 	res.render('login', {
	// 		loginError: loginErr ? loginErrorMensagem : '',
	// 		hrefCadastrar: hrefCadastrar,
	// 		actionLogin: actionLogin,
	// 	});
	// }
});

// router.post(endPoints.login, async (req, res) => {
// 	res.json('Login Post');
// });

// router.post(endPoints.cadastrar, async (req, res) => {
// 	res.json('Cadastrar Post');
// });

router.get(endPoints.cadastrar, async (req, res) => {
	const id = await service.cadastrar(req.query);
	res.json(id);
});

module.exports = router;
