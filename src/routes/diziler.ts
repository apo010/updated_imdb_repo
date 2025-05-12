import { FastifyPluginOptions } from "fastify";
import cors from "@fastify/cors";
import { DBConnection } from "../config";
import { Diziler } from "../entities/diziler";
import { Result, SuccessResult } from "../objects/result";
import { DiziSezonlari } from "../entities/diziSezon";
import { DiziBolumleri } from "../entities/diziBolum";

const diziler = () => async (app: FastifyPluginOptions) => {
    // CORS'u etkinleştir
    app.register(cors, {
        origin: "*", // Tüm origin'lere izin verir. Güvenlik için bunu sınırlandırabilirsiniz.
        methods: ["GET", "POST", "PATCH", "DELETE"], // İzin verilen HTTP yöntemleri
    });
    app.post("/", async (request, reply): Promise<Result<any>> => {
        const { adi, cikisTarihi, ozetBilgi, tanitimUrl, sonTarih, imdbPuani, begenmeSayisi, begenmemeSayisi, kategoriId, altKategoriId, durumu } = request.body;
        const seriesRepository = DBConnection.getRepository(Diziler);
        const newSeries = new Diziler();
        const series = await seriesRepository.findOneBy({ adi });

        if (series) {
            throw new Error("Bu Dizi Zaten Mevcut")
        }

        newSeries.adi = adi;
        newSeries.cikisTarihi = new Date(cikisTarihi);
        newSeries.ozetBilgi = ozetBilgi;
        newSeries.tanitimUrl = tanitimUrl;
        newSeries.sonTarih = new Date(sonTarih);
        newSeries.durumu = durumu;
        newSeries.imdbPuani = imdbPuani;
        newSeries.begenmeSayisi = begenmeSayisi;
        newSeries.begenmemeSayisi = begenmemeSayisi;
        newSeries.kategoriId = kategoriId;
        newSeries.altKategoriId = altKategoriId;
        await seriesRepository.save(newSeries);
        return new SuccessResult(newSeries);
    })
    app.get("/", async (request, reply) => {
        const seriesRepository = DBConnection.getRepository(Diziler);

        try {
            const existingSeries = await seriesRepository.find({
                relations: ["kategori"], // İlişkili kategori bilgilerini getir
                order: { id: "ASC" } // ID'ye göre artan sırada sıralama
            });

            if (!existingSeries || existingSeries.length === 0) {
                return reply.status(404).send({ message: "Dizi bulunamadı" });
            }

            return reply.send(new SuccessResult(existingSeries, "Başarılı"));
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : "Bilinmeyen bir hata oluştu";
            return reply.status(500).send({ message: "Bir hata oluştu", error: errorMessage });
        }
    });

    app.patch("/diziGuncelle/:id", async (request, reply): Promise<Result<any>> => {
        const { id } = request.params;
        const updateData = request.body;
        const seriesRepository = DBConnection.getRepository(Diziler);
        const existingSeries = await seriesRepository.findOne({ where: { id } });
        if (!existingSeries) {
            throw new Error("Dizi Bulunamadi")
        }
        Object.assign(existingSeries, updateData);

        await seriesRepository.save(existingSeries);

        return new SuccessResult(existingSeries, "Dizi Durumu Güncellendi");
    });

    app.post("/sezonEkle/:id", async (request, reply): Promise<Result<any>> => {
        const { id } = request.params;
        const { bolumSayisi, cikisTarihi, sezonAdi } = request.body;
        const seriesRepository = DBConnection.getRepository(Diziler);
        const seasonRepository = DBConnection.getRepository(DiziSezonlari);

        const existingSeries = await seriesRepository.findOne({ where: { id } });
        if (!existingSeries) {
            throw new Error("Dizi Bulunamadi");
        }
        const newSeason = new DiziSezonlari();
        newSeason.dizi = existingSeries;
        newSeason.sezonAdi = sezonAdi;
        newSeason.bolumSayisi = bolumSayisi;
        newSeason.cikisTarihi = new Date(cikisTarihi);
        await seasonRepository.save(newSeason);

        return new SuccessResult(newSeason, "Sezon Eklendi");
    });

    app.post("/bolumEkle/:sezonId", async (request, reply): Promise<Result<any>> => {
        const { bolumler } = request.body;
        const { sezonId } = request.params;
        const seasonRepository = DBConnection.getRepository(DiziSezonlari);
        const episodesRepository = DBConnection.getRepository(DiziBolumleri);

        const existingSeason = await seasonRepository.findOne({ where: { id: sezonId } });
        if (!existingSeason) {
            throw new Error("Sezon Bulunamadi");
        }

        const newEpisodes = bolumler.map((bolum) => {
            const newEpisode = new DiziBolumleri();
            newEpisode.sezonId = existingSeason.id;
            newEpisode.bolumAdi = bolum.bolumAdi;
            newEpisode.cikisTarihi = new Date(bolum.cikisTarihi);
            return newEpisode;
        });

        await episodesRepository.save(newEpisodes);
        return new SuccessResult(newEpisodes, "Bölümler Eklendi");
    });

    app.delete("/diziSil/:id", async (request, reply): Promise<Result<any>> => {
        const { id } = request.params;

        const seriesRepository = DBConnection.getRepository(Diziler);
        const existingSeries = await seriesRepository.findOne({ where: { id } });

        if (!existingSeries) {
            throw new Error("Dizi Bulunamadi")
        }
        seriesRepository.softRemove(existingSeries)

        return new SuccessResult("Dizi Silindi")
    });

    app.patch("/BegeniGuncelle/:id/begenme", async (request, reply) => {
        const { id } = request.params;
        const seriesRepository = DBConnection.getRepository(Diziler);
        const existingSeries = await seriesRepository.findOne({ where: { id } });

        if (!existingSeries) {
            throw new Error("Dizi Bulunamadi")
        }

        existingSeries.begenmeSayisi++;
        await seriesRepository.save(existingSeries);

        return new SuccessResult("Dizi Beğenildi")
    })

    app.patch("/BegeniGuncelle/:id/begenmeme", async (request, reply) => {
        const { id } = request.params;
        const seriesRepository = DBConnection.getRepository(Diziler);
        const existingSeries = await seriesRepository.findOne({ where: { id } });

        if (!existingSeries) {
            throw new Error("Dizi Bulunamadi")
        }

        existingSeries.begenmemeSayisi++;
        await seriesRepository.save(existingSeries);

        return new SuccessResult("Dizi Beğenilmedi")
    })
}
export default diziler;

