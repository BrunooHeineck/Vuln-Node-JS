const router = require('express').Router();
const { endpoints } = require('../consts');
const postService = require('../service/postService');

router.get(endpoints.createPost, async (req, res) => {
	const dados = req.query;
	const { usr_id } = req.cookies;
	dados.usuario = usr_id;

	await postService.createPost(dados);

	res.redirect(endpoints.renderPaginaInicial);
});

module.exports = router;
