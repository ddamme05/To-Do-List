/* eslint-disable react/prop-types */

function TaskList({ tasks, setTasks, editTaskTitle, setEditTaskTitle, editTaskId, setEditTaskId }) {
  async function removeTask(taskId) {
    try {
      //Fetches from something like.. localhost:3000/tasks/2 for the task with the id 2
      const response = await fetch(`http://localhost:3000/tasks/${taskId}`, {
        method: "DELETE",
      });

      if (response.ok) {
        const updatedTasks = tasks.filter((task) => task.id !== taskId);
        setTasks(updatedTasks);
      } else {
        console.error("Error removing task:", response.status);
      }
    } catch (error) {
      console.error("Error removing task:", error);
    }
  }

  async function updateTask(taskId, updatedTask) {
    try {
      const response = await fetch(`http://localhost:3000/tasks/${taskId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedTask),
      });

      if (response.ok) {
        //For task id that matches this, it replaces it with updatedTask to update it and keeps everything else the same hence : task
        const updatedTasks = tasks.map((task) => (task.id === taskId ? updatedTask : task));
        setTasks(updatedTasks);
      } else {
        console.error("Error updating task:", response.status);
      }
    } catch (error) {
      console.error("Error updating task:", error);
    }
  }

  function handleEditClick(taskId) {
    const task = tasks.find((task) => task.id === taskId);
    setEditTaskId(taskId);
    setEditTaskTitle(task.title);
  }

  async function handleSaveClick(taskId) {
    const updatedTasks = tasks.map((task) => {
      if (task.id === taskId) {
        return {
          ...task,
          title: editTaskTitle,
        };
      }
      return task;
    });
    updateTask(taskId, updatedTasks.find((task) => task.id === taskId));
    setEditTaskId(null);
    setEditTaskTitle("");
  }

  async function handleCompleteClick(taskId) {
    const updatedTasks = tasks.map((task) => {
      if (task.id === taskId) {
        return {
          //Creates a new task object with its properties and changes completed field to the opposite of its default which is true.
          ...task,
          completed: !task.completed,
        };
      }
      return task;
    });
    updateTask(taskId, updatedTasks.find((task) => task.id === taskId));
  }

  return (
    <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>Title</th>
          <th>Created Date</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {tasks.map((task) => {
          if (editTaskId === task.id) {
            return (
              <tr key={task.id}>
                <td>{task.id}</td>
                <td>
                  <input
                    type="text"
                    value={editTaskTitle}
                    onChange={(event) => setEditTaskTitle(event.target.value)}
                  />
                </td>
                <td>{task.createdDate}</td>
                <td>
                  <div className="button-group">
                    <button onClick={() => handleSaveClick(task.id)}>Save</button>
                    <button onClick={() => handleEditClick(task.id)}>Edit</button>
                    <button onClick={() => handleCompleteClick(task.id)}>
                      {task.completed ? "Mark Incomplete" : "Mark Complete"}
                    </button>
                    <button onClick={() => removeTask(task.id)}>Remove Task</button>
                  </div>
                </td>
              </tr>
            );
          } else {
            return (
              <tr key={task.id}>
                <td>{task.id}</td>
                <td>{task.title}</td>
                <td>{task.createdDate}</td>
                <td>
                  <div className="button-group">
                    <button onClick={() => handleEditClick(task.id)}>Edit</button>
                    <button onClick={() => handleCompleteClick(task.id)}>
                      {task.completed ? "Mark Incomplete" : "Mark Complete"}
                    </button>
                    <button onClick={() => removeTask(task.id)}>Remove Task</button>
                  </div>
                </td>
              </tr>
            );
          }
        })}
      </tbody>
    </table>
  );
}

export default TaskList;
