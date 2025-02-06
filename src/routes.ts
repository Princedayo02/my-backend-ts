import express, { Request, Response, Express } from "express";
import { getUsers, addUser, deleteUser, getUserbyId } from "./controller/userController";
import {
	addAuthor,
	addBook,
	addGenre,
	deleteAuthor,
	deleteBook,
	editAuthor,
	editGenre,
	getAuthor,
	getBook,
	getBooks,
	getGenre,
	putBooks,
} from "./controller/bookController";

const router = express.Router();

router.get("/book/:id", getBook);
router.get("/book", getBooks);
router.post("/book", addBook);
router.put("/book", putBooks);
router.delete("/book", deleteBook);

router.get("/user", getUsers);
router.post("/user", addUser);
router.delete("/user", deleteUser);
router.get("/user", getUserbyId);

router.post("/genre", addGenre);
router.get("/genre", getGenre);
router.put("/genre", editGenre);

router.post("/author", addAuthor);
router.get("/author", getAuthor);
router.put("/author", editAuthor);
router.delete("/author", deleteAuthor);

export default router;
