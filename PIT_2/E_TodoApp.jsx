import React, { useState, useEffect } from "react";
import "./styles.css";

const TodoApp = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");
  const [filter, setFilter] = useState("all");
  const [darkMode, setDarkMode] = useState(
    localStorage.getItem("darkMode") === "true"
  );

  useEffect(() => {
    localStorage.setItem("darkMode", darkMode);
    document.body.className = darkMode ? "dark" : "light";
  }, [darkMode]);

  const addTask = () => {
    if (newTask.trim() !== "") {
      setTasks([...tasks, { text: newTask, completed: false, editing: false }]);
      setNewTask("");
    }
  };

  const toggleComplete = (index) => {
    setTasks(
      tasks.map((task, i) =>
        i === index ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const editTask = (index) => {
    setTasks(
      tasks.map((task, i) =>
        i === index ? { ...task, editing: !task.editing } : task
      )
    );
  };

  const saveTask = (index, newText) => {
    setTasks(
      tasks.map((task, i) =>
        i === index ? { ...task, text: newText, editing: false } : task
      )
    );
  };

  const filteredTasks = tasks.filter((task) => {
    if (filter === "completed") return task.completed;
    if (filter === "pending") return !task.completed;
    return true;
  });

  return (
    <div className={`container ${darkMode ? "dark-mode" : "light-mode"}`}>
      <h1>Enhanced To-Do List</h1>
      <button className="toggle-btn" onClick={() => setDarkMode(!darkMode)}>
        {darkMode ? "☀️ Light Mode" : "🌙 Dark Mode"}
      </button>
      <div className="input-container">
        <input
          type="text"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          placeholder="Add a new task"
        />
        <button onClick={addTask}>Add</button>
      </div>
      <div className="filter-container">
        <button onClick={() => setFilter("all")}>All</button>
        <button onClick={() => setFilter("completed")}>Completed</button>
        <button onClick={() => setFilter("pending")}>Pending</button>
      </div>
      <ul>
        {filteredTasks.map((task, index) => (
          <li key={index} className={task.completed ? "completed" : ""}>
            <input
              type="checkbox"
              checked={task.completed}
              onChange={() => toggleComplete(index)}
            />
            {task.editing ? (
              <input
                type="text"
                defaultValue={task.text}
                onBlur={(e) => saveTask(index, e.target.value)}
                autoFocus
              />
            ) : (
              <span>{task.text}</span>
            )}
            <button onClick={() => editTask(index)}>{task.editing ? "Save" : "Edit"}</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoApp;
