import { FastifyPluginOptions } from "fastify";
import { DBConnection } from "../config";
import { Kullanicilar } from "../entities/kullanicilar";
import { SuccessResult, Result } from "../objects/result";

import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import cors from "@fastify/cors"; // CORS eklendi

dotenv.config();

const signin = () => async (app: FastifyPluginOptions) => {
    // CORS'u etkinleştir
    app.register(cors, {
        origin: "*", // Tüm origin'lere izin verir. Güvenlik için bunu sınırlandırabilirsiniz.
        methods: ["GET", "POST", "PATCH", "DELETE"], // İzin verilen HTTP yöntemleri
    });

    app.post("/giris", async (request, reply): Promise<Result<any>> => {
        try {
            const { username, password } = request.body;
            const userRepository = await DBConnection.getRepository(Kullanicilar);

            const user = await userRepository.findOneBy({ username, password });
            if (!user) {
                return reply.status(401).send(new Result<any>(false, null, "", "Kullanıcı adı veya şifre hatalı"));
            }

            const token = jwt.sign({ username: user.username }, process.env.SECRET_KEY, { expiresIn: '1h' });
            return new SuccessResult({ user, token }, "Giriş Yapıldı");

        } catch (error) {
            console.error("Giriş sırasında hata oluştu:", error);
            return reply.status(500).send(new Result<any>(false, null, "", "Giriş Yapılamadı"));
        }
    });
};

export default signin;