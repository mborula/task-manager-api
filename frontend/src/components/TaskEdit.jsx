import "../App.css"
import { useEffect, useRef } from "react";

function TaskEdit({ task, editValue, setEditValue, updateTask, cancelEdit }) {

    const ref = useRef(null);
    useEffect(() => {
        const handleClickOutside = (e) => {
            if (ref.current && !ref.current.contains(e.target)) {
                cancelEdit();
            }
        };

        document.addEventListener("mousedown", handleClickOutside);

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [cancelEdit]);

    return (


        <li ref={ref}  className="task-entry" id="task-entry-edit">

            <input
                className="task-text"
                value={editValue}
                onChange={(e) => setEditValue(e.target.value)}
                autoFocus
            />
            <div className="task-buttons">
                <button
                    className="task-button"
                    onClick={() => updateTask(task.id)}
                >
                    &#x2713;
                </button>
                <button
                    className="task-button"
                    onClick={cancelEdit}
                >
                    &#x2717;
                </button>
            </div>

        </li>
    );
}

export default TaskEdit;