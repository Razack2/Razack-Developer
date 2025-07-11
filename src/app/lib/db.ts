import mysql from 'mysql2/promise';

const pool = mysql.createPool({
  const dbUrl = process.env.DATABASE_URL;
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE,
});

export default pool;
