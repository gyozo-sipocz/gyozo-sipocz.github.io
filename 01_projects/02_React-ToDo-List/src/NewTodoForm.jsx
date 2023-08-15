import { useState } from "react"

export function NewTodoForm({ onSubmit }) {
    const [newItem, setNewItem] = useState("")
    
    function handleSubmit(e) {
        e.preventDefault()
        if (newItem === "") return

        onSubmit(newItem)
        
        setNewItem("")
      }

    return (
    <form onSubmit={handleSubmit} className="new-item-form">
        <div className="form-row">
          <label 
            htmlFor="item" 
            className="form-row-item"
          >
              Ezt csinálja ma egy Panda
          </label>
          <p className="for-row-item-text">Adj hozzá tennivalókat</p>
          <input 
            value={newItem} 
            onChange={e => setNewItem(e.target.value)} 
            type="text" 
            id="item" />
        </div>
        <button className="btn">Hozzáadom</button>
      </form>
    )
}