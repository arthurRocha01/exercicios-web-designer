import express from "express";
import * as materialController from "../controllers/materialControllers.js";

const router = express.Router();

router
  .get("/", materialController.listMaterials)
  .post("/", materialController.registerMaterial)
  .put("/:id", materialController.updateMaterial)
  .delete("/:id", materialController.deleteMaterial);

export default router;
