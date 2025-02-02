import express, { Express, Request, Response } from "express";
import Genre from "../database/models/Genre";
import Author from "../database/models/Authors";
import Book from "../database/models/Books";
// interface IBooks {
// 	id: number;
// 	name: string;
// 	email: string;
// }

//getting All books
export const getBooks = async (req: Request, res: Response) => {
	try {
		const allBooks = await Book.findAll({
			include: [
				{ model: Genre, as: "genre", attributes: ["name"] },
				{ model: Author, as: "author", attributes: ["name", "age"] },
			],
			attributes: ["id", "name", "year", "proofRead", "isbn"],
		});
		res.status(200).json(allBooks);
	} catch (err) {
		console.error(err);
		res.status(500).json({ message: "server error", err });
	}
};

//creating book
export const addBook = async (req: Request, res: Response) => {
	try {
		const { name, isbn, authorId, genreId, year, proofRead } = req.body;
		console.log(req.body);

		const newBook = await Book.create({ name, isbn, authorId, genreId, year, proofRead });
		await newBook.save();
		res.status(201).json({ message: "Book created", newBook });
	} catch (error) {
		res.status(500).json({ message: "error creating book", error });
		console.log(error);
	}
};

//Get book ByID
export const getBook = async (req: Request, res: Response) => {
	const id = req.params.id;
	const book = await Book.findOne({ where: { id: id } });
	try {
		if (!book) {
			res.status(404).json({ message: "Book not found" });
		} else {
			res.status(200).json(book);
		}
	} catch (err) {
		console.error(err);
		res.status(500).json({ message: "error getting single book" });
	}
};

export const editBook = async (req: Request, res: Response) => {
	try {
		const { id, name, isbn, authorId, genreId, year, proofRead } = req.body;
		if (typeof year !== "string" && typeof proofRead !== "boolean") {
			res.status(400).json({ message: "Name or age input invalid" });
		} else {
			const updatedBook = await Book.findOne({ where: { id } });
			if (updatedBook !== null) {
				if (year !== undefined) updatedBook.year = year;

				if (proofRead !== undefined && typeof proofRead == "boolean") updatedBook.proofRead = proofRead;
				await updatedBook.save();

				res.status(200).json({ updatedBook, message: "Updated author profile" });
			}
		}
	} catch (err) {
		res.status(400).json({ message: "Error editing book", err });
	}
};

export const putBooks = async (req: Request, res: Response) => {
	try {
		const { id, year, isbn, author, proofRead, name } = req.body;
		const bookToBeUpdated = await Book.findOne({ where: { id } });
		if (bookToBeUpdated !== null) {
			bookToBeUpdated.name = name;
			bookToBeUpdated.year = year;
			bookToBeUpdated.isbn = isbn;
			bookToBeUpdated.author = author;
			bookToBeUpdated.proofRead = proofRead;
			bookToBeUpdated.save();
			res.status(200).json({ bookToBeUpdated, message: "Updated Edition" });
		}
	} catch (err) {
		res.status(400).json({ message: "Error editing book", err });
	}
};

export const deleteBook = async (req: Request, res: Response) => {
	try {
		const id = req.body.id;
		console.log(id);
		const deletedBook = await Book.destroy({ where: { id: id } });
		res.status(200).json({ deletedBook, message: "Book successfully deleted." });
	} catch (error) {
		res.status(500).json({ message: "Error deleting book", error });
	}
};

export const addGenre = async (req: Request, res: Response) => {
	const { name } = req.body;

	try {
		const newGen = await Genre.create({ name: name });
		await newGen.save();
		res.status(201).json({ message: "Genre added", newGen });
	} catch (err) {
		console.log(err);
		res.status(500).json({ message: "Failed to add genre", err });
	}
};

export const getGenre = async (req: Request, res: Response) => {
	try {
		const allGenres = await Genre.findAll();

		console.log(allGenres, "All genrest");
		if (allGenres.length === 0) {
			res.status(404).json({ message: "No genres found" });
		} else {
			res.status(200).json({ message: "All Genres Fetched", data: allGenres });
		}
	} catch (err) {
		console.log(err);
		res.status(500).json({ message: "Failed to get genres", err });
	}
};

export const addAuthor = async (req: Request, res: Response) => {
	const { name, age } = req.body;

	try {
		const newAuthor = await Author.create({ name, age });
		await newAuthor.save();
		res.status(201).json({ message: "Author added", newAuthor });
	} catch (err) {
		console.log(err);
		res.status(500).json({ message: "Failed to add author", err });
	}
};

export const getAuthor = async (req: Request, res: Response) => {
	try {
		const allAuthor = await Author.findAll();

		if (allAuthor.length === 0) {
			res.status(404).json({ message: "No author found" });
		} else {
			res.status(200).json({ message: "All Author Fetched", data: allAuthor });
		}
	} catch (err) {
		console.log(err);
		res.status(500).json({ message: "Failed to get authors", err });
	}
};

export const editAuthor = async (req: Request, res: Response) => {
	try {
		const { id, name, age } = req.body;
		if (typeof name !== "string" && typeof age !== "number") {
			res.status(400).json({ message: "Name or age input invalid" });
		} else {
			const authorToBeUpdated = await Author.findOne({ where: { id } });
			if (authorToBeUpdated !== null) {
				if (name !== undefined) authorToBeUpdated.name = name;

				if (age !== undefined && typeof age == "number") authorToBeUpdated.age = age;
				await authorToBeUpdated.save();

				res.status(200).json({ authorToBeUpdated, message: "Updated author profile" });
			}
		}
	} catch (err) {
		res.status(400).json({ message: "Error editing author's profile", err });
	}
};

export const editGenre = async (req: Request, res: Response) => {
	try {
		const { name, id } = req.body;
		const genreEdited = await Genre.findOne({ where: { id } });
		if (genreEdited !== null) genreEdited.name = name;
		await genreEdited?.save();
		res.status(200).json({ message: "Genre edited" });
	} catch (error) {
		res.status(400).json({ message: "Error editing genre", error });
	}
};

export const deleteAuthor = async (req: Request, res: Response) => {
	try {
		const id = req.body.id;
		const newAuthor = await Author.destroy({ where: { id: id } });
		res.status(200).json({ newAuthor, message: "Book successfully deleted." });
	} catch (error) {
		res.status(401).json({ message: "Error deleting book", error });
	}
};
