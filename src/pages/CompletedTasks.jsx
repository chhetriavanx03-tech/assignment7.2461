import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function CompletedTasks() {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("tasks")) || [];

    setTasks(saved.filter((task) => task.status === "Closed"));
  }, []);

  return (
    <main>
      <h1>Completed Tasks</h1>

      {tasks.length === 0 ? (
        <div className="empty">
          <h3>No completed tasks yet</h3>
        </div>
      ) : (
        <div className="task-list">
          {tasks.map((task) => (
            <div className="task-card" key={task.id}>
              <h3>{task.header}</h3>

              <p>{task.description}</p>
              <p>Priority: {task.priority}</p>
              <p>Category: {task.category}</p>
              <p>Status: {task.status}</p>

              <Link to={`/tasks/${task.id}`}>
                View Details
              </Link>
            </div>
          ))}
        </div>
      )}
    </main>
  );
}

export default CompletedTasks;
