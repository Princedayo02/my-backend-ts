"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteAuthor = exports.editGenre = exports.editAuthor = exports.getAuthor = exports.addAuthor = exports.getGenre = exports.addGenre = exports.deleteBook = exports.putBooks = exports.editBook = exports.getBook = exports.addBook = exports.getBooks = void 0;
const Genre_1 = __importDefault(require("../database/models/Genre"));
const Authors_1 = __importDefault(require("../database/models/Authors"));
const Books_1 = __importDefault(require("../database/models/Books"));
// interface IBooks {
// 	id: number;
// 	name: string;
// 	email: string;
// }
//getting All books
const getBooks = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const allBooks = yield Books_1.default.findAll({
            include: [
                { model: Genre_1.default, as: "genre", attributes: ["name"] },
                { model: Authors_1.default, as: "author", attributes: ["name", "age"] },
            ],
            attributes: ["id", "name", "year", "proofRead", "isbn"],
        });
        res.status(200).json(allBooks);
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ message: "server error", err });
    }
});
exports.getBooks = getBooks;
//creating book
const addBook = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, isbn, authorId, genreId, year, proofRead } = req.body;
        console.log(req.body);
        const newBook = yield Books_1.default.create({ name, isbn, authorId, genreId, year, proofRead });
        yield newBook.save();
        res.status(201).json({ message: "Book created", newBook });
    }
    catch (error) {
        res.status(500).json({ message: "error creating book", error });
        console.log(error);
    }
});
exports.addBook = addBook;
//Get book ByID
const getBook = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const book = yield Books_1.default.findOne({ where: { id: id } });
    try {
        if (!book) {
            res.status(404).json({ message: "Book not found" });
        }
        else {
            res.status(200).json(book);
        }
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ message: "error getting single book" });
    }
});
exports.getBook = getBook;
const editBook = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id, name, isbn, authorId, genreId, year, proofRead } = req.body;
        if (typeof year !== "string" && typeof proofRead !== "boolean") {
            res.status(400).json({ message: "Name or age input invalid" });
        }
        else {
            const updatedBook = yield Books_1.default.findOne({ where: { id } });
            if (updatedBook !== null) {
                if (year !== undefined)
                    updatedBook.year = year;
                if (proofRead !== undefined && typeof proofRead == "boolean")
                    updatedBook.proofRead = proofRead;
                yield updatedBook.save();
                res.status(200).json({ updatedBook, message: "Updated author profile" });
            }
        }
    }
    catch (err) {
        res.status(400).json({ message: "Error editing book", err });
    }
});
exports.editBook = editBook;
const putBooks = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id, year, isbn, author, proofRead, name } = req.body;
        const bookToBeUpdated = yield Books_1.default.findOne({ where: { id } });
        if (bookToBeUpdated !== null) {
            bookToBeUpdated.name = name;
            bookToBeUpdated.year = year;
            bookToBeUpdated.isbn = isbn;
            bookToBeUpdated.author = author;
            bookToBeUpdated.proofRead = proofRead;
            bookToBeUpdated.save();
            res.status(200).json({ bookToBeUpdated, message: "Updated Edition" });
        }
    }
    catch (err) {
        res.status(400).json({ message: "Error editing book", err });
    }
});
exports.putBooks = putBooks;
const deleteBook = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.body.id;
        console.log(id);
        const deletedBook = yield Books_1.default.destroy({ where: { id: id } });
        res.status(200).json({ deletedBook, message: "Book successfully deleted." });
    }
    catch (error) {
        res.status(500).json({ message: "Error deleting book", error });
    }
});
exports.deleteBook = deleteBook;
const addGenre = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name } = req.body;
    try {
        const newGen = yield Genre_1.default.create({ name: name });
        yield newGen.save();
        res.status(201).json({ message: "Genre added", newGen });
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ message: "Failed to add genre", err });
    }
});
exports.addGenre = addGenre;
const getGenre = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const allGenres = yield Genre_1.default.findAll();
        console.log(allGenres, "All genrest");
        if (allGenres.length === 0) {
            res.status(404).json({ message: "No genres found" });
        }
        else {
            res.status(200).json({ message: "All Genres Fetched", data: allGenres });
        }
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ message: "Failed to get genres", err });
    }
});
exports.getGenre = getGenre;
const addAuthor = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, age } = req.body;
    try {
        const newAuthor = yield Authors_1.default.create({ name, age });
        yield newAuthor.save();
        res.status(201).json({ message: "Author added", newAuthor });
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ message: "Failed to add author", err });
    }
});
exports.addAuthor = addAuthor;
const getAuthor = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const allAuthor = yield Authors_1.default.findAll();
        if (allAuthor.length === 0) {
            res.status(404).json({ message: "No author found" });
        }
        else {
            res.status(200).json({ message: "All Author Fetched", data: allAuthor });
        }
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ message: "Failed to get authors", err });
    }
});
exports.getAuthor = getAuthor;
const editAuthor = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id, name, age } = req.body;
        if (typeof name !== "string" && typeof age !== "number") {
            res.status(400).json({ message: "Name or age input invalid" });
        }
        else {
            const authorToBeUpdated = yield Authors_1.default.findOne({ where: { id } });
            if (authorToBeUpdated !== null) {
                if (name !== undefined)
                    authorToBeUpdated.name = name;
                if (age !== undefined && typeof age == "number")
                    authorToBeUpdated.age = age;
                yield authorToBeUpdated.save();
                res.status(200).json({ authorToBeUpdated, message: "Updated author profile" });
            }
        }
    }
    catch (err) {
        res.status(400).json({ message: "Error editing author's profile", err });
    }
});
exports.editAuthor = editAuthor;
const editGenre = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, id } = req.body;
        const genreEdited = yield Genre_1.default.findOne({ where: { id } });
        if (genreEdited !== null)
            genreEdited.name = name;
        yield (genreEdited === null || genreEdited === void 0 ? void 0 : genreEdited.save());
        res.status(200).json({ message: "Genre edited" });
    }
    catch (error) {
        res.status(400).json({ message: "Error editing genre", error });
    }
});
exports.editGenre = editGenre;
const deleteAuthor = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.body.id;
        const newAuthor = yield Authors_1.default.destroy({ where: { id: id } });
        res.status(200).json({ newAuthor, message: "Book successfully deleted." });
    }
    catch (error) {
        res.status(401).json({ message: "Error deleting book", error });
    }
});
exports.deleteAuthor = deleteAuthor;
