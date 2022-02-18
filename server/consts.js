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
	login: '/login',
	renderLogout: '/logout',
	signup: '/signup',
	paginaInicial: '/',
	loginerr: '/login?loginerr',
	loginerrusernaoencontrado: '/login?loginerr?usernotfound',
	signupEmailerr: '/signup?signup?emailerr',
	signupUsernameerr: '/signup?signup?usernameerr',
	createPost: '/createpost',

	logout: '/?logout',

	apiLogin: '/api/login',
	apiSignup: '/api/signup',
	apiCreatePost: '/api/createpost',
};
