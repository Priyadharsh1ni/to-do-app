import React, { useEffect, useState } from "react";
import { getTasks, updateTask } from "../api/api";
import { Task } from "../type/types";
import "../App.css";
import TaskCard from "./TaskCard";
import { useNavigate } from "react-router-dom";

const Home: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [viewAll, setViewAll] = useState(false);
  const navigate = useNavigate();

  const fetchTasks = () => {
    getTasks().then(res => setTasks(res.data));
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const toggleStatus = (task: Task) => {
    const newStatus = task.status === 1 ? "Incomplete" : "Complete";
    updateTask(task.id, { status: newStatus }).then(fetchTasks);
  };

  return (
    <div className="Main-Container">
      <header className="header-section">
        {viewAll && <button className="back-btn" onClick={() => setViewAll(false)}>
          Back
        </button>}
        <h1 className="title">
          TODO <span className="blue-text">LIST</span>
        </h1>
      </header>

      {!viewAll ? (
        <>
          <div className="task-list">
            {tasks.length > 0 ? tasks.map(task => (
              <div key={task.id} className="task-card">
            <div
              className={`status-icon ${
                task.status === 1 ? "completed" : "pending"
              }`}
            >
              <input
                type="checkbox"
                checked={task.status === 1}
                onChange={() => toggleStatus(task)}
                className="checkbox"
              />
            </div>

                <div className="task-info ">
                  <h3>{task.title.length > 20 ? `${task.title.substring(0, 20)}...` : task.title}</h3>
                </div>

                <button
                  className="view-btn"
                  onClick={() => navigate(`/edit/${task.id}`)}
                >
                  VIEW
                </button>
              </div>
            )) : (
               <div className="no-tasks-container">
              <p className="no-tasks">No tasks available. Add a new task to get started!</p>
              </div>
            )}
          </div>

          <div className="footer-actions">
            {tasks && tasks.length > 0 && (
              <div className="view-all" onClick={() => setViewAll(true)}>
                View All
              </div>
            )}

            <button
              className="add-todo-btn"
              onClick={() => navigate("/add")}
            >
              Add Todo
            </button>
          </div>
        </>
      ) : (

      <div className="task-grid-container">
        {viewAll && tasks.map(task => <TaskCard key={task.id} task={task} />)}
      </div>
      )}
    </div>

  );
};

export default Home;