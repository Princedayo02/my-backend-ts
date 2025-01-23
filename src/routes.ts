import express, { Request, Response, Express } from "express";
import { getUsers, addUser, deleteUser, getUserbyId } from "./controller/userController";
import { addBook, deleteBook, getBook, getBooks, putBooks } from "./controller/bookController";

const router = express.Router();

router.get("/bookss", getBooks);
router.post("/book", addBook);
router.get("/thebook", getBook);
router.put("/book/:id", putBooks);
router.delete("/deletebook", deleteBook);

router.get("/users", getUsers);
router.post("/add-user", addUser);
router.delete("/delete", deleteUser);
router.get("/user", getUserbyId);

export default router;
