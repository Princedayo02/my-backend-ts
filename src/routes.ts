import express, { Request, Response, Express } from "express";
import { getUsers, addUser, deleteUser, getUserbyId } from "./controller/userController";
import { addAuthor, addBook, addGenre, getAuthor, getBook, getBooks, getGenre } from "./controller/bookController";

const router = express.Router();

router.get("/book/:id", getBook);
router.get("/book", getBooks);
router.post("/book", addBook);
// router.put("/book/:id", putBooks);
// router.delete("/deletebook", deleteBook);

router.get("/users", getUsers);
router.post("/add-user", addUser);
router.delete("/delete", deleteUser);
router.get("/user", getUserbyId);

router.post("/genre", addGenre);
router.get("/genre", getGenre);

router.post("/author", addAuthor);
router.get("/author", getAuthor);

export default router;
