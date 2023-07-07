import { useState, useEffect } from "react";
import "./App.css";
import TaskList from "../components/TaskList";
import Modal from "../components/Modal";

export default function Tasks() {
  const [tasks, setTasks] = useState([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [taskTitle, setTaskTitle] = useState("");
  const [taskDescription, setTaskDescription] = useState("");
  const [editTaskId, setEditTaskId] = useState(null);
  const [editTaskTitle, setEditTaskTitle] = useState("");
  const [editTaskDescription, setEditTaskDescription] = useState("");

  useEffect(() => {
    async function fetchTasks() {
      try {
        const response = await fetch("http://localhost:3000/tasks");
        const tasks = await response.json();
        setTasks(tasks);
      } catch (error) {
        console.error("Error fetching tasks:", error);
      }
    }

    fetchTasks();
  }, []);

  async function handleTaskSubmit(event) {
    event.preventDefault();

    if (taskTitle.trim() !== "") {
      const newTask = {
        title: taskTitle,
        description: taskDescription,
        completed: false,
        createdDate: new Date().toLocaleDateString(),
        dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toLocaleDateString(),
      };

      try {
        const response = await fetch("http://localhost:3000/tasks", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newTask),
        });

        if (response.ok) {
          const savedTask = await response.json();
          setTasks([...tasks, savedTask]);
          setTaskTitle("");
          setTaskDescription("");
          setShowAddModal(false);
        } else {
          console.error("Error saving task:", response.status);
        }
      } catch (error) {
        console.error("Error saving task:", error);
      }
    }
  }

  return (
    <div className="container">
      <h1>Task List</h1>
      <div className="task-list-container">
        <TaskList
          tasks={tasks}
          taskTitle={taskTitle}
          taskDescription={taskDescription}
          editTaskId={editTaskId}
          editTaskTitle={editTaskTitle}
          editTaskDescription={editTaskDescription}
          setTasks={setTasks}
          setEditTaskId={setEditTaskId}
          setEditTaskTitle={setEditTaskTitle}
          setEditTaskDescription={setEditTaskDescription}
        />
        <button type="button" onClick={() => setShowAddModal(true)}>Add Task</button>
        <Modal isVisible={showAddModal} hideModal={() => setShowAddModal(false)}>
          <h2>Add Task</h2>
          <form onSubmit={handleTaskSubmit}>
            <label>Title:</label>
            <input
              type="text"
              value={taskTitle}
              onChange={(event) => setTaskTitle(event.target.value)}
            />
            <label>Description:</label>
            <textarea
              value={taskDescription}
              onChange={(event) => setTaskDescription(event.target.value)}
            ></textarea>
            <button type="submit">Save</button>
          </form>
        </Modal>
      </div>
    </div>
  );
}
