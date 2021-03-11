import React from "react";

export default function TodoForm(props) {
  return (
    <div className="TodoForm">
      <form onSubmit={(e) => props.createTodo(e)}>
        <input
          type="text"
          name="title"
          placeholder="Add Your New Todo"
          aria-label="Todo Title"
        />

        <input
          type="submit"
          name="submit"
          value="Submit"
          aria-label="Submit New Todo"
        />
      </form>
    </div>
  );
}
