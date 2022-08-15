import express from "express";
import cors from "cors";
import router from "../routes/user.js";
import dbConection from "../database/config.js";
class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT;
    this.usuariosPath = "/api/usuarios";
    //conectar a base de datos
    this.conectarDB();
    //middlewares
    this.middlewares();
    //routes of my aplication
    this.routes();
  }
  //declaramoes el metopdo para la coneccion y lo pasamos al contructor
  async conectarDB() {
    await dbConection();
  }

  middlewares() {
    //cors
    this.app.use(cors());
    //Parseo y lectura del body
    this.app.use(express.json());
    //directorio Publico
    this.app.use(express.static("public"));
  }

  routes() {
    this.app.use(this.usuariosPath, router);
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log("server corriendo en ", this.port);
    });
  }
}

export default Server;
