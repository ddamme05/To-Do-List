import React, { useState } from "react";
import "./App.css";

function TaskList() {
  const [tasks, setTasks] = useState([
    {
      id: 1,
      title: "Code",
      completed: false,
      dueDate: "6/30/2023",
      createdDate: "6/25/2023",
    },
    {
      id: 2,
      title: "Don't stop",
      completed: false,
      dueDate: "7/05/2023",
      createdDate: "6/26/2023",
    },
  ]);
  //To track task title
  const [taskTitle, setTaskTitle] = useState("");
  //To track current task being edited, set back to null to indicate no task is currently being edited after its done.
  const [editTaskId, setEditTaskId] = useState(null);
  //To track what we're setting the existing task title to be
  const [editTaskTitle, setEditTaskTitle] = useState("");

  function handleTaskSubmit(event) {
    event.preventDefault();

    if (taskTitle.trim() !== "") {
      const newTask = {
        id: tasks.length + 1,
        title: taskTitle,
        completed: false,
        createdDate: new Date().toLocaleDateString(),
        dueDate: new Date(
          Date.now() + 7 * 24 * 60 * 60 * 1000
        ).toLocaleDateString(),
        showMoreInfo: false,
      };

      setTasks([...tasks, newTask]);
      setTaskTitle("");
    }
  }

  function removeTask(taskId) {
    const updatedTasks = tasks.filter((task) => task.id !== taskId);
    setTasks(updatedTasks);
  }

  function handleEditClick(taskId) {
    const task = tasks.find((task) => task.id === taskId);
    setEditTaskId(taskId);
    setEditTaskTitle(task.title);
  }

  function handleSaveClick(taskId) {
    const updatedTasks = tasks.map((task) => {
      if (task.id === taskId) {
        return {
          ...task,
          title: editTaskTitle,
        };
      }
      return task;
    });
    setTasks(updatedTasks);
    setEditTaskId(null);
    setEditTaskTitle("");
  }

  function handleCompleteClick(taskId) {
    const updatedTasks = tasks.map((task) => {
      if (task.id === taskId) {
        return {
          ...task,
          //Change false to true
          completed: !task.completed,
        };
      }
      return task;
    });
    setTasks(updatedTasks);
  }

  function toggleMoreInfo(taskId) {
    const updatedTasks = tasks.map((task) => {
      if (task.id === taskId) {
        return {
          ...task,
          //Change false to true, triggers box enlargement
          showMoreInfo: !task.showMoreInfo,
        };
      }
      return task;
    });
    setTasks(updatedTasks);
  }

  return (
    <div className="container">
      <h1>Task List</h1>
      <div className="task-list-container">
        <ul>
          {tasks.map((task) => {
            if (editTaskId === task.id) {
              return (
                <li key={task.id}>
                  <div>
                    <input
                      type="text"
                      value={editTaskTitle}
                      onChange={(event) => setEditTaskTitle(event.target.value)}
                    />
                    <button onClick={() => handleSaveClick(task.id)}>
                      Save
                    </button>
                  </div>
                </li>
              );
            } else {
              return (
                <li key={task.id}>
                  <div>
                    <strong>Title:</strong> {task.title}{" "}
                    {task.completed ? "(Completed)" : ""}
                    <br />
                    {task.showMoreInfo ? (
                      <div>
                        <strong>Due Date:</strong> {task.dueDate} <br />
                        <strong>Created Date:</strong> {task.createdDate} <br />
                      </div>
                    ) : null}
                    <button onClick={() => handleEditClick(task.id)}>
                      Edit
                    </button>
                    <button onClick={() => handleCompleteClick(task.id)}>
                      {/* If completed true, mark complete, else mark incomplete. */}
                      {task.completed ? "Mark Incomplete" : "Mark Complete"}
                    </button>
                    <button onClick={() => removeTask(task.id)}>
                      Remove Task
                    </button>
                    <button onClick={() => toggleMoreInfo(task.id)}>
                      {task.showMoreInfo ? "Less Info" : "More Info"}
                    </button>
                  </div>
                </li>
              );
            }
          })}
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
