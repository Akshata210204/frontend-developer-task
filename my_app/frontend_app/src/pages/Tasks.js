import { useEffect, useState } from "react";
import api from "../api/axios";
import "./Tasks.css";

function Tasks() {
  const [tasks, setTasks] = useState([]);

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const [editId, setEditId] = useState(null);
  const [editTitle, setEditTitle] = useState("");
  const [editDescription, setEditDescription] = useState("");

  // Load tasks
  const loadTasks = async () => {
    const res = await api.get("/tasks/");
    setTasks(res.data);
    console.log(res.data);
  };

  useEffect(() => {
    loadTasks();
  }, []);

  // Add task
  const addTask = async () => {
    if (!title.trim()) {
      alert("Title required");
      return;
    }

    await api.post("/tasks/", {
      title,
      description,
      completed: false,
    });

    setTitle("");
    setDescription("");
    loadTasks();
  };

  // Delete task
  const deleteTask = async (id) => {
    await api.delete(`/tasks/${id}`);
    loadTasks();
  };

  // Update task (NO status here)
  const updateTask = async () => {
    if (!editTitle.trim()) {
      alert("Title cannot be empty");
      return;
    }

    const task = tasks.find((t) => t.id === editId);

    await api.put(`/tasks/${editId}`, null, {
      params: {
        title: editTitle,
        description: editDescription,
        completed: task.completed, // 🔥 keep same completed value
      },
    });

    setEditId(null);
    loadTasks();
  };

  // Toggle completed (FIXED)
  const toggleCompleted = async (task) => {
    await api.put(`/tasks/${task.id}`, null, {
      params: {
        title: task.title,
        description: task.description,
        completed: !task.completed,
      },
    });

    loadTasks();
  };

  // Search + Filter (BOOLEAN BASED)
  const filteredTasks = tasks
  .filter((task) => {
    const matchesSearch =
      task.title.toLowerCase().includes(search.toLowerCase()) ||
      task.description?.toLowerCase().includes(search.toLowerCase());

    const matchesStatus =
      statusFilter === "all" ||
      (statusFilter === "completed" && task.completed) ||
      (statusFilter === "pending" && !task.completed);

    return matchesSearch && matchesStatus;
  })
  // 🔥 THIS LINE MAKES PENDING COME FIRST
  .sort((a, b) => a.completed - b.completed);

  return (
    <div className="tasks-bg">
      <div className="tasks-layout">

        {/* LEFT BOX */}
        <div className="left-box">
          <h4 className="box-title">Add Task</h4>

          <input
            className="form-control mb-2"
            placeholder="Task title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <textarea
            className="form-control mb-3"
            placeholder="Task description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />

          <button className="btn btn-primary w-100" onClick={addTask}>
            Add Task
          </button>
        </div>

        {/* RIGHT BOX */}
        <div className="right-box">
          <h2 className="box-title">Your Tasks</h2>

          <div className="tasks-controls">
            <input
              className="form-control"
              placeholder="Search tasks..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />

            <select
              className="form-select"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="all">All</option>
              <option value="pending">Pending</option>
              <option value="completed">Completed</option>
            </select>
          </div>

          <ul className="task-list">
            {filteredTasks.length === 0 && (
              <p className="empty-text">No tasks found</p>
            )}

            {filteredTasks.map((task) => (
              <li
                key={task.id}
                className={`task-item ${task.completed ? "completed" : "pending"}`}
              >
                <div>
                  <strong>{task.title}</strong>
                  <p>{task.description}</p>
              
                  {/* STATUS BADGE */}
                  <span
                    className={`status-badge ${
                      task.completed ? "green" : "red"
                    }`}
                  >
                    {task.completed ? "Completed" : "Pending"}
                  </span>
                </div>
              
                {/* ACTIONS ONLY FOR PENDING TASKS */}
                {!task.completed && (
                  <div className="task-actions">
                    <label className="checkbox-wrapper">
                      <input
                        type="checkbox"
                        checked={false}
                        onChange={() => toggleCompleted(task)}
                      />
                      <span className="check-text">Mark as Done</span>
                    </label>
              
                    <button
                      className="btn btn-sm btn-outline-primary"
                      onClick={() => {
                        setEditId(task.id);
                        setEditTitle(task.title);
                        setEditDescription(task.description);
                      }}
                    >
                      Update
                    </button>
              
                    <button
                      className="btn btn-sm btn-outline-danger"
                      onClick={() => deleteTask(task.id)}
                    >
                      Delete
                    </button>
                  </div>
                )}
              </li>
            
            ))}
          </ul>

          {editId && (
            <div className="edit-card">
              <h5>Update Task</h5>

              <input
                className="form-control mb-2"
                value={editTitle}
                onChange={(e) => setEditTitle(e.target.value)}
              />

              <input
                className="form-control mb-2"
                value={editDescription}
                onChange={(e) => setEditDescription(e.target.value)}
              />

              <button className="btn btn-primary" onClick={updateTask}>
                Save Update
              </button>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}

export default Tasks;
