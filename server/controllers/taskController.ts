import db from "../db/dbConfig.js";
import { Request, Response } from "express";
import { TaskBody } from "../models/Tasks.js";


export const getTasks = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const [rows] = await db.query(
      "SELECT * FROM tasks ORDER BY created_at DESC"
    );
    console.log(rows);
    res.json(rows);

  } catch (error) {
    res.status(500).json({ message: "Failed to fetch tasks" });
  }
};


export const addTask = async (
  req: Request<{}, {}, TaskBody>,
  res: Response
): Promise<void> => {
  try {
    const { title, description, completed } = req.body;
    console.log(title, description, completed);
    const [result]: any = await db.query(
      "INSERT INTO tasks (title, description, status) VALUES (?, ?, ?)",
      [title, description ?? null, completed ?? false]
    );

    res.status(201).json({
      id: result.insertId,
      title,
      description,
      completed: completed ?? false,
    });
  } catch (error) {
    console.error("Error adding task:", error);
    res.status(500).json({ message: "Failed to add task" });
  }
};


export const updateTask = async (
  req: Request<{ id: string }, {}, TaskBody>,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;
    const { title, description, status } = req.body;

    await db.query(
      "UPDATE tasks SET title = COALESCE(?, title), description = COALESCE(?, description), status = COALESCE(?, status) WHERE id = ?",
      [title, description, status, id]
    );

    res.json({ message: "Task updated successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to update task" });
  }
};


export const deleteTask = async (
  req: Request<{ id: string }>,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;

    await db.query("DELETE FROM tasks WHERE id = ?", [id]);

    res.json({ message: "Task deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete task" });
  }
};