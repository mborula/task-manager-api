import "../App.css"

function TaskItem({task, startEdit, deleteTask,toggleCompleted})
{
    return(
        <li className="task-entry">
                <span
                    className={`task-text ${task.completed ? "done" : ""}`}
                    onClick={() => toggleCompleted(task)}
                >
                  {task.title}
                </span>
            <div className="task-buttons">
                <button className="task-button" id="edit-btn" onClick={() => startEdit(task)}>
                    <svg viewBox="0 0 24 24" width="20" height="20">
                        <path fill="currentColor"
                              d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zm18-11.5a1 1 0 0 0 0-1.41l-2.34-2.34a1 1 0 0 0-1.41 0l-1.83 1.83 3.75 3.75L21 5.75z"/>
                    </svg>
                </button>
                <button className="task-button" id="delete-btn" onClick={() => deleteTask(task)}>
                    <svg viewBox="0 0 24 24" width="20" height="20">
                        <path fill="currentColor" d="M6 7h12l-1 14H7L6 7zm3-3h6l1 2H8l1-2z"/>
                    </svg>
                </button>
            </div>
        </li>
    )
}

export default TaskItem;