import React, { useState } from "react";
import { data } from "./data";
import "./App.css";

function App() {
  const [todos, setTodos] = useState(data);
  const [addTodo, setAddTodo] = useState("");
  const [items, setItems] = useState([]);

  const removeItem = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const removeItems = (id) => {
    setItems(items.filter((todo) => todo.id !== id));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (addTodo) {
      const item = { id: new Date().getTime().toString(), addTodo };
      setItems((items) => {
        return [...items, item];
      });
      setAddTodo("");
    } else {
      console.log("empty");
    }
  };

  const styling = {
    color: "green",
    textDecoration: "line-through",
  };

  return (
    <div>
      <h2>My Todo list</h2>
      <form onSubmit={handleSubmit}>
        <ul>
          {todos.map((todo) => {
            const { id, item } = todo;
            return (
              <div key={id}>
                <label htmlFor={id}>{item}: </label>
                <input type="checkbox" name={item} id={id} />
                <button type="button" onClick={() => removeItem(id)}>
                  Remove
                </button>
              </div>
            );
          })}
        </ul>

        <label htmlFor="add">Place temporary todo item: </label>
        <input
          type="text"
          name="addTodo"
          id="add"
          placeholder="new item"
          value={addTodo}
          onChange={(e) => setAddTodo(e.target.value)}
        />
        <button type="submit">Add item</button>
      </form>
      <ul>
        {items.map((item) => {
          const { id, addTodo } = item;
          return (
            <div key={id}>
              <label htmlFor={id}>{addTodo}: </label>
              <input type="checkbox" name={addTodo} id={id} />
              <button type="button" onClick={() => removeItems(id)}>
                Remove
              </button>
            </div>
          );
        })}
      </ul>
    </div>
  );
}

export default App;
