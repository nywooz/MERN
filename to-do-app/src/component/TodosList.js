import React, { Component } from "react";

import axios from "axios";

import Todo from "./Todo";

export default class TodosList extends Component {
  constructor(props) {
    super(props);
    this.state = { todos: [] };
  }

  componentDidMount() {
    const that = this;
    axios
      .get("http://localhost:3000/todos")
      .then(function(res) {
        that.setState({ todos: res.data });
      })
      .catch(function(err) {
        console.log(err);
      })
      .then(function() {
        // always executed
      });
  }

  todoList() {
    return this.state.todos.map(function(currentTodo, i) {
      return <Todo todo={currentTodo} key={i} />;
    });
  }

  render() {
    return (
      <div>
        <h3>Todos List</h3>
        <table className="table table-striped" style={{ marginTop: 20 }}>
          <thead>
            <tr>
              <th>Description</th>
              <th>Responsible</th>
              <th>Priority</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {this.state.todos || this.state.todos.length > 0 ? 
              this.todoList()
             : 
              <p className="text-center">no records</p>
            }
          </tbody>
        </table>
      </div>
    );
  }
}
