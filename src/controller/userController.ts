import express, { Express, Request, Response } from "express";

interface IUsers {
	id: number;
	name: string;
	email: string;
}

const users: IUsers[] = [];

export const getUsers = async (req: Request, res: Response) => {
	res.status(200).json({ message: "User Fetched", users });
};

export const addUser = (req: Request, res: Response) => {
	const { id, name, email } = req.body;
	users.push({ id, name, email });
	res.status(200).json({ users });
};

export const deleteUser = (req: Request, res: Response) => {
	const newUser = users.filter((user) => {
		return user.id !== req.body.id;
	});
	res.status(200).json(newUser);
};

export const getUserbyId = (req: Request, res: Response) => {
	const id = req.body;
	console.log(id);
	const mainUser = users.find((user) => user.id === id);
	res.status(200).json(mainUser);
};
