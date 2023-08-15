export function ToDoItem({ completed, id, title, toggleTodo, deleteTodo }) {
    return(
        <li>
            <label>
                <input 
                    type="checkbox" 
                    checked={completed} 
                    onChange={e => toggleTodo(id, e.target.checked)}
                />
                {title}
                <button 
                    // always pass a function tha calls "delete",
                    // without the arrow function it will automatically
                    // delete the entered input before rendering
                    onClick={() => deleteTodo(id)} 
                    className="btn btn-danger"
                >
                Delete
                </button>
            </label>
            </li>
    )
}