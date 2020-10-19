const { query } = require("express");
const express = require("express"); //importando express
const server = express(); //iniciando express
const path = require("path");

const pages = require("./pages.js");

server
  //Utilizando arquivos estáticos (imagens e etc)
  .use(express.static("public"))

  //Configurar template engine (páginas dinâmicas)
  .set("views", path.join(__dirname, "views"))
  .set("view engine", "hbs") //usando .hbs ao invés de .html

  //Criando rotas
  // '/' ou /index
  .get("/", pages.index) //acessa pages.index(req,res)
  //
  .get("/orphanages", pages.orphanages)
  //
  .get("/sgl-orphanage", pages.sgl_orphanage)
  //
  .get("/create-orphanage", pages.create_orphanage);

//Start server [Sem utilizar LiveServer (127.0.0.1:5500)]
server.listen(3030); //localhost:3030
