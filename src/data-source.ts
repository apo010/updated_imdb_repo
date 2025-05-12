import { DataSource } from "typeorm";
import dotenv from "dotenv";
import { Kullanicilar } from "./entities/kullanicilar";
import { Kategori } from "./entities/kategoriler";
import { KategoriAlt } from "./entities/altKategoriler";
import { Filmler } from "./entities/filmler";

dotenv.config();

export const AppDataSource = new DataSource({
    type: "postgres",
    host: process.env.DB_HOST || "localhost",
    port: Number(process.env.DB_PORT),
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    logging: false,
    entities: [Kullanicilar,Filmler,Kategori,KategoriAlt]
});
