import express from 'express';
import UserController from '../controllers/user.controller';
//import authMiddleware from "../middleware/authMiddleware";

const routerUsers = express.Router();

routerUsers.post('/registration', UserController.registrate);
routerUsers.post('/login', UserController.login);
// routerUsers.post("/logout", UserController.logout);
// routerUsers.get("/activate/:link", UserController.activate);
// routerUsers.get("/all", authMiddleware, UserController.getAllUsers);
// routerUsers.get("/refresh", UserController.refresh);
// routerUsers.put("/:id", authMiddleware, UserController.update);
// routerUsers.delete("/:id", authMiddleware, UserController.delete);
// routerUsers.get("/:id/favorites", authMiddleware, UserController.getFavorites);
// routerUsers.put(":id/favorites", authMiddleware, UserController.updateFavorites);

export default routerUsers;
