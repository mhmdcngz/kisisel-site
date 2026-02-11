const mysql = require('mysql2/promise');
const fs = require('fs');
const path = require('path');

async function check() {
    const envPath = path.join(__dirname, '..', '.env.local');
    const envFile = fs.readFileSync(envPath, 'utf8');
    const env = {};
    envFile.split('\n').forEach(line => {
        const [key, value] = line.split('=');
        if (key && value) env[key.trim()] = value.trim();
    });

    const connection = await mysql.createConnection({
        host: env.DB_HOST,
        user: env.DB_USER,
        password: env.DB_PASSWORD,
        database: env.DB_NAME,
        port: parseInt(env.DB_PORT) || 3306,
        ssl: {
             minVersion: 'TLSv1.2',
             rejectUnauthorized: true
        }
    });

    console.log('Connected to database.');

    const [tables] = await connection.query("SHOW TABLES LIKE 'messages'");
    if (tables.length === 0) {
        console.log('Table `messages` does not exist.');
    } else {
        console.log('Table `messages` exists.');
        const [columns] = await connection.query("DESCRIBE messages");
        console.log('Columns:', columns);
    }

    await connection.end();
}

check().catch(console.error);
