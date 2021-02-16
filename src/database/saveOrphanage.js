async function saveOrphanage(db, new_orphanage) {
  //inserir dados na tabela
  return await db.run(`
    INSERT INTO orphanages (
        lat,
        lng,
        name,
        about, 
        whatsapp,
        images,
        instructions,
        opening_hours,
        open_on_weekends,
        owner
    ) VALUES (
        "${new_orphanage.lat}",
        "${new_orphanage.lng}",
        "${new_orphanage.name}",
        "${new_orphanage.about}",
        "${new_orphanage.whatsapp}",
        "${new_orphanage.images}",
        "${new_orphanage.instructions}",
        "${new_orphanage.opening_hours}",
        "${new_orphanage.open_on_weekends}",
        "${new_orphanage.owner}"
    );
    `);
}

module.exports = saveOrphanage; //output -> function save
