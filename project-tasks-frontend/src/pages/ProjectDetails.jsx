import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import {
  getTasks,
  createTask,
  completeTask,
  deleteTask
} from "../api/taskService";
import { getProjectById, getProjectProgress } from "../api/projectService";

export default function ProjectDetails() {
  const { id } = useParams();
  const [project, setProject] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [progress, setProgress] = useState(0);
  const [showAddTaskForm, setShowAddTaskForm] = useState(false);

  useEffect(() => {
    if (id) loadData();
  }, [id]);

  const loadData = async () => {
    try {
      const projectRes = await getProjectById(id);
      setProject(projectRes.data);

      const t = await getTasks(id);
      const p = await getProjectProgress(id);

      setTasks(t.data);
      setProgress(p.data.progressPercentage ?? 0);
    } catch (error) {
      console.error(error);
    }
  };

  const handleCreate = async () => {
    if (!title.trim()) return;

    try {
      await createTask(id, { title, description, dueDate: dueDate || null });
      setTitle("");
      setDescription("");
      setDueDate("");
      setShowAddTaskForm(false);
      loadData();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <Navbar />
      <div className="container my-5">

        {/* Project Title */}
        {project && (
          <h2 style={{ color: "#228B22", fontWeight: "700" }} className="mb-3">
            {project.title} – Tasks List
          </h2>
        )}

        {/* Progress Bar */}
        <div className="mb-4">
          <div className="progress" style={{ height: "25px", borderRadius: "12px" }}>
            <div
              className="progress-bar"
              role="progressbar"
              style={{
                width: `${progress}%`,
                backgroundColor: "#32CD32",
                borderRadius: "12px",
              }}
            >
              {progress}%
            </div>
          </div>
        </div>

        {/* Toggle Add Task Form */}
        <div className="mb-3">
          <button
            className="btn"
            style={{
              backgroundColor: "#228B22",
              color: "white",
              borderRadius: "50px",
              padding: "8px 20px",
              fontWeight: "500",
              transition: "0.2s"
            }}
            onClick={() => setShowAddTaskForm(!showAddTaskForm)}
          >
            {showAddTaskForm ? "Cancel" : "+ Add Task"}
          </button>
        </div>

        {/* Add Task Form */}
        {showAddTaskForm && (
          <div className="card mb-4 shadow-sm rounded-4" style={{ border: "none" }}>
            <div className="card-body">
              <h5 style={{ color: "#228B22" }} className="card-title mb-3">Add Task</h5>

              <input
                className="form-control mb-2"
                placeholder="Task title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
              <textarea
                className="form-control mb-2"
                placeholder="Task description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
              <input
                type="date"
                className="form-control mb-2"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
              />

              <button
                className="btn"
                style={{
                  backgroundColor: "#32CD32",
                  color: "white",
                  borderRadius: "50px",
                  padding: "8px 20px",
                  fontWeight: "500",
                  transition: "0.2s"
                }}
                onClick={handleCreate}
                disabled={!title.trim()}
              >
                Add Task
              </button>
            </div>
          </div>
        )}

        {/* Tasks List */}
        <ul className="list-group">
          {tasks.map((task) => (
            <li
              key={task.id}
              className={`list-group-item d-flex justify-content-between align-items-center ${
                task.completed ? "list-group-item-secondary text-decoration-line-through" : ""
              }`}
              style={{ borderRadius: "12px", marginBottom: "10px", boxShadow: "0 2px 5px rgba(0,0,0,0.05)" }}
            >
              <div>
                <strong>{task.title}</strong>
                {task.description && <div className="small text-muted">{task.description}</div>}
                {task.dueDate && <div className="small text-muted">Due: {task.dueDate}</div>}
              </div>

              <div className="d-flex gap-2">
                {!task.completed && (
                  <button
                    className="btn d-flex align-items-center"
                    style={{
                      backgroundColor: "#32CD32",
                      color: "white",
                      borderRadius: "50px",
                      padding: "5px 15px",
                      fontWeight: "500",
                      transition: "0.2s"
                    }}
                    onClick={async () => {
                      await completeTask(id, task.id);
                      loadData();
                    }}
                  >
                    <i className="bi bi-check-lg me-1"></i> Done
                  </button>
                )}
                <button
                  className="btn d-flex align-items-center"
                  style={{
                    backgroundColor: "#FF6B6B",
                    color: "white",
                    borderRadius: "50px",
                    padding: "5px 15px",
                    fontWeight: "500",
                    transition: "0.2s"
                  }}
                  onClick={async () => {
                    if (window.confirm("Are you sure you want to delete this task?")) {
                      await deleteTask(id, task.id);
                      loadData();
                    }
                  }}
                >
                  <i className="bi bi-trash me-1"></i> Delete
                </button>

              </div>
            </li>
          ))}
        </ul>

      </div>
    </>
  );
}
