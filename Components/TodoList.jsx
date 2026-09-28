import { useState } from 'react'
import './TodoList.css'

function TodoList() {
  const [headings, setHeadings] = useState([])
  const [headingInput, setHeadingInput] = useState('')
  const [itemInputs, setItemInputs] = useState({})

  const addHeading = () => {
    if (!headingInput.trim()) return
    setHeadings([...headings, {
      id: Date.now(),
      name: headingInput,
      items: []
    }])
    setHeadingInput('')
  }

  const deleteHeading = (id) => {
    setHeadings(headings.filter(h => h.id !== id))
  }

  const addItem = (headingId) => {
    const text = itemInputs[headingId] || ''
    if (!text.trim()) return
    setHeadings(headings.map(h => {
      if (h.id === headingId) {
        return { ...h, items: [...h.items, { id: Date.now(), text }] }
      }
      return h
    }))
    setItemInputs({ ...itemInputs, [headingId]: '' })
  }

  const deleteItem = (headingId, itemId) => {
    setHeadings(headings.map(h => {
      if (h.id === headingId) {
        return { ...h, items: h.items.filter(i => i.id !== itemId) }
      }
      return h
    }))
  }

  return (
    <div className="page-container">
      <h1 className="main-title">My Todo List</h1>

      <div className="add-heading-area">
        <input
          type="text"
          placeholder="Enter heading"
          value={headingInput}
          onChange={(e) => setHeadingInput(e.target.value)}
          className="heading-input"
        />
        <button onClick={addHeading} className="btn-green">Add Heading</button>
      </div>

      <div className="cards-grid">
        {headings.map(heading => (
          <div key={heading.id} className="todo-card">
            <div className="card-header">
            <h3 className="card-title">{heading.name}</h3>
              <button onClick={() => deleteHeading(heading.id)} className="btn-green btn-small">
                Delete Heading
            </button>
            </div>

            <ul className="items-list">
              {heading.items.map(item => (
                <li key={item.id} className="item-row">
                {item.text}
                <button onClick={() => deleteItem(heading.id, item.id)} className="x-btn">X</button>
                </li>
                 ))}
                </ul>

              <div className="add-item-row">
              <input
                type="text"
                placeholder="Add List"
                value={itemInputs[heading.id] || ''}
                onChange={(e) => setItemInputs({ ...itemInputs, [heading.id]: e.target.value })}
                className="item-input"
              />
              <button onClick={() => addItem(heading.id)} className="btn-green btn-small">Add List</button>
              </div>
              </div>
              ))}
         </div>
    </div>
  )
}

export default TodoList
