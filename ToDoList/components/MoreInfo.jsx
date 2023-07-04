/* eslint-disable react/prop-types */
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import './MoreInfo.css'

export default function MoreInfo({}) {
  const { taskId } = useParams();
  const[task, setTask] = useState(null);


  useEffect(() => {
    async function fetchTasks() {
      try {
        const response = await fetch(`http://localhost:3000/tasks/${taskId}`);
        const taskRet = await response.json();
        setTask(taskRet);
      } catch (error) {
        console.error("Error fetching tasks:", error);
      }
    }

    fetchTasks();
  }, [taskId]);

  if (!task) {
    return <div>Task not found</div>;
  }



  return (
    <div>
      <h2>{task.title}</h2>
      <p>{task.description}</p>
    </div>
  );
}