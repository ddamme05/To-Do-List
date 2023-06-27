import  { useState } from "react";
import "./App.css";
import TaskList from "../components/TaskList";

function Tasks() {
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
