import mongoose from "mongoose";
const { Schema, model } = mongoose;

const RoleSchema = Schema({
  rol: {
    type: String,
    require: [true, " El ROL es obligatorio"],
  },
});

export default model("Role", RoleSchema);
