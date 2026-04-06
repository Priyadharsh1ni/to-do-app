import React, { useEffect, useState } from "react";
import { addTask, deleteTask, getTasks, updateTask } from "../api/api";
import '../App.css';
import { Task } from "../type/types";
import { useNavigate, useParams } from "react-router-dom";

const AddTask: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEdit = Boolean(id);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState(false);

  useEffect(() => {
    if (isEdit) {
      getTasks().then(res => {
        const task = res.data.find((t: Task) => t.id === Number(id));
        if (task) {
          setTitle(task.title);
          setDescription(task.description || "");
          setStatus(task.status === 1);
        }
      });
    }
  }, [id, isEdit]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const payload = {
      title,
      description,
      status: status ? "Complete" : "Incomplete",
    };

    if (isEdit) {
      await updateTask(Number(id), payload);
    } else {
      await addTask(payload);
    }

    navigate("/");
  };

  const handleDelete = async () => {
    if (!id) return;
    await deleteTask(Number(id));
    navigate("/");
  };

  return (
    <div className="Main-Container">
      <h1 className="title">
        ADD <span className="blue-text">TODO </span>
      </h1>
      <form className="detail-form" onSubmit={handleSubmit}>
        <div className="form-layout">
          <div
            className={`status-icon ${status ? "completed" : "pending"
              }`}
          >
            <span className="finish-text">
              {status ? "Completed" : "Finish"}
            </span>

            <input
              type="checkbox"
              checked={status}
              onChange={() => setStatus(!status)}
              className="task-checkbox"
            />
          </div>


          <div className="inputs-column">
            <div className="input-group">
              <label className="input-label">TITLE</label>
              <input
              placeholder="enter a title"
                className="custom-input"
                value={title}
                required
                onChange={e => setTitle(e.target.value)}
              />
            </div>

            <div className="input-group">
              <label className="input-label">DESCRIPTION</label>
              <textarea
              placeholder="enter a description"
                className="custom-textarea"
                value={description}
                onChange={e => setDescription(e.target.value)}
              />
            </div>

            <div className="button-group">
              <button type="submit" className="update-btn">{isEdit ? "UPDATE" : "ADD"} TASK</button>
              {isEdit && (
                <button type="button" className="delete-btn" onClick={handleDelete}>
                  DELETE
                </button>
              )}
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default AddTask;