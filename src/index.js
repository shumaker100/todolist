import React from "react";
import ReactDOM from "react-dom";
import Todo from "./components/Todo";
import TodoForm from "./components/TodoForm";

import "./styles.css";

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      todos: [],
    };
  }

  /*componentDidMount() {
    fetch("https://limitless-journey-65898.herokuapp.com/todos")
      .then((res) => res.json())
      .then((res) => this.setState({ todos: res }));
  }*/

  createTodo = (e) => {
    e.preventDefault();
    let newTodo = { title: e.target.title.value, completed: false };
    this.setState(
      {
        todos: [...this.state.todos, newTodo],
      },
      () => {
        fetch("URL", {
          method: "post",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(newTodo),
        }).then((res) => res.json());
      }
    );
  };

  toggleComplete = (index) => {
    let todos = this.state.todos;
    todos[index].completed = !todos[index].completed;
    let todoid = this.state.todos[index]._id;
    this.setState({ todos }, () => {
      fetch(`URL${todoid}`, {
        method: "put",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ completed: this.state.todos[index].completed }),
      }).then((res) => res.json());
    });
  };

  deleteTodo = (e, index) => {
    e.preventDefault();
    e.stopPropagation();
    let todoid = this.state.todos[index]._id;
    let todos = this.state.todos.filter((todo, i) => parseInt(index, 10) !== i);
    this.setState({ todos }, () => {
      fetch(`URL${todoid}`, {
        method: "delete",
      }).then((res) => res.json());
    });
  };

  render() {
    return (
      <div className="App">
        <h1 className="header">ToDo List</h1>
        <h2>{this.state.todos.length}</h2>
        <TodoForm createTodo={this.createTodo} />
        <section className="todos">
          {this.state.todos.map((todo, index) => (
            <Todo
              key={index}
              index={index}
              todo={todo}
              toggleComplete={this.toggleComplete}
              deleteTodo={this.deleteTodo}
            />
          ))}
        </section>
      </div>
    );
  }
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
