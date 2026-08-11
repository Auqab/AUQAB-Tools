import { useState, useEffect } from "react";
import SEO from "../../components/SEO";
import { trackEvent } from "../../utils/analytics";

function Checklist() {
  const [tasks, setTasks] = useState(() => JSON.parse(localStorage.getItem("checklist") || "[]"));
  const [newTask, setNewTask] = useState("");

  useEffect(() => localStorage.setItem("checklist", JSON.stringify(tasks)), [tasks]);

  const add = () => {
    if (!newTask.trim()) return;
    setTasks([...tasks, { id: Date.now(), text: newTask, done: false }]);
    setNewTask("");
    trackEvent("checklist_add", { tool: "checklist" });
  };

  const toggle = (id) => setTasks(tasks.map((t) => (t.id === id ? { ...t, done: !t.done } : t)));
  const remove = (id) => setTasks(tasks.filter((t) => t.id !== id));
  const clearDone = () => setTasks(tasks.filter((t) => !t.done));

  return (
    <>
      <SEO title="Checklist & To-Do - AUQAB Tools" description="A simple task list saved in your browser." />
      <section className="tool-page">
        <div className="password-card">
          <h1>✅ Checklist</h1>
          <div style={{ display: "flex", gap: 10, marginBottom: 20 }}>
            <input value={newTask} onChange={(e) => setNewTask(e.target.value)} placeholder="New task..." className="url-input" />
            <button className="generate" onClick={add}>Add</button>
          </div>
          <ul style={{ listStyle: "none", padding: 0 }}>
            {tasks.map((t) => (
              <li key={t.id} className="uuid-row" style={{ justifyContent: "space-between" }}>
                <span style={{ textDecoration: t.done ? "line-through" : "none", cursor: "pointer" }} onClick={() => toggle(t.id)}>
                  {t.text}
                </span>
                <button className="copy-btn-mini" onClick={() => remove(t.id)}>🗑️</button>
              </li>
            ))}
          </ul>
          {tasks.length > 0 && <button className="clear-btn" onClick={clearDone}>Clear Done</button>}
        </div>
      </section>
    </>
  );
}

export default Checklist;
