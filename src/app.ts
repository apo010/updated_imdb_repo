import fastify from "fastify";
import { DBConnection } from "./config";
import auth from "./routes/auth";
import filmler from "./routes/filmler";
import diziler from "./routes/diziler";
import signin from "./routes/signin";
import signup from "./routes/signup";
import celebsRoutes from "./routes/celebs";

require("dotenv").config();

const server = fastify({
    logger: (process.env.NODE_ENV !== "development"),
    bodyLimit: 4194304
});

DBConnection.initialize().catch((err) => { console.error("Error:  Veritabanı Bağlantısı Sağlanamadı !", err) });

server.register(auth(), { prefix: "/auth" });
server.register(celebsRoutes, { prefix: "/celebs" });
server.register(filmler(), { prefix: "/filmler" });
server.register(diziler(), { prefix: "/diziler" });
server.register(signin(), { prefix: "/signin" });
server.register(signup, { prefix: "/signup" });

export default server;


