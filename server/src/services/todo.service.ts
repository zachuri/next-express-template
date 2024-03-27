import { db } from '@/db';
import { todo } from '@/db/schema';

async function getMultiple(page: number) {
	// Implementation
}

async function create(text: string) {
  await db.insert(todo).values({
    text
  })
}

async function update(id: number, message: string) {
	// Implementation
}

async function remove(id: number) {
	// Implementation
}

export const todoService = {
	create,
	getMultiple,
	remove,
	update,
};
