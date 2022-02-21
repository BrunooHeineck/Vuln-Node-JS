

Consulta Parametrizada
node-postgres | Documentation | Queries
Exemplo1:
	const sqlSanitized = SELECT * FROM table WHERE column1=$1 AND column2=$2;
	dataBase.query(sqlSanitized, [value1, value2]);
Exemplo2:
	dataBase.query(SELECT * FROM table WHERE column1=$1 AND column2=$2, [value1, value2]);


Função para sanitizar os Dados que achei isso na internet para escapar os caracteres, mas nao esta funcionando
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

Exemplo de uso bcrypt
const bcrypt = require('bcrypt');

const hash = bcrypt.hashSync(myPlaintextPassword, saltRounds);
//Store hash in your password DB.

//Load hash from your password DB.
bcrypt.compareSync(myPlaintextPassword, hash); // true
bcrypt.compareSync(someOtherPlaintextPassword, hash); // false


Moelo do Banco de Dados

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


