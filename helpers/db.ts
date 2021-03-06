import mysql from "mysql";

// Configure Connection
const pool = mysql.createPool({
    connectionLimit: 10,
    host: "localhost",
    user: "root",
    password: "root",
    database: "hibernate_db"
});

const create_book_table_query = `
CREATE TABLE IF NOT EXISTS BOOK (
    ID INT(11) NOT NULL AUTO_INCREMENT,
    NAME VARCHAR(256) NOT NULL, 
    AUTHOR VARCHAR(256),
    IMG_URL VARCHAR(1024), 
    GOODREADS_LINK VARCHAR(1024), 
    AMAZON_LINK VARCHAR(1024),
    PRIMARY KEY (ID)
)
`;

const create_journal_entry_table_query = `
CREATE TABLE IF NOT EXISTS JOURNAL_ENTRY (
    ID INT(11) NOT NULL AUTO_INCREMENT,
    USER_ID VARCHAR(256) NOT NULL,
    BOOK_ID INT NOT NULL,
    PRIMARY KEY (ID),
    FOREIGN KEY (BOOK_ID) REFERENCES BOOK(ID)
)
`;

const create_note_table_query = `
CREATE TABLE IF NOT EXISTS NOTE (
    ID INT(11) NOT NULL AUTO_INCREMENT,
    BOOK_ID INT NOT NULL,
    USER_ID VARCHAR(256) NOT NULL,
    HEADER VARCHAR(256) NOT NULL,
    BODY LONGTEXT NOT NULL,
    PRIMARY KEY (ID),
    FOREIGN KEY (BOOK_ID) REFERENCES BOOK(ID)
)
`;

// Create BOOK Table
pool.query(create_book_table_query, (err, results, fields) => {
    if(err) console.log(err);
});

// Create Journal Entry Table
pool.query(create_journal_entry_table_query, (err, results, fields) => {
    if(err) console.log(err);
});

// Create Note Table
pool.query(create_note_table_query, (err, results, fields) => {
    if(err) console.log(err);
});

export default pool;