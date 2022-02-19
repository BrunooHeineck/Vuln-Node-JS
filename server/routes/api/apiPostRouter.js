const router = require('express').Router();
const { endpoints } = require('../../consts');
const postService = require('../../service/postService');
const { errHandling } = require('../../utils/utils');

// {
// 	"req.query": {
// 		"titulo": "titulo",
// 		"pais": "pais",
// 		"usuario": "usuario",
// 		"fotografo": "fotografo"
// 	}
// }

router.get(
	'/api/createpost',
	errHandling(async (req, res) => {
		const dados = req.query;
		const { usr_id } = req.cookies;
		dados.usuario = usr_id;

		await postService.createPost(dados);

		res.redirect(endpoints.paginaInicial);
	})
);

module.exports = router;
