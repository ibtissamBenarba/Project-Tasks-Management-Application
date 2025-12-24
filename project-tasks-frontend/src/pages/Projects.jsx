import { useEffect, useState } from "react";
import { getProjects, createProject, deleteProject } from "../api/projectService";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

export default function Projects() {
  const [projects, setProjects] = useState([]);
  const [filteredProjects, setFilteredProjects] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [showCreateForm, setShowCreateForm] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    loadProjects();
  }, []);

  useEffect(() => {
    if (searchTerm.trim() === "") {
      setFilteredProjects(projects);
    } else {
      setFilteredProjects(
        projects.filter((p) =>
          p.title.toLowerCase().includes(searchTerm.toLowerCase())
        )
      );
    }
  }, [searchTerm, projects]);

  const loadProjects = async () => {
    try {
      const res = await getProjects();
      setProjects(res.data);
      setFilteredProjects(res.data);
    } catch (error) {
      console.error("GET PROJECTS ERROR:", error);
    }
  };

  const handleCreate = async () => {
    if (!title.trim()) return;
    try {
      await createProject({ title, description });
      setTitle("");
      setDescription("");
      setShowCreateForm(false);
      loadProjects();
    } catch (error) {
      console.error("CREATE PROJECT ERROR:", error);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this project?")) return;
    try {
      await deleteProject(id);
      loadProjects();
    } catch (error) {
      console.error("DELETE PROJECT ERROR:", error);
    }
  };

  return (
    <>
      <Navbar />
      <div className="container my-5">

        {/* Header */}
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h1 style={{ color: "#228B22", fontWeight: "700" }}>My Projects</h1>
          <button
            className="btn"
            style={{
              backgroundColor: "#228B22",
              color: "white",
              borderRadius: "50px",
              padding: "8px 20px",
              fontWeight: "500",
              transition: "0.2s",
            }}
            onClick={() => setShowCreateForm(!showCreateForm)}
          >
            {showCreateForm ? "Cancel" : "+ New Project"}
          </button>
        </div>

        {/* Search Bar */}
        <input
          type="text"
          className="form-control mb-4"
          placeholder="Search projects..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{
            borderRadius: "25px",
            padding: "10px 20px",
            border: "1px solid #ddd",
          }}
        />

        {/* Create Project Form */}
        {showCreateForm && (
          <div className="card mb-4 shadow-sm rounded-4" style={{ border: "none" }}>
            <div className="card-body">
              <h5 className="card-title mb-3" style={{ color: "#228B22" }}>
                Create New Project
              </h5>
              <input
                className="form-control mb-2"
                placeholder="Project Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
              <textarea
                className="form-control mb-2"
                rows="3"
                placeholder="Project Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
              <button
                className="btn"
                style={{
                  backgroundColor: "#32CD32",
                  color: "white",
                  borderRadius: "50px",
                  padding: "8px 20px",
                  fontWeight: "500",
                  transition: "0.2s",
                }}
                onClick={handleCreate}
                disabled={!title.trim()}
              >
                Add Project
              </button>
            </div>
          </div>
        )}

        {/* Project List */}
        <div className="row g-4">
          {filteredProjects.length === 0 && (
            <p className="text-center text-muted">No projects found 🚀</p>
          )}

          {filteredProjects.map((p) => (
            <div key={p.id} className="col-md-4">
              <div
                className="card h-100 rounded-4 shadow-sm"
                style={{
                  backgroundColor: "#f0fff0",
                  transition: "transform 0.2s, box-shadow 0.2s",
                  cursor: "pointer",
                }}
              >
                <div className="card-body d-flex flex-column justify-content-between">
                  <div
                    onClick={() => navigate(`/projects/${p.id}`)}
                  >
                    <h5 className="card-title fw-bold" style={{ color: "#228B22" }}>
                      {p.title}
                    </h5>
                    <p className="card-text text-muted">
                      {p.description || "No description"}
                    </p>
                  </div>

                  {/* Delete Button */}
                  <button
                    className="btn"
                    style={{
                      backgroundColor: "#FF6B6B",
                      color: "white",
                      borderRadius: "50px",
                      padding: "6px 16px",
                      marginTop: "10px",
                      fontWeight: "500",
                      transition: "0.2s",
                    }}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDelete(p.id);
                    }}
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
