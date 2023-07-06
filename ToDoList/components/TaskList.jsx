/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";
import { useState } from "react";
import Modal from "./Modal";

export default function TaskList({
  tasks,
  setTasks,
  editTaskTitle,
  editTaskDescription,
  setEditTaskTitle,
  setEditTaskDescription,
  editTaskId,
  setEditTaskId,
}) {
  const [sortField, setSortField] = useState("createdDate");
  const [sortOrder, setSortOrder] = useState("asc");
  const [showEditModal, setShowEditModal] = useState(false);

  function handleSort(field) {
    if (sortField === field) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortOrder("asc");
    }
  }

  function sortTasks(tasks) {
    return tasks.sort((a, b) => {
      if (sortField === "title") {
        if (sortOrder === "asc") {
          return a.title.localeCompare(b.title);
        } else {
          return b.title.localeCompare(a.title);
        }
      } else if (sortField === "createdDate") {
        const dateA = new Date(a.createdDate);
        const dateB = new Date(b.createdDate);
        if (sortOrder === "asc") {
          return dateA - dateB;
        } else {
          return dateB - dateA;
        }
      }
      return 0;
    });
  }

  async function removeTask(taskId) {
    try {
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
        const updatedTasks = tasks.map((task) =>
          task.id === taskId ? updatedTask : task
        );
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
    setEditTaskDescription(task.description);
    setShowEditModal(true);
  }

  function handleCancelClick() {
    setEditTaskId(null);
    setEditTaskTitle("");
    setEditTaskDescription("");
    setShowEditModal(false);
  }

  async function handleSaveClick(taskId) {
    if (editTaskTitle.length < 1) {
      throw new Error("Cannot have an empty title field!");
    }

    const updatedTasks = tasks.map((task) => {
      if (task.id === taskId) {
        return {
          ...task,
          title: editTaskTitle,
          description:editTaskDescription,
        };
      }
      return task;
    });

    updateTask(
      taskId,
      updatedTasks.find((task) => task.id === taskId)
    );
    setEditTaskId(null);
    setEditTaskTitle("");
    setEditTaskDescription("");
    setShowEditModal(false);
  }

  async function handleCompleteClick(taskId) {
    const updatedTasks = tasks.map((task) => {
      if (task.id === taskId) {
        return {
          ...task,
          completed: !task.completed,
        };
      }
      return task;
    });
    updateTask(
      taskId,
      updatedTasks.find((task) => task.id === taskId)
    );
  }

  return (
    <>
      <table>
        <thead>
          <tr>
            <th onClick={() => handleSort("title")}>Title</th>
            <th onClick={() => handleSort("createdDate")}>Created Date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {sortTasks(tasks).map((task) => {
            const isEditing = editTaskId === task.id;

            return (
              <tr key={task.id}>
                <td>
                  {isEditing ? (
                    <input
                      type="text"
                      value={editTaskTitle}
                      onChange={(event) =>
                        setEditTaskTitle(event.target.value)
                      }
                    />
                  ) : (
                    task.title
                  )}
                </td>
                <td>{task.createdDate}</td>
                <td>
                  <div className="button-group">
                    {!isEditing && (
                      <Link to={`tasks/${task.id}`}>
                        <button>More Info</button>
                      </Link>
                    )}
                    {isEditing ? (
                      <>
                        <button
                          onClick={() => handleSaveClick(task.id)}
                          disabled={editTaskTitle.length < 1}
                        >
                          Save
                        </button>
                        <button onClick={handleCancelClick}>Cancel</button>
                      </>
                    ) : (
                      <>
                        <button
                          onClick={() => handleEditClick(task.id)}
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleCompleteClick(task.id)}
                        >
                          {task.completed
                            ? "Mark Incomplete"
                            : "Mark Complete"}
                        </button>
                        <button onClick={() => removeTask(task.id)}>
                          Remove Task
                        </button>
                      </>
                    )}
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <Modal
        isVisible={showEditModal}
        hideModal={() => setShowEditModal(false)}
      >
        <h2>Edit Task</h2>
        <form onSubmit={() => handleSaveClick(editTaskId)}>
          <label>Title:</label>
          <input
            type="text"
            value={editTaskTitle}
            onChange={(event) => setEditTaskTitle(event.target.value)}
          />
          <label>Description:</label>
          <textarea
            value={editTaskDescription}
            onChange={(event) => setEditTaskDescription(event.target.value)}
          ></textarea>
          <button type="submit">Save</button>
          <button onClick={handleCancelClick}>Cancel</button>
        </form>
      </Modal>
    </>
  );
}
