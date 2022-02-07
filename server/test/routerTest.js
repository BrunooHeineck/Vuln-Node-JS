const router = require('express').Router();
const cookieParser = require('cookie-parser');
router.use(cookieParser());

router.get('/getCookies', async (req, res, next) => {
	const cookies = req.cookies;

	res.json(cookies);
});

module.exports = router;
