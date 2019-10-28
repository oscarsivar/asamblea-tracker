require("dotenv").config();

const { createServer } = require("http");
const next = require("next");
const { connectDatabase } = require("./models");

const PORT = process.env.PORT || 3000;
const dev = process.env.NODE_ENV !== "production";

connectDatabase()
    .then(conn => {
        const app = next({ dev });
        const handle = app.getRequestHandler();

        app.prepare().then(() => {
            createServer((req, res) => {
                handle(req, res);
            }).listen(PORT, err => {
                if (err) throw err;
                console.log(`[ app ] Ready on http://localhost:${PORT}`);
            });
        });
    })
    .catch(err => {
        console.error(err);
        process.exit(1);
    });
