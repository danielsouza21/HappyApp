const DatabaseCards = require("sqlite-async");
console.log("Database Cards access...");

function execute(db) {
  return db.exec(`
    CREATE TABLE IF NOT EXISTS cards (
        cards TEXT,
        id_page INTEGER
    );
  `);
}

module.exports = DatabaseCards.open(__dirname + "/databaseCards.sqlite").then(
  execute
);
