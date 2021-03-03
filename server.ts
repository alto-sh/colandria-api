import express from "express";
import cors from "cors";
import bodyParser from "body-parser";

const app: express.Application = express()   // Initialize Express
app.use(cors())         // Attach cors

app.use(bodyParser.json());

// Initial cors config.
app.options("*", cors({
    origin: "*"
}));

const PORT = process.env.PORT || 3000

import routes from "./routes/index";
routes(app)

app.listen(PORT, () => {
    console.log(`We are live on port ${PORT}`);
});