import { FastifyPluginOptions } from "fastify";
//import required from "../decorators/argumentRequired";
import { Result, SuccessResult } from "../objects/result";
import { Kullanicilar } from "../entities/kullanicilar";
import { AppDataSource } from "../data-source";

const auth = () => async (app: FastifyPluginOptions) => {

    app.get("/", async (req: any): Promise<Result<any>> => {

        return new SuccessResult("deneme");
    });

    app.post("/kayit", async (request, reply) => {
        try {
            console.log("das")
            const { username, email, password } = request.body;
            const user = new Kullanicilar();
            user.email = email;
            user.password = password;
            user.username = username;
            await AppDataSource.manager.save(user);

            console.log({ message: "kullanici oluşturuldu", user });
            reply.status(210).send({ message: "kullanici olusuturuldu", user });
        } catch (error) {
            console.error("hata:", error);
            reply.status(500).send({ message: "hata oldu" });
        }
    });

    app.post("/giris", async (request, reply) => {
        const { username, password } = request.body;
        const userRepository = AppDataSource.getRepository(Kullanicilar);

        const user = await userRepository.findOneBy({ username, password });

        if (!user) {
            reply.status(500).send({ message: "kullanici bulunamadi" });
        }
        reply.status(201).send({ message: "kullanici giris yapti", user })
    });

}
export default auth;

