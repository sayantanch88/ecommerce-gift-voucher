import React, { useEffect, useState } from "react";
import axios from "axios";

const API_URL =
  window.location.hostname === "localhost"
    ? "http://localhost:8080/tasks"
    : "http://backend:8080/tasks";

function App() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");
  const [editId, setEditId] = useState(null);
  const [editText, setEditText] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [addTitleError, setAddTitleError] = useState("");
  const [editTitleError, setEditTitleError] = useState("");

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await axios.get(API_URL);
      setTasks(res.data);
    } catch (err) {
      setError(err.message || "Failed to fetch tasks");
      setTasks([]);
    }
    setLoading(false);
  };

  const addTask = async () => {
    setAddTitleError("");
    if (!newTask.trim()) {
      setAddTitleError("Title must not be empty");
      return;
    }
    setError("");
    try {
      const today = new Date().toISOString().split("T")[0]; // yyyy-mm-dd
      const newTaskObj = {
        title: newTask,
        description: "",
        dueDate: today,
        priority: "MEDIUM",
        status: "PENDING"
      };
      await axios.post(API_URL, newTaskObj);
      setNewTask("");
      fetchTasks();
    } catch (err) {
      setError(err.message || "Failed to add task");
    }
  };

  const deleteTask = async (id) => {
    setError("");
    try {
      await axios.delete(`${API_URL}/${id}`);
      fetchTasks();
    } catch (err) {
      setError(err.message || "Failed to delete task");
    }
  };

  const [editTask, setEditTask] = useState(null);

  const startEdit = (task) => {
    setEditId(task.id);
    setEditText(task.title);
    setEditTask({ ...task });
  };

  const saveEdit = async () => {
    setEditTitleError("");
    if (!editText.trim()) {
      setEditTitleError("Title must not be empty");
      return;
    }
    setError("");
    try {
      const updatedTask = { ...editTask, title: editText };
      await axios.put(`${API_URL}/${editId}`, updatedTask);
      setEditId(null);
      setEditText("");
      setEditTask(null);
      fetchTasks();
    } catch (err) {
      setError(err.message || "Failed to update task");
    }
  };

  return (
    <div style={{ maxWidth: 600, margin: "40px auto", fontFamily: "sans-serif" }}>
      <h1>Task Manager</h1>
      {error && <div style={{ color: "red", marginBottom: 16 }}>{error}</div>}
      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        <div style={{ display: "flex", gap: 8 }}>
          <input
            value={newTask}
            onChange={e => setNewTask(e.target.value)}
            placeholder="Add new task"
            style={{ flex: 1, padding: 8 }}
          />
          <button onClick={addTask}>Add</button>
        </div>
        {addTitleError && <div style={{ color: "red", fontSize: 13 }}>{addTitleError}</div>}
      </div>
      {loading ? (
        <div style={{ marginTop: 24 }}>Loading...</div>
      ) : (
        <ul style={{ listStyle: "none", padding: 0, marginTop: 24 }}>
          {tasks.map(task => (
            <li key={task.id} style={{ display: "flex", alignItems: "center", marginBottom: 12 }}>
              {editId === task.id ? (
                <>
                  <div style={{ display: "flex", flexDirection: "column", flex: 1 }}>
                    <input
                      value={editText}
                      onChange={e => setEditText(e.target.value)}
                      style={{ padding: 8 }}
                    />
                    {editTitleError && <div style={{ color: "red", fontSize: 13 }}>{editTitleError}</div>}
                  </div>
                  <button onClick={saveEdit} style={{ marginLeft: 8 }}>Save</button>
                  <button onClick={() => { setEditId(null); setEditTitleError(""); }} style={{ marginLeft: 4 }}>Cancel</button>
                </>
              ) : (
                <>
                  <span style={{ flex: 1 }}>{task.title}</span>
                  <button onClick={() => startEdit(task)} style={{ marginLeft: 8 }}>Edit</button>
                  <button onClick={() => deleteTask(task.id)} style={{ marginLeft: 4 }}>Delete</button>
                </>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default App;
