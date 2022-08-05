import Router from "express";
import {
  usuarioGet,
  usuarioPut,
  usuarioPost,
  usuarioDelete,
} from "../controllers/userController.js";

const router = Router();
router.get("/", usuarioGet);

router.put("/:id", usuarioPut);

router.post("/", usuarioPost);

router.delete("/", usuarioDelete);
export default router;
