import '../App.css'

function TaskForm({ title, setTitle, handleSubmit }){
    return(
        <form className="task-form" onSubmit={handleSubmit}>
            <input value={title}
                   type="text"
                   id="text-field"
                   placeholder="Type your task..."
                   onChange={(e) => setTitle(e.target.value)}
            />
            <button type="submit" id="add-btn">+ Add</button>
        </form>
    );
}

export default TaskForm