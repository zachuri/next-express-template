import { todoController } from "@/controllers/todo.controller";
import express from "express";

const router = express.Router();

router.get("/", todoController.get);

router.post("/", todoController.create);

// router.put("/:id", () => {
// 	todoController.update;
// });

// router.delete("/:id", () => {
// 	todoController.remove;
// });

export default router;
