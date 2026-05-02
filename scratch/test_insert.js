const pool = require('../Model/db');

async function testInsert() {
  try {
    const data = {
      titre: 'AS-Chat',
      description: 'Test insertion AS-Chat',
      categorie: 'web',
      technos: 'react,node',
      lien: 'http://test.com',
      image: 'aschat-preview.png'
    };
    const [result] = await pool.query(
      'INSERT INTO projets (titre, description, categorie, technos, lien, image) VALUES (?, ?, ?, ?, ?, ?)',
      [data.titre, data.description, data.categorie, data.technos, data.lien, data.image]
    );
    console.log('Success!', result);
    process.exit(0);
  } catch (err) {
    console.error('Error!', err);
    process.exit(1);
  }
}

testInsert();
