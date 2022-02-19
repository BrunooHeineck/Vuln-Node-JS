const router = require('express').Router();
const { errHandling } = require('../../utils/utils');
const { endpoints } = require('../../consts');
const userService = require('../../service/userService');

// {
// 	"req.query": {
// 			"nome": "nome",
// 			"sobrenome": "sobrenome",
// 			"telefone": "telefone",
// 			"username": "username",
// 			"email": "email",
// 			"senha": "senha",
// }

router.get(
	'/api/login',
	errHandling(
		errHandling(async (req, res) => {
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
		})
	)
);

router.get(
	'/api/signup',
	errHandling(async (req, res) => {
		const { emailJaUtilizado, usernameJaUtilizado } =
			await userService.createUser(req.query);

		if (!emailJaUtilizado && !usernameJaUtilizado) {
			res.json({ redirect: endpoints.login });
		} else if (usernameJaUtilizado) {
			res.json({ redirect: endpoints.signupUsernameerr });
		} else {
			res.json({ redirect: endpoints.signupEmailerr });
		}
	})
);

module.exports = router;
