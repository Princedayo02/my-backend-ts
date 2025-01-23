import express, { Express, Request, Response } from "express";
import Genre from "../database/models/Genre";
import Author from "../database/models/Authors";
import Book from "../database/models/Books";
interface IBooks {
	id: number;
	name: string;
	email: string;
}

//getting All books
export const getBooks = async (req: Request, res: Response) => {
	try {
		const allBooks = await Book.findAll();
		res.status(200).json(allBooks);
	} catch (err) {
		console.error(err);
		res.status(500).json({ message: "server error", err });
	}
};

//creating book
export const addBook = async (req: Request, res: Response) => {
	const { name, isbn, authorId, genreId, year, proofRead } = req.body;

	const newBook = await Book.create({ name, isbn, authorId, genreId });
	await newBook.save();
	res.status(201).json({ message: "Book created", newBook });
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

// export const putBooks = (req: Request, res: Response) => {
// 	const id = parseInt(req.params.id);
// 	const bookToBeUpdated = books.find((book) => book.id === id);
// 	const { email, name } = req.body;
// 	if (bookToBeUpdated !== undefined) {
// 		bookToBeUpdated.email = email;
// 		bookToBeUpdated.name = name;
// 		res.status(200).json({ bookToBeUpdated, message: "Updated Edition" });
// 	}
// };

// export const deleteBook = (req: Request, res: Response) => {
// 	const newBook = books.filter((book) => {
// 		return book.id !== req.body.id;
// 	});
// 	res.status(200).json({ newBook, message: "Book with id 1 deleted successfully." });
// };

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
			res.status(404).json({ message: "No genres found" });
		} else {
			res.status(200).json({ message: "All Author Fetched", data: allAuthor });
		}
	} catch (err) {
		console.log(err);
		res.status(500).json({ message: "Failed to get authors", err });
	}
};
