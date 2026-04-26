import { useEffect, useState } from 'react';
import TaskForm from "./components/TaskForm.jsx";
import './App.css'
import TaskItem from "./components/TaskItem.jsx";


function App() {

  const [title, setTitle] = useState("");
  const [tasks, setTasks] = useState([]);


  const handleSubmit = async (e) => {
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

  const fetchTasks = async () => {
    const response = await fetch("http://localhost:8080/tasks");
    const data = await response.json();
    setTasks(data);
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const deleteTask = async (id) => {
    await fetch(`http://localhost:8080/tasks/${id}`, {
      method: "DELETE"
    });

    fetchTasks();
  };




  return (
    <>
     <h1 className="title"> Task Manager API</h1>
      <div className="main-container">
        <TaskForm title={title} setTitle={setTitle} handleSubmit={handleSubmit} />
        <ul className="tasks-list">
          {tasks.map((task) => (
              <TaskItem
                  key={task.id}
                  task={task}
                  deleteTask={deleteTask}
              />
          ))}
        </ul>
      </div>
    </>
  )
}

export default App
