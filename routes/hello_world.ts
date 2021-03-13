import express from "express";

const routes = (app: express.Application) => {

    app.get("/hello", (req, res) => {
        res.json("Hello, World!");
    })

}

export default routes;