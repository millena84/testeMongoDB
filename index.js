// --> importar  módulo via require - atribuindo a uma variável:
const express = require('express');
// --> inicializar o objeto app chamando a função express()
// --> estou instanciando o objeto app usando a classe express()
const app = express();

// EXPRESS-SESSION: para trabalhar com cookies e sessoes - importa com var porque a sessao muda (entao nao pode declarar como const)
var session = require('express-session');

// EXPRESS-HANDLEBARS:
// --> importar modulo express-handlebars, atribuindo a uma variável:
const handlebars = require('express-handlebars');
// --> inicializar a função engine do express, passando como parâmetro o handlebars e usando a função handlebars:
// significa que existe uma função no express onde eu indico qual template engine eu vou usar para fazer o front
app.engine('handlebars', handlebars({defaultLayout: 'main'}));
// --> liga o handlebars para ele ser o mecanismo que fará a interpretação e apresentação do html quando forem feitas as requisições:
app.set('view engine', 'handlebars');


// imprto o mongoose:
const mongoose = require('mongoose');

// BODY-PARSER:
// --> importar o módulo o módulo body-parser atribuindo a uma variável
const bodyParser = require('body-parser');
// --> liga o bodyParser para ler os dados de um formulário e formatar no objeto do json
// --> indica que essa aplicação suporta corpo de envio de dados na URL
app.use(bodyParser.urlencoded());
// --> liga o bodyParser para usar dados no formato json tbm
// --> indica que a aplicação suporta corpo de envio de dados formato JSON
app.use(bodyParser.json());


// conectar ao banco:
// mongoose.connect('mongodb://localhost/mastertech');127.0.0.1

mongoose.connect('mongodb://localhost/27017/test');

// Schema
const testeMongoose = mongoose.model('testeMongoose',
{
  nome: String,
  email: String,
  telefone: Number,
  datanasc: Date,
  valor: Number,
  ativo: String,
  ultatu: Date
});

/*
db.testeMongoose.find()
{ "_id" : ObjectId("59bdb699aea082cbece512ee"),
  "nome" : "Millena teste",
  "email" : "millena@teste.com",
  "telefone" : "992764447",
  "datanasc" : "1984-07-30",
  "valor" : "300.00",
  "ativo" : "true",
  "ultatu" : ISODate("2017-09-16T23:41:13.169Z") }
*/

// inicio o servidor. Enquanto o arquivo index.js nao for executado via pm2 no terminal, meu localhost estará indisponivel.
// app.listen significa: pegue a funcao listen da classe express e use no meu codigo.
var server = app.listen(3001, () => {
  // address nao aparece no log
  var port = server.address().port;
  console.log('>>>>>> O servidor do express foi inicializado na porta ' + port);

});


app.get('/', (request, response) => {
  console.log('>>> Método GET, página /index, função render');

  testeMongoose.find((erro, teste) => {
    if (erro) {
      return response.render('>>>>># XI, DEU RUIM');
    }
    response.render('index', { list: teste });
    console.log('>> log: ' + teste);
    console.log('>> testeMongoose: ' + testeMongoose);
  });

});

app.get('/formNovo', (request, response) => {
  console.log('>>>> Método GET, página /formNovo, função render');
  response.render('formNovo');
});

/*
app.post('/formNovo', (request, response) => {
  console.log('>>>> Método POST, página /formNovo, função render');

  response.render('resposta', request.body);

  console.log('>>>> Método POST, página /testeresposta, função render');
});

app.get('/formAlteracao', (request, response) => {
  console.log('>>>> Método GET, página /formNovo, função render');
  response.render('formAlteracao');
});
*/
