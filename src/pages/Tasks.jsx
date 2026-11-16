import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function Tasks() {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const savedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
    setTasks(savedTasks);
  }, []);

  const deleteTask = (id) => {
    const updatedTasks = tasks.filter((task) => task.id !== id);
    setTasks(updatedTasks);
    localStorage.setItem("tasks", JSON.stringify(updatedTasks));
  };

  const completeTask = (id) => {
    const updatedTasks = tasks.map((task) =>
      task.id === id ? { ...task, status: "Completed" } : task
    );

    setTasks(updatedTasks);
    localStorage.setItem("tasks", JSON.stringify(updatedTasks));
  };

  return (
    <div className="page-container">
      <h1>My Tasks</h1>

      {tasks.length === 0 ? (
        <p>No tasks available. Add your first task!</p>
      ) : (
        tasks
          .filter((task) => task.status !== "Completed")
          .map((task) => (
            <div className="task-card" key={task.id}>
              <h3>{task.title}</h3>
              <p>{task.description}</p>
              <p>Priority: {task.priority}</p>
              <p>Status: {task.status}</p>

              <Link to={`/tasks/${task.id}`}>View Details</Link>

              <button onClick={() => completeTask(task.id)}>
                Complete
              </button>

              <button onClick={() => deleteTask(task.id)}>
                Delete
              </button>
            </div>
          ))
      )}
    </div>
  );
}

export default Tasks;
