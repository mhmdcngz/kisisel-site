import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });

async function fixDatabase() {
  const pool = mysql.createPool({
     host: process.env.DB_HOST,
     user: process.env.DB_USER,
     password: process.env.DB_PASSWORD,
     database: process.env.DB_NAME,
     port: parseInt(process.env.DB_PORT || '3306', 10),
  });

  try {
    const connection = await pool.getConnection();
    console.log('Connected to database.');

    // Check columns
    const [columns] = await connection.query('SHOW COLUMNS FROM projects');
    const columnNames = (columns as any[]).map(c => c.Field);

    if (!columnNames.includes('tech_stack')) {
      console.log('Adding missing column: tech_stack');
      await connection.query('ALTER TABLE projects ADD COLUMN tech_stack VARCHAR(255)');
    } else {
        console.log('Column tech_stack already exists.');
    }

    if (!columnNames.includes('github_url')) {
       console.log('Adding missing column: github_url');
       await connection.query('ALTER TABLE projects ADD COLUMN github_url VARCHAR(255)');
    } else {
        console.log('Column github_url already exists.');
    }

    if (!columnNames.includes('demo_url')) {
        console.log('Adding missing column: demo_url');
        await connection.query('ALTER TABLE projects ADD COLUMN demo_url VARCHAR(255)');
    } else {
        console.log('Column demo_url already exists.');
    }

    console.log('Database verification complete.');
    connection.release();
  } catch (error) {
    console.error('Error fixing database:', error);
  } finally {
    pool.end();
  }
}

fixDatabase();
