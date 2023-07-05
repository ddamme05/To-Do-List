/* eslint-disable react/prop-types */
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import './MoreInfo.css'

export default function MoreInfo({}) {
  const { taskId } = useParams();
  const [task, setTask] = useState(null);

  useEffect(() => {
    async function fetchTask() {
      try {
        const response = await fetch(`http://localhost:3000/tasks/${taskId}`);
        const taskData = await response.json();
        setTask(taskData);
      } catch (error) {
        console.error("Error fetching task:", error);
      }
    }

    fetchTask();
  }, [taskId]);

  if (!task) {
    return <div>Task not found</div>;
  }

  return (
    <div className="more-info-container">
      <h2 className="task-title">{task.title}</h2>
      <table className="task-details">
        <thead>
          <tr>
            <th>Created Date</th>
            <th>Due Date</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{task.createdDate}</td>
            <td>{task.dueDate}</td>
            <td>{task.completed ? "Completed" : "Pending"}</td>
          </tr>
        </tbody>
      </table>
      <p className="task-desc">{task.description}</p>
    </div>
  );
}
