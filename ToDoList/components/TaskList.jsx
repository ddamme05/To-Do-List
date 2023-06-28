/* eslint-disable react/prop-types */

function TaskList({ tasks, setTasks, editTaskTitle, setEditTaskTitle, editTaskId, setEditTaskId }) {

  async function removeTask(taskId) {
    try {
      const response = await fetch(`http://localhost:3000/tasks/${taskId}`, {
        method: "DELETE",
      });
  
      if (response.ok) {
        const updatedTasks = tasks.filter((task) => task.id !== taskId);
        setTasks(updatedTasks);
  
        const updatedTasksWithAutoIncrementedId = updatedTasks.map((task, index) => ({
          ...task,
          id: index + 1,
        }));
  
        setTasks(updatedTasksWithAutoIncrementedId);
      } else {
        console.error("Error removing task:", response.status);
      }
    } catch (error) {
      console.error("Error removing task:", error);
    }
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
          completed: !task.completed,
        };
      }
      return task;
    });
    setTasks(updatedTasks);
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
