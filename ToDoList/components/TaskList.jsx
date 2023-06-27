/* eslint-disable react/prop-types */

    function TaskList ({tasks, setTasks, editTaskTitle, setEditTaskTitle, editTaskId, setEditTaskId}) {
        
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
              // editTaskId === task.id ? show task currently being edited : 
            })}
        
          </ul>
          )
    }

    export default TaskList;