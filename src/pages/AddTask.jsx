import { useState } from "react";
import { useNavigate } from "react-router-dom";

function AddTask() {
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("Medium");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!title.trim()) {
      alert("Please enter a task title");
      return;
    }

    const newTask = {
      id: Date.now(),
      title,
      description,
      priority,
      status: "Pending",
      createdAt: new Date().toLocaleString(),
    };

    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];

    tasks.push(newTask);

    localStorage.setItem("tasks", JSON.stringify(tasks));

    alert("Task added successfully!");
    navigate("/tasks");
  };

  return (
    <div className="page-container">
      <h1>Add New Task</h1>

      <form className="task-form" onSubmit={handleSubmit}>
        <label>Task Title</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter task title"
          required
        />

        <label>Description</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Enter task description"
        />

        <label>Priority</label>
        <select
          value={priority}
          onChange={(e) => setPriority(e.target.value)}
        >
          <option>High</option>
          <option>Medium</option>
          <option>Low</option>
        </select>

        <button type="submit">Add Task</button>
      </form>
    </div>
  );
}

export default AddTask;
