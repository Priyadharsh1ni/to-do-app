import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:3001/api/tasks";

export const getTasks = () => axios.get(API_URL);

export const addTask = (task: { title: string; description: string; status: string }) => {
  return axios.post(API_URL, {
    ...task,
    completed: task.status === "Complete" ? true : false
  });
};

export const updateTask = (id: number, task: { title?: string; description?: string; status: string }) => {
  return axios.put(`${API_URL}/${id}`, {
    title: task.title,
    description: task.description,
    status: task.status === "Complete" ?  true : false
  });
};

export const deleteTask = (id: number) => axios.delete(`${API_URL}/${id}`);