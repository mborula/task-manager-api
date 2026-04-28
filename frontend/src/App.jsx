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

    const newTask = {
      title: title,
      done: false
    };

    const res = await fetch("http://localhost:8080/tasks", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newTask)
    });

    const savedTask = await res.json();

    setTasks(prev =>
        [...prev, savedTask]
    );

    setTitle("");
  };

  const deleteTask = async (task) => {
    await fetch(`http://localhost:8080/tasks/${task.id}`, {
      method: "DELETE"
    });
    setTasks(prev =>
        prev.filter(t =>
            t.id !== task.id)
    );
  };

  const startEdit = (task) => {
    setEditingId(task.id);
    setEditValue(task.title);
  };

  const updateTask = async (task) => {
    await fetch(`http://localhost:8080/tasks/${task.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ title: editValue })
    });


    setTasks(prev =>
        prev.map(t =>
          t.id === task.id
              ? { ...t, title: editValue }
              : t
      )
    );

    setEditingId(null);
  };

  const toggleCompleted = async (task) => {
    await fetch(`http://localhost:8080/tasks/${task.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        title: task.title,
        completed: !task.completed
      })
    });
    setTasks(prev =>
        prev.map(t =>
            t.id === task.id
                ? { ...t, completed: !t.completed }
                : t
        )
    );

  }


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
                      toggleCompleted={toggleCompleted}
                  />
              )
          ))}
        </ul>
      </div>
    </>
  )
}

export default App
