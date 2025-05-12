import { FastifyInstance } from "fastify";
import { DBConnection } from "../config";
import { Kullanicilar } from "../entities/kullanicilar";
import { SuccessResult, Result } from "../objects/result";
import cors from "@fastify/cors";

const signup = (app: FastifyInstance) => {
    // CORS'u etkinleştir
    app.register(cors, {
        origin: "*", // Tüm origin'lere izin verir. Güvenlik için bunu sınırlandırabilirsiniz.
        methods: ["GET", "POST", "PATCH", "DELETE"], // İzin verilen HTTP yöntemleri
    });
    app.post("/kayit", (request, reply) => {
        try {
            const { username, email, password } = request.body as {
                username: string;
                email: string;
                password: string;
            };

            if (!username || !email || !password) {
                reply.send(
                    new Result<any>(false, null, "", "Eksik bilgi gönderildi.")
                );
                return;
            }

            const user = new Kullanicilar();
            user.username = username;
            user.email = email;
            user.password = password;

            DBConnection.manager
                .save(user)
                .then(() => {
                    reply.send(
                        new SuccessResult({
                            message: "Kullanıcı başarıyla oluşturuldu.",
                            user: { username, email },
                        })
                    );
                })
                .catch((error) => {
                    console.error("Kayıt sırasında hata oluştu:", error);

                    reply.status(500).send({
                        message: "Kayıt sırasında bir hata oluştu.",
                        error: error.message,
                    });
                });
        } catch (error) {
            console.error("Kayıt sırasında hata oluştu:", error);

            reply.status(500).send({
                message: "Kayıt sırasında bir hata oluştu.",
                error: (error as Error).message,
            });
        }
    });
};

export default signup;