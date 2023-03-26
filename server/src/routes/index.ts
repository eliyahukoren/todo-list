import { Router } from "express";
import {
  create, read, remove, update
} from "../controllers/todo";

const router: Router = Router();

router.get("/todos", read);

router.post("/add-todo", create);

router.put("/edit-todo/:id", update);

router.delete("/delete-todo/:id", remove);

export default router;
