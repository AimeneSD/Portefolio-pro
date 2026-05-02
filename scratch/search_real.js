const pool = require('../Model/db');

async function searchRealProject() {
  try {
    const [rows] = await pool.query("SELECT * FROM projets WHERE description LIKE '%gestion sécurisée%'");
    console.log(JSON.stringify(rows, null, 2));
    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}

searchRealProject();
