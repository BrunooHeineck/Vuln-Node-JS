const router = require('express').Router();
const { fakePost } = require('../utils/fakePost');
const { fakeUser } = require('../utils/fakeUser');
const postService = require('../service/postService');
const userService = require('../service/userService');
const res = require('express/lib/response');

router.get('/aux/fake/createPost', async (req, res) => {
	const fakePostData = fakePost();
	fakePostData.usuario = 18;
	fakePostData.privado = false;

	const post_id = await postService.createPost(fakePostData);
	res.json(post_id);
});

router.get('/aux/fake/createUser', async (req, res) => {
	const usr_id = await userService.createUser(fakeUser());
	res.json(usr_id);
});

module.exports = router;
