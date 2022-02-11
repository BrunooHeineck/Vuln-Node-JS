const router = require('express').Router();
const { endpoints, rootDirname } = require('../consts');
const cookieParser = require('cookie-parser');
const userService = require('../service/userService');
const { setCookies, clearCookies } = require('../utils/utils');
router.use(cookieParser());

router.get(endpoints.login, async (req, res) => {
	const { email, senha } = req.query;
	const { rows, userFound, rowCount } = await userService.login(email, senha);
	const userNotFound = !userFound;
	const loginSucesso = rowCount;

	if (userNotFound) {
		res.redirect(endpoints.renderLoginerrusernaoencontrado);
	} else if (loginSucesso) {
		clearCookies(req.cookies);
		setCookies(rows[0], res);
		res.redirect(endpoints.renderPaginaInicial);
	} else {
		res.redirect(endpoints.renderLoginerr);
	}
});

router.get(endpoints.signup, async (req, res) => {
	const dados = req.query;

	const { emailJaUtilizado, usernameJaUtilizado } =
		await userService.createUser(dados);

	if (emailJaUtilizado) {
		res.redirect(endpoints.renderSignupEmailerr);
	} else if (usernameJaUtilizado) {
		res.redirect(endpoints.renderSignupUsernameerr);
	} else {
		res.redirect(endpoints.renderLogin);
	}
});

module.exports = router;
