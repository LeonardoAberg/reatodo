import React, { useState, useEffect } from "react";

function ToDoList() {
  const [items, setItems] = useState([]);
  const [filterText, setFilterText] = useState("");
  const [category, setCategory] = useState("none");
  const categories = ["none", "personal"];
  const local_key = 'items'

  function handleFilterTextChange(e) {
    setFilterText(e.target.value);
  }

  useEffect(() => {
    const storedTodos = JSON.parse(localStorage.getItem(local_key))
    if (storedTodos) setItems(storedTodos)
  }, [])

  useEffect(() => {
    localStorage.setItem(local_key, JSON.stringify(items))
  }, [items])

  function handleAddItem(e) {
    e.preventDefault();
    const newItem = {
      text: e.target.item.value,
      dueDate: e.target.dueDate.value,
      category: e.target.category.value
    };
    setItems([...items, newItem]);
    e.target.item.value = "";
    e.target.dueDate.value = "";
    e.target.category.value = "none";
  }

  function handleRemoveItem(index) {
    setItems(items.filter((item, i) => i !== index));
  }

  function handleClearAll() {
    setItems([]);
  }

  function handleCategoryChange(e) {
    setCategory(e.target.value);
  }

  let filteredItems = items;
  if (category !== "none") {
    filteredItems = items.filter(item => item.category === category);
  }
  filteredItems = filteredItems.filter(item =>
    item.text.toLowerCase().includes(filterText.toLowerCase())
  );

  return (
    <div>
      <form onSubmit={handleAddItem}>
        <input type="text" name="item" placeholder="Add a to-do :-)" />
        <input type="datetime-local" name="dueDate" placeholder="Due date" />
        <select name="category" onChange={handleCategoryChange}>
          {categories.map((cat, index) => (
            <option key={index} value={cat}>
              {cat}
            </option>
          ))}
        </select>
        <button type="submit">Add</button>
      </form>
      <form>
        <input type="text" name="filter" placeholder="Search your to-do's :-)" onChange={handleFilterTextChange}
        />
      </form>
      <button onClick={handleClearAll}>Clear All</button>
      <ul>
        {filteredItems.map((item, index) => (
          <li key={index}>
            {item.text} - Due on: {item.dueDate} - Category: {item.category}
            <button onClick={() => handleRemoveItem(index)}>Remove</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ToDoList;