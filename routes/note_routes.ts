import express from "express";
import pool from "../helpers/db";

const routes = (app: express.Application) => {

    app.post("/note/create", (req, res) => {
        const { user_id, header, body, book_id } = req.body;
        const query: string = `INSERT INTO NOTE (USER_ID, HEADER, BODY, BOOK_ID) VALUES ("${user_id}", "${header}", "${body}", "${book_id}");`;

        pool.query(query, (err, results, fields) => {
            if (err) {
                console.log(err.message);
                res.json({ success: false });
            } else {
                console.log(results);
                res.json({ 
                    success: true
                });
            }
        });
    });

    app.get("/note/get/:userid", (req, res) => {
        const query: string = `SELECT * FROM NOTE WHERE USER_ID="${req.params.userid}"`;

        pool.query(query, (err, results, fields) => {
            if (err) {
                console.log(err.message);
                res.json({ success: false });
            } else {
                console.log(results);
                res.json({
                    success: true,
                    results: results
                });
            }
        })
    });

    app.put("/note/update", (req, res) => {
        const { id, header, body, entry_id } = req.body;

        const query: string = `UPDATE NOTE SET HEADER="${header}", BODY="${body}", ENTRY_ID="${entry_id}" WHERE ID=${id}`;

        pool.query(query, (err, results, fields) => {
            if (err) {
                console.log(err.message);
                res.json({ success: false });
            } else {
                console.log(results);
                res.json({
                    success: true,
                    results: results
                });
            }
        });
    });

}

export default routes;