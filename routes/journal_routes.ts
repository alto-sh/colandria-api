import { rejects } from "assert";
import express from "express";
import pool from "../helpers/db";

const routes = (app: express.Application) => {

    app.post("/journal/entry/create", (req, res) => {
        const { user_id, book_id } = req.body;
        const query: string = `INSERT INTO JOURNAL_ENTRY (USER_ID, BOOK_ID) VALUES ("${user_id}", ${book_id});`;

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
        const query: string = `SELECT * FROM JOURNAL_ENTRY WHERE USER_ID="${req.params.id}"`;

        pool.query(query, async (err, results, fields) => {
            if (err) {
                console.log(err.message);
                res.json({ 
                    success: false,
                    results: []
                });
            } else {
                const books: any[] = [];

                for (const r of results) {
                    const book = await (new Promise((res, rej) => {
                                    pool.query(`SELECT * FROM BOOK WHERE ID=${r.BOOK_ID}`, (err, results, fields) => {
                                        if (err) rej(new Error("Failed"));
                                        else res(results[0]);
                                    });
                                }));
                    books.push(book);
                }

                res.json({
                    success: true,
                    results: books
                });
            }
        })
    });

    app.get("/journal/entry/get/:bookid/:userid", (req, res) => {
        const query: string = `SELECT * FROM JOURNAL_ENTRY WHERE USER_ID="${req.params.userid}" AND BOOK_ID="${req.params.bookid}"`;

        pool.query(query, (err, results, fields) => {
            if (err) {
                console.log(err);
                res.json({ success: false });
            } else {
                const query: string = (
                    results.length === 0 ? 
                    `INSERT INTO JOURNAL_ENTRY (USER_ID, BOOK_ID) VALUES ("${req.params.userid}", ${req.params.bookid})` 
                    : `DELETE FROM JOURNAL_ENTRY WHERE USER_ID="${req.params.userid}" AND BOOK_ID="${req.params.bookid}"`
                );
                pool.query(query, (err, results, fields) => { 
                    if(err) console.log(err);
                    else console.log(results);
                });
                res.json({ success: true });
            }
        });
    });

    app.get("/journal/entry/get/val/:bookid/:userid", (req, res) => {
        const query: string = `SELECT * FROM JOURNAL_ENTRY WHERE USER_ID="${req.params.userid}" AND BOOK_ID="${req.params.bookid}"`;

        pool.query(query, (err, results, fields) => {
            if (err || results.length === 0) {
                res.json({ success: false });
            } else {
                res.json({ success: true });
            }
        })
    })

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