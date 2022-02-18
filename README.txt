# server > router > service > data

# server\server.js => Todas as config do server, porta, path...

# server\router\router.js => Define o endpoint que irá chamar service

# server\service\service.js => Service, contém toda a regra de negócio, função chamará data.

# server\data\data.js => Utiliza a conexão com o banco de dados(database.js) para executar o SQL.

# server\config\database.js => Arquivo com as configurações do banco de dados. Exporta uma conexão com banco de dados já configurado.

# server\views\index.ejs => ejs = Embedded JavaScript templates = engine de visualização. Contém a view.


node-postgres | Documentation | Queries
# const sqlSanitized = SELECT * FROM table WHERE column1=$1 AND column2=$2;
# dataBase.query(sqlSanitized, [value1, value2]);


achei isso na internet para escapar os caracteres, mas nao esta funcionando
exports.escape = async unescapedString => {
	const regexChar = /[<>`'"&]/g;
	let arrayChar;
	let escapedString = unescapedString;

	while ((arrayChar = regexChar.exec(unescapedString)) !== null) {
		let foundChar = arrayChar[0];
		let charCode = foundChar.charCodeAt(0);

		if (foundChar === '&') foundChar = /&(?!#)/g;

		escapedString = escapedString.replaceAll(foundChar, `&#${charCode};`);
	}
	//
};


Banco de Dados

users (
	usr_id SERIAL PRIMARY KEY,
	usr_nome VARCHAR(100),
	usr_sobrenome VARCHAR(100),
	usr_telefone VARCHAR(14),
	usr_username VARCHAR(50),
	usr_email VARCHAR(100),
	usr_senha VARCHAR,
	usr_admin BOOLEAN,
);

posts (
	posts_id SERIAL,
	posts_titulo VARCHAR(100),
	posts_pais VARCHAR(50),
	posts_fotografo VARCHAR(50),	
	posts_usuario INTEGER,
	posts_privado BOOLEAN,	
);


