import db from "../db/dbConfig.js";
export const getTasks = async (req, res) => {
    try {
        const [rows] = await db.query("SELECT * FROM tasks ORDER BY created_at DESC");
        res.json(rows);
    }
    catch (error) {
        res.status(500).json({ message: "Failed to fetch tasks" });
    }
};
export const addTask = async (req, res) => {
    try {
        const { title, description, completed } = req.body;
        console.log(title, description, completed);
        const [result] = await db.query("INSERT INTO tasks (title, description, status) VALUES (?, ?, ?)", [title, description ?? null, completed ?? false]);
        res.status(201).json({
            id: result.insertId,
            title,
            description,
            completed: completed ?? false,
        });
    }
    catch (error) {
        console.error("Error adding task:", error);
        res.status(500).json({ message: "Failed to add task" });
    }
};
export const updateTask = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, description, status } = req.body;
        await db.query("UPDATE tasks SET title = COALESCE(?, title), description = COALESCE(?, description), status = COALESCE(?, status) WHERE id = ?", [title, description, status, id]);
        res.json({ message: "Task updated successfully" });
    }
    catch (error) {
        res.status(500).json({ message: "Failed to update task" });
    }
};
export const deleteTask = async (req, res) => {
    try {
        const { id } = req.params;
        await db.query("DELETE FROM tasks WHERE id = ?", [id]);
        res.json({ message: "Task deleted successfully" });
    }
    catch (error) {
        res.status(500).json({ message: "Failed to delete task" });
    }
};
