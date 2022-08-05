import "dotenv/config";
import Server from "./models/server.js";
//traemos toda la informacio n para levantar el server
const server = new Server();
//levantamos el server
server.listen();
