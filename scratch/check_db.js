const pool = require('../Model/db');

async function checkAschatProject() {
  try {
    const [rows] = await pool.query("SELECT * FROM projets WHERE titre LIKE '%aschat%' OR description LIKE '%aschat%' OR image LIKE '%aschat%'");
    console.log(JSON.stringify(rows, null, 2));
    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}

checkAschatProject();

