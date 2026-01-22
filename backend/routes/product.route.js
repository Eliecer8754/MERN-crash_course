import express from "express"

import { addProduct, deleteProduct, getProducts, updateProduct } from "../controllers/product.controller.js";
const router = express.Router();

router.get("/", getProducts)
router.post("/", addProduct)
router.delete("/:id", deleteProduct)
router.put("/:id", updateProduct)

export default router;