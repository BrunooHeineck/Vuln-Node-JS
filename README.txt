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


