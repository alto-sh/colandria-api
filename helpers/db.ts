import mysql from "mysql";

// Configure Connection
const pool = mysql.createPool({
    connectionLimit: 10,
    host: "localhost",
    user: "root",
    password: "root",
    database: "colandria_db"
});

export default pool;