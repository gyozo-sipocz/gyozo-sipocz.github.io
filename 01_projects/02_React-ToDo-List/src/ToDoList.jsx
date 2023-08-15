import { ToDoItem } from "./ToDoItem"

export function ToDoList({ todos, toggleTodo, deleteTodo }) {
    return (
        <ul className="list">
        {todos.length === 0 && <img src="https://wallpapers.com/images/high/panda-laptop-vaa2jdl5x9vzdgck.webp" alt="sleeping panda" />}
        {todos.map(todo => {
          return (
            <ToDoItem 
                id={todo.id} 
                completed={todo.completed} 
                title={todo.title} 
                key={todo.id}
                toggleTodo={toggleTodo}
                deleteTodo={deleteTodo}
            />
          )
        })}
      </ul>
    )
}