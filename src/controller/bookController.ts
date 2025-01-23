import express, { Express, Request, Response } from "express";

interface IBooks {
	id: number;
	name: string;
	email: string;
}

const books: IBooks[] = [];

export const getBooks = async (req: Request, res: Response) => {
	res.status(200).json({ message: "User Fetched", books });
};

export const addBook = (req: Request, res: Response) => {
	const { id, name, email } = req.body;
	books.push({ id, name, email });
	res.status(200).json({ books });
};

export const getBook = (req: Request, res: Response) => {
	const id = req.body;
	const theBook = books.find((book) => book.id === id);
	if (!theBook?.id) {
		res.status(404).json({ message: "book not found" });
	} else {
		res.status(200).json(theBook);
	}
};

export const putBooks = (req: Request, res: Response) => {
	const id = parseInt(req.params.id);
	const bookToBeUpdated = books.find((book) => book.id === id);
	const { email, name } = req.body;
	if (bookToBeUpdated !== undefined) {
		bookToBeUpdated.email = email;
		bookToBeUpdated.name = name;
		res.status(200).json({ bookToBeUpdated, message: "Updated Edition" });
	}
};

export const deleteBook = (req: Request, res: Response) => {
	const newBook = books.filter((book) => {
		return book.id !== req.body.id;
	});
	res.status(200).json({ newBook, message: "Book with id 1 deleted successfully." });
};
