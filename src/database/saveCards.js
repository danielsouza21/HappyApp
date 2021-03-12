async function saveCardsDb(db, new_cards) {
  //inserir dados na tabela
  return await db.run(`
      INSERT INTO cards (
        cards,
        id_page
      ) VALUES (
          "${new_cards.cards}",
          "${new_cards.id_page}"
      );
      `);
}

module.exports = saveCardsDb;
