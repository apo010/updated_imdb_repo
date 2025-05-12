import { FastifyPluginOptions } from "fastify";
import { Result, SuccessResult } from "../objects/result";
import { Filmler } from "../entities/filmler";
import { DBConnection } from "../config";
import cors from "@fastify/cors";

const filmler = () => async (app: FastifyPluginOptions) => {
    // CORS'u etkinleştir
    app.register(cors, {
        origin: "*", // Tüm origin'lere izin verir. Güvenlik için bunu sınırlandırabilirsiniz.
        methods: ["GET", "POST", "PATCH", "DELETE"], // İzin verilen HTTP yöntemleri
    });

    app.post("/", async (request, reply): Promise<Result<any>> => {
        const { adi, cikisTarihi, ozetBilgi, tanitimUrl, sonTarih, imdbPuani, durumu, kategoriId, altKategoriId } = request.body;
        const movieRepository = await DBConnection.getRepository(Filmler);

        const existingMovie = await movieRepository.findOneBy({ adi: adi });

        if (existingMovie) {
            throw new Error("Bu film zaten mevcut");
        }

        const newMovie = new Filmler();
        newMovie.adi = adi;
        newMovie.cikisTarihi = new Date(cikisTarihi);
        newMovie.ozetBilgi = ozetBilgi;
        newMovie.tanitimUrl = tanitimUrl;
        newMovie.sonTarih = new Date(sonTarih);
        newMovie.imdbPuani = imdbPuani;
        newMovie.durumu = durumu;
        newMovie.kategoriId = kategoriId;
        newMovie.altKategoriId = altKategoriId;

        await movieRepository.save(newMovie);
        return new SuccessResult(newMovie);
    });

    app.patch("/filmGuncelle/:id", async (request, reply): Promise<Result<any>> => {
        const { id } = request.params;
        const updateData = request.body;
        const movieRepository = DBConnection.getRepository(Filmler);
        const existingMovies = await movieRepository.findOne({ where: { id } });
        if (!existingMovies) {
            throw new Error("Dizi Bulunamadi")
        }
        Object.assign(existingMovies, updateData);

        await movieRepository.save(existingMovies);

        return new SuccessResult(existingMovies, "Film Durumu Güncellendi");
    });

    app.delete("/filmSil/:id", async (request, reply) => {
        const { id } = request.params;

        const movieRepository = DBConnection.getRepository(Filmler);
        const existingMovie = await movieRepository.findOne({ where: { id } });

        if (!existingMovie) {
            return reply.status(404).send({ message: "Film bulunamadi" });
        }
        movieRepository.softRemove(existingMovie)

        reply.send({ message: "Film Silindi", movie: existingMovie });
    });

    app.patch("/BegeniGuncelle/:id/begenme", async (request, reply) => {
        const { id } = request.params;
        const movieRepository = DBConnection.getRepository(Filmler);
        const existingMovie = await movieRepository.findOne({ where: { id } });

        if (!existingMovie) {
            return reply.status(404).send({ message: "Film Bulunamadi" });
        }

        existingMovie.begenmeSayisi++;
        await movieRepository.save(existingMovie);

        reply.send({ message: "Film Begenildi", movie: existingMovie });
    })

    app.patch("/BegeniGuncelle/:id/begenmeme", async (request, reply) => {
        const { id } = request.params;
        const movieRepository = DBConnection.getRepository(Filmler);
        const existingMovie = await movieRepository.findOne({ where: { id } });

        if (!existingMovie) {
            return reply.status(404).send({ message: "Film Bulunamadi" });
        }

        existingMovie.begenmemeSayisi++;
        await movieRepository.save(existingMovie);

        reply.send({ message: "Film Begenilmedi", movie: existingMovie });
    })
    app.get("/", async (request, reply) => {
        const movieRepository = DBConnection.getRepository(Filmler);
        const existingMovies = await movieRepository.find({
            relations: ["kategori"],
            order: { id: "ASC" }
        });

        if (!existingMovies) {
            throw new Error("film bulunamadi")
        }

        return new SuccessResult(existingMovies, "basarili")
    })

}
export default filmler;

