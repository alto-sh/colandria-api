import express from "express";
import pool from "../helpers/db";

const routes = (app: express.Application) => {

    app.post("/note/create", (req, res) => {
        const { header, body, entry_id } = req.body;
        const query: string = `INSERT INTO NOTE (HEADER, BODY, ENTRY_ID) VALUES ("${header}", "${body}", "${entry_id}");`;

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

    app.get("/note/get/:id", (req, res) => {
        const query: string = `SELECT * FROM NOTE WHERE ID=${req.params.id}`;

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