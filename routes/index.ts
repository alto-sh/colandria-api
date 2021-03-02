import express from "express";

/* Import Routes */
import hello_world_routes from "./hello_world";

const defaultExports = (app: express.Application) => {
    /* Route Function Calls */
    hello_world_routes(app);
};

export default defaultExports;