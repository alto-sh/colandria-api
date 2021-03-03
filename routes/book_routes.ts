import express from "express";
import pool from "../helpers/db";

const routes = (app: express.Application) => {

    app.post("/book/create", (req, res) => {
        const { name, author, img_url, goodreads_link, amazon_link } = req.body;
        const query: string = `INSERT INTO BOOK (NAME, AUTHOR, IMG_URL, GOODREADS_LINK, AMAZON_LINK) VALUES ("${name}", "${author}", "${img_url}", "${goodreads_link}", "${amazon_link}");`;

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

    app.get("/book/get/:limit", (req, res) => {
        const query: string = `SELECT * FROM BOOK ORDER BY RAND() LIMIT ${req.params.limit}`;

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

}

export default routes;