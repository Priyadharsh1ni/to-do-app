import mysql from 'mysql2/promise';

const pool = mysql.createPool({
  host: process.env.DB_HOST as string,
  user: process.env.DB_USER as string,
  password: process.env.DB_PASSWORD as string,
  database: process.env.DB_NAME as string,
  port: parseInt(process.env.DB_PORT || '3306', 10),
  url: process.env.DB_URL as string

});

export default pool;
