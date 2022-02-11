const constantes = require('./consts');
const express = require('express');
const app = express();
const path = require('path');
const connectionTest = require('./config/database').connectionTest;

app.use(express.json());
app.use('/', require('./routes/renderRouter'));
app.use('/', require('./routes/userRouter'));
app.use('/', require('./routes/postRouter'));
app.use('/', require('./routes/auxRouter'));

//Config para acessar o arquivo CSS => C:\Users\bruno.heineck\Projetos\NodeJs SCD\api\server\views\styles\
app.use(express.static(__dirname + '/views'));

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

const porta = process.env.PORT || 3000;
app.listen(porta, () => {
	console.log(`Sevidor Rodando na porta ${porta} => ${__dirname}`);
	connectionTest();
});

// app.use((error, req, res, next) => {
// 	if (error.message === constantes.getMensagensErro[40]4)
// 		return res.status(404).send(constantes.getMensagensErro[404]);

// 	if (error.message === constantes.getMensagensErro[409])
// 		return res.status(409).send(constantes.getMensagensErro[409]);

// 	if (error.message === constantes.getMensagensErro[500])
// 		return res.status(500).send(constantes.getMensagensErro[500]);
// });
