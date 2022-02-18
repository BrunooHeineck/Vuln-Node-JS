const router = require('express').Router();
const { endpoints, rootDirname } = require('../consts');
const cookieParser = require('cookie-parser');
const userService = require('../service/userService');
const { setCookies, clearCookies } = require('../utils/utils');
const { redirect } = require('express/lib/response');
router.use(cookieParser());

// {
// 	"req.query": {
// 			"nome": "nome",
// 			"sobrenome": "sobrenome",
// 			"telefone": "telefone",
// 			"username": "username",
// 			"email": "email",
// 			"senha": "senha",
// }

router.get('/api/login', async (req, res) => {
	const { email, senha } = req.query;
	const {
		rows,
		userNotFound,
		rowCount: loginSucesso,
	} = await userService.login(email, senha);

	if (loginSucesso) {
		const userInfo = rows[0];
		res.json({ redirect: endpoints.paginaInicial, userInfo });
	} else if (userNotFound) {
		res.json({ redirect: endpoints.loginerrusernaoencontrado });
	} else {
		//userNotFound
		res.json({ redirect: endpoints.loginerr });
	}
});

router.get('/api/signup', async (req, res) => {
	const { emailJaUtilizado, usernameJaUtilizado } =
		await userService.createUser(req.query);

	if (!emailJaUtilizado && !usernameJaUtilizado) {
		res.json({ redirect: endpoints.login });
	} else if (usernameJaUtilizado) {
		res.json({ redirect: endpoints.signupUsernameerr });
	} else {
		res.json({ redirect: endpoints.signupEmailerr });
	}
});

module.exports = router;
