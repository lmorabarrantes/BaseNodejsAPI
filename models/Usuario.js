import mongoose from "mongoose";
const { Schema, model } = mongoose;

const UsuarioSchema = Schema({
  nombre: {
    type: String,
    require: [true, "El nombre es obligastorio"],
  },
  correo: {
    type: String,
    require: [true, "El email es obligastorio"],
    unique: true,
  },
  password: {
    type: String,
    require: [true, "El Password es obligastorio"],
  },
  img: {
    type: String,
  },
  rol: {
    type: String,
    require: [true, "El Password es obligastorio"],
    enum: ["ADMIN_ROLE", "USER_ROLE"],
  },
  estado: {
    type: Boolean,
    default: true,
  },
  google: {
    type: Boolean,
    default: false,
  },
});
UsuarioSchema.methods.toJSON = function () {
  const { __v, password, ...usuario } = this.toObject();
  return usuario;
};
export default model("Usuario", UsuarioSchema);
