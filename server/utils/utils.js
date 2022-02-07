const cookieParser = require('cookie-parser');

exports.clearCookies = (cookies, res, redirect) => {
	Object.keys(cookies).forEach(cookie => res.clearCookie(cookie));
	if (redirect) res.redirect(redirect);
};

exports.setCookies = (dados, res) => {
	Object.entries(dados).forEach(([key, value]) => res.cookie(key, value));
};
