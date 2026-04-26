import { useEffect, useState } from 'react';
import TaskForm from "./components/TaskForm.jsx";
import TaskEdit from "./components/TaskEdit.jsx";
import './App.css'
import TaskItem from "./components/TaskItem.jsx";


function App() {

  const [title, setTitle] = useState("");
  const [tasks, setTasks] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [editValue, setEditValue] = useState("");

  const fetchTasks = async () => {
    const response = await fetch("http://localhost:8080/tasks");
    const data = await response.json();
    setTasks(data);
  };
  useEffect(() => {
    fetchTasks();
  }, []);

  const addTask = async (e) => {
    e.preventDefault();
    await fetch("http://localhost:8080/tasks", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        title: title
      })
    });

    setTitle("");
    fetchTasks();

  };

  const deleteTask = async (id) => {
    await fetch(`http://localhost:8080/tasks/${id}`, {
      method: "DELETE"
    });

    fetchTasks();
  };

  const startEdit = (task) => {
    setEditingId(task.id);
    setEditValue(task.title);
  };

  const updateTask = async (id) => {
    await fetch(`http://localhost:8080/tasks/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ title: editValue })
    });

    setEditingId(null);
    fetchTasks();
  };


  return (
    <>
     <h1 className="title"> Task Manager API</h1>
      <div className="main-container">
        <TaskForm title={title} setTitle={setTitle} handleSubmit={addTask} />
        <ul className="tasks-list">
          {tasks.map((task) => (
              editingId === task.id ? (
                  <TaskEdit
                      key={task.id}
                      task={task}
                      editValue={editValue}
                      setEditValue={setEditValue}
                      updateTask={updateTask}
                      cancelEdit={() => setEditingId(null)}
                  />
              ) : (
                  <TaskItem
                      key={task.id}
                      task={task}
                      startEdit={startEdit}
                      deleteTask={deleteTask}
                  />
              )
          ))}
        </ul>
      </div>
    </>
  )
}

export default App
