const express = require("express");
import * as materialController from "../controllers/materialControllers";
export const router = express.Router();

router.get("/", materialController.listMaterials);
router.post("/", materialController.registerMaterial);
router.put("/:id", materialController.updateMaterial);
router.delete("/:id", materialController.deleteMaterial);
