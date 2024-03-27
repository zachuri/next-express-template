import cors from "cors";
import express, { NextFunction, Request, Response } from "express";
import todoRouter from "./routes/todo.route";

const port = process.env.PORT || 8080;

const app = express();
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/todo", todoRouter);

// Triggered for any error
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
	res.status(500).json({ message: err.message });
});

app.listen(port, () => {
	console.log(`Listening on port ${port}...`);
});
