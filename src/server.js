const { query } = require("express");
const express = require("express"); //importando express
const server = express(); //iniciando express
const path = require("path");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const session = require("express-session");

const pages = require("./pages.js");
const auth = require("./services/AuthHandler.js");

server
  .use(express.urlencoded({ extended: true }))
  //Utilizando arquivos estáticos (imagens e etc)
  .use(express.static("public"))

  .use(cors())
  .use(cookieParser())
  .use(session({ secret: "secret", saveUninitialized: true, resave: true }))

  //Configurar template engine (páginas dinâmicas)
  .set("views", path.join(__dirname, "views"))
  .set("view engine", "hbs") //usando .hbs ao invés de .html

  //Criando rotas
  // '/' ou /index
  .get("/", pages.index) //acessa pages.index(req,res)
  .get("/orphanages", pages.orphanages)
  .get("/sgl-orphanage", pages.sgl_orphanage)
  .get("/create-orphanage", pages.create_orphanage)
  .get("/delete_db", pages.delete_db)
  .post("/save-orphanages", pages.saveOrphanages)
  .post("/save-cards", pages.saveCards)

  .get("/register", pages.register)
  .post("/register", auth.registerUser)

  .get("/login", pages.login)
  .post("/login", auth.loginUser);

server.listen(3030); //localhost:3030
