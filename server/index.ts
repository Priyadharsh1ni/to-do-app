import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import taskRoutes from "./router/tasks.ts"; 

const app = express();
const PORT = 5000;

app.use(cors());
app.use(bodyParser.json());

app.use("/tasks", taskRoutes);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});