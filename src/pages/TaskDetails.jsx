import { useParams, useNavigate } from "react-router-dom";

function TaskDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  const task = tasks.find((item) => item.id.toString() === id);

  if (!task) {
    return (
      <div className="page-container">
        <h2>Task Not Found</h2>
        <button onClick={() => navigate("/tasks")}>Back to Tasks</button>
      </div>
    );
  }

  return (
    <div className="page-container">
      <h1>Task Details</h1>

      <div className="task-card">
        <h2>{task.title}</h2>
        <p><strong>Description:</strong> {task.description}</p>
        <p><strong>Priority:</strong> {task.priority}</p>
        <p><strong>Status:</strong> {task.status}</p>
        <p><strong>Created:</strong> {task.createdAt}</p>
      </div>

      <button onClick={() => navigate("/tasks")}>Back to Tasks</button>
    </div>
  );
}

export default TaskDetails;
