import { FastifyInstance } from "fastify";
import { DBConnection } from "../config";
import { Celebs } from "../entities/celebs";
import { SuccessResult, Result } from "../objects/result";
import cors from "@fastify/cors";

const celebs = (app: FastifyInstance) => {
    app.register(cors, {
        origin: "*", // Tüm origin'lere izin verir. Güvenlik için bunu sınırlandırabilirsiniz.
        methods: ["GET", "POST", "PATCH", "DELETE"], // İzin verilen HTTP yöntemleri
    });
    app.get("/", async (request, reply) => {
        try {
            console.log("Celebs GET isteği başladı...");
            const celebsRepository = DBConnection.getRepository(Celebs);
            console.log("Veritabanı bağlantısı başarılı.");

            const celebs = await celebsRepository.find({
                order: { id: "ASC" },
            });
            console.log("Veriler çekildi:", celebs);

            if (!celebs || celebs.length === 0) {
                console.log("Hiçbir ünlü bulunamadı.");
                return reply.status(404).send(new Result<any>(false, null, "", "Hiçbir ünlü bulunamadı."));
            }

            return reply.send(new SuccessResult(celebs, "Ünlüler başarıyla getirildi."));
        } catch (error) {
            console.error("Celebs GET isteği sırasında hata oluştu:", error);
            const errorMessage = error instanceof Error ? error.message : "Bilinmeyen bir hata oluştu";
            return reply.status(500).send(new Result<any>(false, null, "", `Bir hata oluştu: ${errorMessage}`));
        }
    });
};

export default celebs;