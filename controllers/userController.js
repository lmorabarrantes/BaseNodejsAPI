import Usuario from "../models/Usuario.js";
import bcrypt from "bcryptjs";

const usuarioGet = async (req, res = response) => {
  //obtener datoa de los artgumentos enviados
  const { limits = 5, desde = 0 } = req.query;
  //OBTENEMOS PARAMETROS DENTRO DE LA BASE DE DATOS MEDIANTE EL MODELO Y EL FIND
  //FILTRAMOS MEDIANTE EL ESTADO CON ESTO SAVBEMOS SI FUE EL;IMINADO DE BASE DE DATOS O NO
  //AQUI SE BUSCA EL TOTAL DE REGISTRO O DE USUARIOS MEDIANTE EL COUNTDOCUMWENTS EN LA BASE DE DATOS DE USUARIO
  //Y SE FILTRA MEDIANTE En ESTADO TRUE SOLO APARECEN LOS QUE ESTAN ACTIVOS
  //MEDIANTE EL RPOIMISE ALL EJECUTAMOS 2 PROMISES AL MISMO TIEWPO
  const [total, usuarios] = await Promise.all([
    Usuario.countDocuments({ estado: true }),
    Usuario.find({ estado: true }).skip(Number(desde)).limit(Number(limits)),
  ]);
  res.json({
    total,
    usuarios,
    //LLAMAMOS AL METODO Y LO GUARDAMOS EN UNA ARREGLO
    /* total,
    usuarios, */
  });
};

const usuarioPut = async (req, res = response) => {
  const { id } = req.params;
  //obtengo datos enviados mediante el id y los actualizo
  const { _id, password, google, correo, ...resto } = req.body;
  // Todo VAlidar Contra base de datos
  if (password) {
    //encriptar la contrasena
    const salt = bcrypt.genSaltSync(10);
    resto.password = bcrypt.hashSync(password, salt);
  }
  const usuario = await Usuario.findByIdAndUpdate(id, resto);

  res.json({
    usuario,
  });
};

const usuarioPost = async (req, res) => {
  //obtener datos  enviados desde BODY
  const { nombre, correo, password, rol } = req.body;
  const usuario = new Usuario({ nombre, correo, password, rol });

  //verificar si el correo existe
  /*   const existeEmail = await Usuario.findOne({ correo });
  if (existeEmail) {
    return res.status(400).json({
      msg: "El Correo ya Existe",
    });
  } */
  //encriptar Password
  const salt = bcrypt.genSaltSync(10);
  usuario.password = bcrypt.hashSync(password, salt);
  //Guardar en base de datos
  await usuario.save();

  res.json({
    usuario,
  });
};

const usuarioDelete = async (req, res = response) => {
  const { id } = req.params;
  //borrar fisicamente
  // NO SE DEBERA BORRAR NUNCA ASI\
  /*  const usuario = await Usuario.findByIdAndDefinlete(id); */

  //FORMA CORRECTA
  //me busca con el id Y MEDIANTE EL SEGUNDO PARAMETRO ME DICE QUE ESTADO SERA FALSE DE ESA MANERA NO SE MOSTRARA EN BASE DE DATOS
  const usuario = await Usuario.findByIdAndUpdate(id, { estado: false });
  res.json({
    usuario,
  });
};

export { usuarioGet, usuarioPut, usuarioPost, usuarioDelete };
