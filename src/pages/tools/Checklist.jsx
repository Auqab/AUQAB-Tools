import { useState, useEffect } from "react";
import SEO from "../../components/SEO";
import { showToast } from "../../components/Toast";
import { trackEvent } from "../../utils/analytics";

function Checklist() {
  const [tasks, setTasks] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("checklist") || "[]");
    } catch {
      return [];
    }
  });
  const [newTask, setNewTask] = useState("");

  useEffect(() => {
    localStorage.setItem("checklist", JSON.stringify(tasks));
  }, [tasks]);

  const add = () => {
    if (!newTask.trim()) return;
    setTasks([...tasks, { id: Date.now(), text: newTask, done: false }]);
    setNewTask("");
    showToast("Task added!");
    trackEvent("checklist_add", { tool: "checklist" });
  };

  const toggle = (id) => setTasks(tasks.map((t) => (t.id === id ? { ...t, done: !t.done } : t)));

  const remove = (id) => {
    setTasks(tasks.filter((t) => t.id !== id));
    showToast("Task removed");
  };

  const clearDone = () => {
    setTasks(tasks.filter((t) => !t.done));
    showToast("Completed tasks cleared");
  };

  return (
    <>
      <SEO
        title="Checklist & To-Do - AUQAB Tools"
        description="A simple task list saved in your browser."
      />
      <section className="tool-page">
        <div className="password-card">
          <h1>Checklist</h1>
          <p className="tool-description">Add, complete, and manage your tasks.</p>

          <div style={{ display: "flex", gap: 10, marginBottom: 20 }}>
            <input
              value={newTask}
              onChange={(e) => setNewTask(e.target.value)}
              placeholder="New task..."
              className="url-input"
              onKeyDown={(e) => e.key === "Enter" && add()}
            />
            <button className="generate" style={{ width: "auto" }} onClick={add}>
              Add
            </button>
          </div>

          {tasks.length > 0 ? (
            <ul style={{ listStyle: "none", padding: 0 }}>
              {tasks.map((t) => (
                <li key={t.id} className="uuid-row" style={{ justifyContent: "space-between" }}>
                  <span
                    style={{
                      textDecoration: t.done ? "line-through" : "none",
                      cursor: "pointer",
                      flex: 1,
                      textAlign: "left",
                    }}
                    onClick={() => toggle(t.id)}
                  >
                    {t.text}
                  </span>
                  <button className="copy-btn-mini" onClick={() => remove(t.id)}>
                    Delete
                  </button>
                </li>
              ))}
            </ul>
          ) : (
            <p style={{ color: "#94a3b8" }}>No tasks yet. Add your first task.</p>
          )}

          {tasks.some((t) => t.done) && (
            <button className="clear-btn" style={{ marginTop: 15 }} onClick={clearDone}>
              Clear Completed
            </button>
          )}
        </div>
      </section>
    </>
  );
}

export default Checklist;
