import Router from "express";
import { check } from "express-validator";
import {
  usuarioGet,
  usuarioPut,
  usuarioPost,
  usuarioDelete,
} from "../controllers/userController.js";
import {
  esRoleValido,
  correoValido,
  idValido,
} from "../helpers/db-validators.js";
import validarCampos from "../middlewares/validar-campos.js";

const router = Router();
router.get("/", usuarioGet);

router.put(
  "/:id",
  check("id", "No es un id Valido").isMongoId(),
  check("id").custom(idValido),
  check("rol").custom(esRoleValido),
  validarCampos,

  usuarioPut
);

router.post(
  "/",
  //se hacen las validaciones con EXPRESS VALIDATOR
  check("nombre", "El Nombre es Obligatorio").not().isEmpty(),
  check("password", "El Password es Obligatorio y mayor a 6 caracteres")
    .not()
    .isEmpty()
    .isLength({ min: 6 }),
  check("correo", "El correo nmo es valido").isEmail(),
  check("correo").custom(correoValido),
  /*  check("rol", "No es un Rol Valido").isIn(["ADMIN_ROLE", "USER_ROLE"]), */
  //VALIDAMOS ROLES PREVIAMNEETNTE REGISTRADOS EN BASE DE DATOS LO BYUSCAMOS Y SI NO EXISTE ENTONCES ENVIAMOS ERROR
  check("rol").custom(esRoleValido),

  //pintar ERRORES MEDIANTE EL EXPRESS VALIADATOR desde el middleware
  validarCampos,
  usuarioPost
);

router.delete(
  "/:id",
  check("id", "No es un id Valido").isMongoId(),
  check("id").custom(idValido),
  validarCampos,
  usuarioDelete
);
export default router;
