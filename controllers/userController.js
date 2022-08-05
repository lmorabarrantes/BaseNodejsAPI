import response from "express";

const usuarioGet = (req, res = response) => {
  const query = req.query;
  res.json({
    msg: "Put API",
    params,
  });
};

const usuarioPut = (req, res = response) => {
  const { id } = req.params;
  console.log(id);
  res.json({
    msg: "Put API",
    id,
  });
};
const usuarioPost = (req, res = response) => {
  //obtener datos  enviados desde BODY
  const { nombre, edad } = req.body;

  res.json({
    msg: "post API",
    nombre,
    edad,
  });
};
const usuarioDelete = (req, res = response) => {
  res.json({
    msg: "delete API",
  });
};

export { usuarioGet, usuarioPut, usuarioPost, usuarioDelete };
