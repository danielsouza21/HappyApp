const Database = require("sqlite-async");
console.log("SQL Database acess...");

function execute(db) {
  return db.exec(`
    CREATE TABLE IF NOT EXISTS orphanages (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        lat TEXT,
        lng TEXT,
        name TEXT,
        about TEXT,
        whatsapp TEXT,
        images TEXT,
        instructions TEXT,
        opening_hours TEXT,
        open_on_weekends TEXT,
        owner TEXT
    );
  `);
}

module.exports = Database.open(__dirname + "/database.sqlite").then(execute);
//retorna o DataBase SQL
