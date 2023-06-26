import React, { useState } from "react";
import "./App.css";

function TaskList() {
  const [tasks, setTasks] = useState([
    {
      id: 1,
      title: "Code",
      createdAt: new Date(),
      dueDate: new Date(new Date().getTime() + 7 * 24 * 60 * 60 * 1000),
    },
    {
      id: 2,
      title: "Don't stop",
      createdAt: new Date(),
      dueDate: new Date(new Date().getTime() + 7 * 24 * 60 * 60 * 1000),
    },
  ]);
  const [taskTitle, setTaskTitle] = useState("");

  function handleTaskSubmit(event) {
    event.preventDefault();

    if (taskTitle !== "") {
      const newTask = {
        id: tasks.length + 1,
        title: taskTitle,
        createdAt: new Date(),
        dueDate: new Date(new Date().getTime() + 7 * 24 * 60 * 60 * 1000),
      };

      setTasks([...tasks, newTask]);
      setTaskTitle("");
    }
  }

  function removeTask(taskId) {
    const updatedTasks = tasks.filter((task) => task.id !== taskId);
    setTasks(updatedTasks);
  }

  return (
    <div className="container">
      <h1>Task List</h1>
      <div className="task-list-container">
        <ul>
          {tasks.map((task) => (
            <li key={task.id}>
              <strong>Title:</strong> {task.title} <br />
              <strong>Created:</strong> {task.createdAt.toString()} <br />
              <strong>Due:</strong> {task.dueDate.toString()} <br />
              <button onClick={() => removeTask(task.id)}>Remove Task</button>
            </li>
          ))}
        </ul>
        <form onSubmit={handleTaskSubmit}>
          <input
            type="text"
            value={taskTitle}
            onChange={(event) => setTaskTitle(event.target.value)}
            placeholder="Enter task title"
          />
          <button type="submit">Add Task</button>
        </form>
      </div>
    </div>
  );
}

export default TaskList;
