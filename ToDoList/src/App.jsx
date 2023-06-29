import  { useState, useEffect } from "react";
import "./App.css";
import TaskList from "../components/TaskList";

function Tasks() {
  const [tasks, setTasks] = useState([]);

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
  
  //To track task title
  const [taskTitle, setTaskTitle] = useState("");
  //To track current task being edited, set back to null to indicate no task is currently being edited after its done.
  const [editTaskId, setEditTaskId] = useState(null);
  //To track what we're setting the existing task title to be
  const [editTaskTitle, setEditTaskTitle] = useState("");

  async function handleTaskSubmit(event) {
    event.preventDefault();
  
    if (taskTitle.trim() !== "") {
      const newTask = {
        title: taskTitle,
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
       <TaskList tasks={tasks} taskTitle={taskTitle} editTaskId={editTaskId} editTaskTitle={editTaskTitle} setTasks={setTasks} 
       setEditTaskId={setEditTaskId}
       setEditTaskTitle={setEditTaskTitle}
       />
      
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

export default Tasks;