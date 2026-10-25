import { Router } from "express";
import { UserFactory } from "./factory.js";

const controller = UserFactory();

const routes = Router();

routes.post("/", controller.create);
routes.get("/:id", controller.findById);
routes.patch("/:id", controller.update);
routes.patch("/password/:id", controller.updatePass);

export default routes;
