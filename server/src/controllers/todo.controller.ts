import { todoService } from '@/services/todo.service';
import type { NextFunction, Request, Response } from "express";

async function get(req: Request, res: Response, next: NextFunction) {
	try {
		res.json({ message: "hi" });
	} catch (err: any) {
		console.error(`Error while creating programming language`, err.message);
		next(err);
	}
}

async function create(req: Request, res: Response, next: NextFunction) {
	const text = (req.body as { text: string }).text;

	if (!text) {
		return res.status(400).send("Request body is missing or invalid");
	}

	try {
    await todoService.create(text)
    res.status(200).send("Added to database")
	} catch (err: any) {
		console.error(`Error while creating programming language`, err.message);
		next(err);
	}
}

export const todoController = { create, get };
