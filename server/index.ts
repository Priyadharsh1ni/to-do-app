import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import taskRoutes from "./router/tasks.js"; 

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());

app.use("/tasks", taskRoutes);

app.get("/health", (_req, res) => {
  res.status(200).json({ status: "ok" });
});

console.log("ENV CHECK", {
  DB_HOST: process.env.DB_HOST,
  DB_USER: process.env.DB_USER,
  DB_NAME: process.env.DB_NAME,
  DB_PORT: process.env.DB_PORT,
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});