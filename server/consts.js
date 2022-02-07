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

exports.endPoints = {
	loginerr: '/login?loginerr',
	loginerruserencontrado: '/login?loginerr?usernotfound',
	login: '/login',
	cadastrar: '/cadastrar',
	logoff: '/?logoff',
};
