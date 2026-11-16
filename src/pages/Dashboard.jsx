import { useNavigate } from "react-router-dom";

function Dashboard() {
  const navigate = useNavigate();
  const username =
    localStorage.getItem("username") ||
    sessionStorage.getItem("username") ||
    "User";

  return (
    <div className="dashboard">
      <h1>Welcome, {username}!</h1>
      <p>You have successfully logged in.</p>

      <div className="dashboard-cards">
        <div className="card" onClick={() => navigate("/tasks")}>
          <h2>My Tasks</h2>
          <p>View and manage your tasks.</p>
        </div>

        <div className="card" onClick={() => navigate("/add-task")}>
          <h2>Add Task</h2>
          <p>Create a new task.</p>
        </div>

        <div className="card" onClick={() => navigate("/completed")}>
          <h2>Completed Tasks</h2>
          <p>View completed tasks.</p>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
