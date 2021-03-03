import express from "express";

/* Import Routes */
import book_routes from "./book_routes";
import note_routes from "./note_routes";
import journal_routes from "./journal_routes";

const defaultExports = (app: express.Application) => {
    /* Route Function Calls */
    book_routes(app);
    note_routes(app);
    journal_routes(app);
};

export default defaultExports;