import express from "express";
import pool from "../helpers/db";

const routes = (app: express.Application) => {

    app.post("/journal/entry/create", (req, res) => {
        const { user_id, book_id } = req.body;
        const query: string = `INSERT INTO JOURNAL_ENTRY (USER_ID, BOOK_ID) VALUES ("${user_id}", "${book_id}");`;

        pool.query(query, (err, results, fields) => {
            if (err) {
                console.log(err.message);
                res.json({ success: false });
            } else {
                console.log(results);
                res.json({ success: true });
            }
        });
    });

    app.get("/journal/entry/get/:id", (req, res) => {
        const query: string = `SELECT * FROM JOURNAL_ENTRY WHERE ID=${req.params.id}`;

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

    app.delete("/journal/entry/delete/:id", (req, res) => {
        const query: string = `DELETE FROM JOURNAL_ENTRY WHERE ID=${req.params.id}`;

        pool.query(query, (err, results, fields) => {
            if (err) {
                console.log(err.message);
                res.json({ success: false });
            } else {
                console.log(results);
                res.json({ success: true });
            }
        });
    });

}

export default routes;