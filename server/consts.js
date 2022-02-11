exports.getMensagensErro = {
	404: 'Post not found',
	409: 'Post alredy exists',
	500: 'Internal Server Error',
};

exports.getEndPoints = {
	loginerr: '/login?loginerr',
	loginerruserencontrado: '/login?loginerr?usernotfound',
	login: 'login',
	cadastrar: 'cadastrar',
	logoff: '/?logoff',
};

exports.endpoints = {
	renderLogin: '/login',
	renderLogout: '/logout',
	renderSignup: '/signup',
	renderPaginaInicial: '/',
	renderLoginerr: '/login?loginerr',
	renderLoginerrusernaoencontrado: '/login?loginerr?usernotfound',
	renderSignupEmailerr: '/signup?signup?emailerr',
	renderSignupUsernameerr: '/signup?signup?usernameerr',
	renderCreatePost: '/createpost',

	logout: '/?logout',

	login: '/api/login',
	signup: '/api/signup',
	createPost: '/api/createpost',
};
