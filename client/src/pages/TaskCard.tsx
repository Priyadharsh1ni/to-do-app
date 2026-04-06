import React from "react";
import { Task } from "../type/types";
import '../App.css';

interface Props {
  task: Task;
}

const TaskCard: React.FC<Props> = ({ task }) => {
  return (
    <div className="grid-card">
      <div>
        <input
          type="checkbox"
          checked={task.status === 1}
          className="checkbox"
        />
      </div>

      <div className="card-content">
        <h3 className="card-title">{task.title}</h3>
        <p className="card-description">
          {task.description ? task.description : "No description provided."}
        </p>
      </div>
    </div>
  );
};

export default TaskCard;