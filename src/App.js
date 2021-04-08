import React, { useState, useEffect } from "react";
import { data } from "./data";
import { MdDeleteForever } from "react-icons/md";
import "./App.css";

function App() {
  const [todos, setTodos] = useState(data);
  const [addTodo, setAddTodo] = useState("");
  const saveditems = JSON.parse(localStorage.getItem("items"));
  const [items, setItems] = useState(saveditems || []);

  const removeItem = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const removeItems = (id) => {
    setItems(items.filter((todo) => todo.id !== id));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (addTodo > "                                     ") {
      const item = { id: new Date().getTime().toString(), addTodo };
      setItems((items) => {
        return [...items, item];
      });
      setAddTodo("");
    } else {
      console.log("empty");
    }
  };

  useEffect(() => {
    const items = JSON.parse(localStorage.getItem("items"));
    if (items) {
      setItems(items);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("items", JSON.stringify(items));
  }, [items]);

  return (
    <div className="container">
      <h1
        style={{ textAlign: "center", color: "white", fontFamily: "cursive" }}
      >
        My Todo List
      </h1>
      <form className="form" onSubmit={handleSubmit}>
        <ul>
          {todos.map((todo) => {
            const { id, item } = todo;
            return (
              <div key={id}>
                <div className={"checkbox"}></div>
                <label htmlFor={id}>{item}: </label>{" "}
                <input type="checkbox" name={item} id={id} />{" "}
                <button type="button" onClick={() => removeItem(id)}>
                  <MdDeleteForever />
                </button>
                <hr />
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
        />{" "}
        <button className="addBut" type="submit">
          Add item
        </button>
        <ul>
          {items.map((item) => {
            const { id, addTodo } = item;
            return (
              <div className="lists" key={id}>
                <label htmlFor={id}>{addTodo}: </label>{" "}
                <input type="checkbox" name={addTodo} id={id} />{" "}
                <button type="button" onClick={() => removeItems(id)}>
                  <MdDeleteForever />
                </button>
                <hr />
              </div>
            );
          })}
        </ul>{" "}
      </form>
    </div>
  );
}
export default App;
