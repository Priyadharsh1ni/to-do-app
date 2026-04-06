import mysql from 'mysql2/promise';

const dbConfig = {
  host: 'localhost',
  user: 'root',
  password: 'Password',
  database: 'todo',
  port: 3306,
};  


const db = mysql.createPool(dbConfig);

if(db) {
  console.log("Database connection pool created successfully");
} else {
  console.error("Failed to create database connection pool");
}

export default db;