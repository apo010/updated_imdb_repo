import server from "./app";

const FASTIFY_PORT = Number(process.env.SERVER_PORT) || 3006;

server.listen({ port: FASTIFY_PORT, host: '0.0.0.0' });

console.log(`🚀  Fastify server running on port ${FASTIFY_PORT}`);
