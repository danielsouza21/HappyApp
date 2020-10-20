/*
  ARQUIVO TESTE NÃO USADO NA APLICAÇÃO
  De puro valor educacional
*/

const Database = require("./db");
const saveOrphanage = require("./saveOrphanage");

const oph1 = {
  lat: "-19.8500051",
  lng: "-43.9827995",
  name: "Lar das meninas",
  about: "Presta assistencia pras mina...",
  whatsapp: "31 155 551",
  images: [
    "https://images.unsplash.com/photo-1594925782033-0238ef32fca0?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1080&fit=max&ixid=eyJhcHBfaWQiOjF9",
    "https://images.unsplash.com/photo-1586458132313-b6191b25f567?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1080&fit=max&ixid=eyJhcHBfaWQiOjF9",
  ].toString(),
  instructions: "Cola mais minas",
  opening_hours: "Horario até as 18h",
  open_on_weekends: "1",
};

const oph2 = {
  lat: "-19.8500051",
  lng: "-43.99827995",
  name: "Lar dos cria",
  about: "Presta assistencia pros mlk...",
  whatsapp: "31 171 771",
  images: [
    "https://images.unsplash.com/photo-1594925782033-0238ef32fca0?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1080&fit=max&ixid=eyJhcHBfaWQiOjF9",
    "https://images.unsplash.com/photo-1586458132313-b6191b25f567?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1080&fit=max&ixid=eyJhcHBfaWQiOjF9",
  ].toString(),
  instructions: "Cola mais manos",
  opening_hours: "Horario até as 20h",
  open_on_weekends: "0",
};

Database.then(async function (db) {
  //inserir dados na tabela
  /*
  await db.run(`
    INSERT INTO orphanages (
        lat,
        lng,
        name,
        about, 
        whatsapp,
        images,
        instructions,
        opening_hours,
        open_on_weekends
    ) VALUES (
        "-19.8500051",
        "-43.9827995",
        "Lar das meninas",
        "Presta assistencia pras mina...",
        "31 155 551",
        "https://images.unsplash.com/photo-1594925782033-0238ef32fca0?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1080&fit=max&ixid=eyJhcHBfaWQiOjF9",
        "Cola mais minas",
        "Horario até as 18h",
        "1"
    );
    `);
  */
  await db.run(`DELETE FROM orphanages`); //delete all database
  await saveOrphanage(db, oph1);
  await saveOrphanage(db, oph2);

  //consultar dados na tabela
  const selectedOrphanages = await db.all(`SELECT * FROM orphanages`);

  //consultando unico orfanato pelo id
  /*
  var id = "2";
  const sgl_orphanage = await db.all(
    `SELECT * FROM orphanages WHERE id = ${id}`
  );
  */

  console.log(selectedOrphanages); //imprime tabela

  //await db.run(`DELETE FROM orphanages WHERE id = '1'`);
});
