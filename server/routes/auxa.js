const router = require('express').Router();
const cookieParser = require('cookie-parser');
const constantes = require('../consts');
const service = require('../service/userService');
router.use(cookieParser());

const hrefLogin = `href="${constantes.getEndPoints.login}"`;
const hrefCadastrar = `href="${constantes.getEndPoints.cadastrar}"`;

const actionLogin = `action='/${constantes.getEndPoints.login}' method="post"`;
const actionCadastrar = `action='/${constantes.getEndPoints.cadastrar}'`;

const endPointLogoff = `href="${constantes.getEndPoints.logoff}"`;
const endPointLoginErr = constantes.getEndPoints.loginerr;
const endPointloginErrUserEncontrado =
	constantes.getEndPoints.loginerruserencontrado;

const endPointUrl = {
	login: `/${constantes.getEndPoints.login}`,
	cadastrar: `/${constantes.getEndPoints.cadastrar}`,
};

router.get('/', async (req, res, next) => {
	// http://localhost:3000/?logoff
	// procura na URL as palavras
	const logoff = req.url.endsWith(constantes.getEndPoints.logoff);
	// se for uma req de logoff redireciona para a pagina principal e limpa cookies
	// se nao renderiza a pagina inicial com o nome do user
	if (logoff) {
		res.clearCookie('username');
		res.clearCookie('admin');
		res.redirect('/');
	} else {
		const cookies = req.cookies;
		const username = cookies ? cookies?.username : false;

		const { rows } = await service.getAllPostsByUserId(cookies?.id);

		res.render('initial_page', {
			logado: username,
			nome: username,

			endPointLogoff: endPointLogoff,
			hrefCadastrar: hrefCadastrar,
			posts: rows,
		});
	}
});

router.get(endPointUrl.cadastrar, async (req, res, next) => {
	// procura na URL as palavras
	const requestCadastro = req.url.includes('?');

	//se for uma req de cadastro, chama o service para cadastrar e redireciona para página inicial.
	//se nao é apenas um simples consulta na pagina /cadastrar
	if (requestCadastro) {
		await service.create(req.query);
		res.redirect('/');
	} else {
		res.render('cadastro', {
			hrefLogin: hrefLogin,
			actionCadastrar: actionCadastrar,
		});
	}
});

router.get(endPointUrl.login, async (req, res) => {
	//url => http://localhost:3000/login?email=brunooheineck&senha=senha1909
	const email = req.query.email;
	const senha = req.query.senha;
	const lembrarDeMim = req.query.lembrarDeMim;

	//procura na URL as palavras
	const loginErr = req.url.includes('loginerr');
	const requestLogin = req.url.includes('email');
	const loginErrUserEncontrado = req.url.endsWith('usernotfound');

	//verifica se já exitem cookies, usuario já realizou o login ou não
	const jaLogado = req.cookies?.username;

	const loginErrorMensagem = loginErrUserEncontrado
		? 'Usuário não encontrado'
		: 'Login Incorreto';

	//Realiza a atribuição dos cookies
	const setCookie = response => {
		res.clearCookie('username');
		res.clearCookie('ud_nome');

		const { rowsLogin, userEncontrado } = response;

		if (rowsLogin) {
			res.cookie('username', rowsLogin.usr_username);
			res.cookie('admin', Boolean(rowsLogin.usr_admin));
			res.cookie('id', rowsLogin.usr_id);
			res.cookie('response', rowsLogin);
			res.redirect('/');
		} else {
			res.redirect(
				userEncontrado
					? endPointLoginErr
					: endPointloginErrUserEncontrado
			);
		}
	};

	//se já estiver logado redireciona para a pagina '/'
	//se for uma req de login, valida autentica e atribui os cookies do usuário.
	//se nenhuma das anterioes, renderiza a uma página de erro
	if (jaLogado) res.redirect('/');
	else if (requestLogin) {
		const response = await service.login(email, senha);
		setCookie(response);
	} else {
		res.render('login', {
			loginError: loginErr ? loginErrorMensagem : '',
			hrefCadastrar: hrefCadastrar,
			actionLogin: actionLogin,
		});
	}
});

router.post('/login', async (req, res) => {
	res.status(200).json('ok');
});

module.exports = router;
