// import { todoService } from '@/services/todo.service';
import type { NextFunction, Request, Response } from "express";

async function login(req: Request, res: Response, next: NextFunction) {
	try {
		res.json({ message: "hi" });
	} catch (err: any) {
		console.error(`Error while creating programming language`, err.message);
		next(err);
	}
}

async function register(req: Request, res: Response, next: NextFunction) {
	try {
		res.json({ message: "hi" });
	} catch (err: any) {
		console.error(`Error while creating programming language`, err.message);
		next(err);
	}
}

async function logout(req: Request, res: Response, next: NextFunction) {
	try {
		res.json({ message: "hi" });
	} catch (err: any) {
		console.error(`Error while creating programming language`, err.message);
		next(err);
	}
}

export const authController = { login, register, logout };
