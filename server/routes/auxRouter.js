const router = require('express').Router();
const { fakePost } = require('../utils/fakePost');
const { fakeUser } = require('../utils/fakeUser');
const postService = require('../service/postService');
const userService = require('../service/userService');

router.get('/aux/fake/createPost', async (req, res) => {
	const fakePostData = fakePost();
	const { usr_id } = await req.query;
	fakePostData.usuario = usr_id;
	fakePostData.privado = false;

	const post_id = await postService.createPost(fakePostData);
	res.json(post_id);
});

router.get('/aux/fake/createUser', async (req, res) => {
	const usr_id = await userService.createUser(fakeUser());
	res.json(usr_id);
});

module.exports = router;
