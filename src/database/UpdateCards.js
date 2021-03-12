async function UpdateCardsDb(db, new_cards) {
  return await db.run(`
    UPDATE cards SET cards="${new_cards.cards}" WHERE id_page="${new_cards.id_page}"
      `);
}

module.exports = UpdateCardsDb;
