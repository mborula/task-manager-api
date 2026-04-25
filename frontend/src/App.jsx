import { useEffect, useState } from 'react';
import './App.css'

function App() {

  const [title, setTitle] = useState("");
  const [tasks, setTasks] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();

  };

  const fetchTasks = async () => {
    const response = await fetch("http://localhost:8080/tasks");
    const data = await response.json();
    setTasks(data);
  };

  useEffect(() => {
    fetchTasks();
  }, []);




  return (
    <>
     <h1 className="title"> Task Manager API</h1>
      <div className="main-container">
          <form className="task-form" onSubmit={handleSubmit}>
            <input value={title}
                   type="text"
                   id="text-field"
                   placeholder="Type your task..."
                   onChange={(e) => setTitle(e.target.value)}
            />
            <button type="submit" id="add-btn">+ Add</button>
          </form>
        <ul className="tasks-list">
          {tasks.map((task) => (
              <li className ="task-entry" key={task.id}>
                {task.title}
              </li>
          ))}
        </ul>
      </div>
    </>
  )
}

export default App
