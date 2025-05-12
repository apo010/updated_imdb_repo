import { DataSource } from "typeorm";
import { SnakeNamingStrategy } from "typeorm-naming-strategies/snake-naming.strategy";
import { Filmler } from "./entities/filmler";
import { Kategori } from "./entities/kategoriler";
import { KategoriAlt } from "./entities/altKategoriler";
import { Diziler } from "./entities/diziler";
import { Kullanicilar } from "./entities/kullanicilar";
import { DiziBolumleri } from "./entities/diziBolum";
import { DiziSezonlari } from "./entities/diziSezon";
import { Celebs } from "./entities/celebs";

require("dotenv").config();

const DBConnection = new DataSource({
    type: "postgres",
    host: process.env.PGHOST,
    port: 5432,
    username: process.env.PGUSER,
    password: process.env.PGPASSWORD,
    database: process.env.PGDATABASE,
    logging: true,
    entities: [Filmler, Kategori, KategoriAlt, Diziler, Kullanicilar, DiziBolumleri, DiziSezonlari, Celebs],
    namingStrategy: new SnakeNamingStrategy()
})

export {
    DBConnection,
};
