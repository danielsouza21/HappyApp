const express = require("express"); //importando express
const server = express(); //iniciando express

//Criando rota
server.get("/", (request, response) => {
  // -> '/index.html'
  return response.send({ Hello: "World" });
});

//Start server [Sem utilizar LiveServer (127.0.0.1:5500)]
server.listen(3030); //localhost:3030
