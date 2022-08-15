import Role from "../models/Role.js";
import Usuario from "../models/Usuario.js";
//VALIDAMOS ROLES PREVIAMNEETNTE REGISTRADOS EN BASE DE DATOS LO BYUSCAMOS Y SI NO EXISTE ENTONCES ENVIAMOS ERROR
const esRoleValido = async (rol = "") => {
  const existeRol = await Role.findOne({ rol });
  if (!existeRol) {
    throw new Error(`El rol ${rol} no Existe`);
  }
};
const correoValido = async (correo = "") => {
  const existeCorreo = await Usuario.findOne({ correo });
  if (existeCorreo) {
    throw new Error(`El Email ${correo} ya existe`);
  }
};

const idValido = async (id) => {
  const existeId = await Usuario.findById(id);
  if (!existeId) {
    throw new Error(`El id ${id} no Existe`);
  }
};
export { esRoleValido, correoValido, idValido };
