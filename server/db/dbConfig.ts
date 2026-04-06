import mysql from 'mysql2/promise';

const dbConfig = {
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || 'Password',
  database: process.env.DB_NAME || 'todo',
  port: process.env.DB_PORT || 3306,
};  


const db = mysql.createPool(dbConfig);

if(db) {
  console.log("Database connection pool created successfully");
} else {
  console.error("Failed to create database connection pool");
}

export default db;