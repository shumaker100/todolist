import React from "react";

export default function Todo(props) {
  return (
    <div
      className={props.todo.completed ? "Todo Complete" : "Todo Incomplete"}
      onClick={(e) => props.toggleComplete(props.index)}
    >
      <p>{props.todo.title}</p>
      <a
        href="/deletetodo"
        className="del"
        onClick={(e) => props.deleteTodo(e.props.index)}
      >
        x
      </a>
    </div>
  );
}
