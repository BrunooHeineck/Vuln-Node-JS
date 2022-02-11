const axios = require('axios');

exports.request = (endPoint, method, data) => {
	const URL_PADRAO = 'http://localhost:3000';
	const url = `${URL_PADRAO}${endPoint}`;

	return axios({
		url,
		method,
		data,
		validateStatus: false,
	});
};

exports.clearCookies = (cookies, res, redirect) => {
	Object.keys(cookies).forEach(cookie => res.clearCookie(cookie));
	if (redirect) res.redirect(redirect);
};

exports.setCookies = (dados, res) => {
	Object.entries(dados).forEach(([key, value]) => res.cookie(key, value));
};
