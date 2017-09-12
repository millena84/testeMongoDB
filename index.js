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

// BODY-PARSER:
// --> importar o módulo o módulo body-parser atribuindo a uma variável
const bodyParser = require('body-parser');
// --> liga o bodyParser para ler os dados de um formulário e formatar no objeto do json
// --> indica que essa aplicação suporta corpo de envio de dados na URL
app.use(bodyParser.urlencoded());
// --> liga o bodyParser para usar dados no formato json tbm
// --> indica que a aplicação suporta corpo de envio de dados formato JSON
app.use(bodyParser.json());

// UTIL - para mostrar os objetos corretamente na log:
const util = require('util');

// JSON FILE: para gravar corretamente os usuarios? :-o
//var jsonfile = require('jsonfile');


// JSONS:
// usuarios:
var usuariosJson = require('./data/usuarios2.json');

//==========================================================================================
// INDEX:
// executar a função get do express. Ela aceita 2 parâmetros: a URL e uma função de callback para ser executada após identificada a URL.
// método: GET ()
// crio uma rota html index que vai reinderizar uma página para abrir no navegador
app.get('/', (request, response) => {
  console.log('>>>> Método GET, página /index, função render');
  // response.render significa: quando eu entrar na rota localhost:3000, responda para o servidor formatando a página index e mostre para o client
  // ao clicar no localhost:3000, estamos fazendo uma requisicao http para o express, para exibir a index
  response.render('index', {home: true});
  //console.log('Entrou na função GET da página index, com request = ' + request.body + ' e response = ' + response.body);
});

// TESTE1:
// método: GET()
// crio uma rota html teste1 que vai reinderizar uma página para exibir no navegador
app.get('/teste1', (request, response) => {
  console.log('>>>> Método GET, página /teste1, função render');
  response.render('teste1');
});

// FORMULARIO:
// método: GET ()
// apresenta o formulario para receber dados:
app.get('/formNovo', (request, response) => {
  console.log('>>>> Método GET, página /formNovo, função render');
  response.render('formNovo');
});

// método: POST (fará o envio de dados via requisição http)
// crio uma rota html testeform que vai reinderizar uma página para exibir no navegador
app.post('/formNovo', (request, response) => {
  console.log('>>>> Método POST, página /formNovo, função render');

  // na hora de exibir essa pagina, vamos usar as informacoes que estavam na requisicao para exibir em outra pagina
  response.render('resposta', request.body);

  console.log('>>>> Método POST, página /testeresposta, função render');
});

// FORMULARIO:
// método: GET ()
// apresenta o formulario para receber dados:
app.get('/formAlteracao', (request, response) => {
  console.log('>>>> Método GET, página /formNovo, função render');
  response.render('formAlteracao');
});




//=========================================================================================

// inicio o servidor. Enquanto o arquivo index.js nao for executado via pm2 no terminal, meu localhost estará indisponivel.
// app.listen significa: pegue a funcao listen da classe express e use no meu codigo.
var server = app.listen(3000, () => {
  // address nao aparece no log
  var host = server.address().address;
  var port = server.address().port;
  console.log('O servidor do express foi inicializado na porta ' + port + ', no endereço ' + util.inspect(host, {showHidden: false, depth: null}));

});

//
