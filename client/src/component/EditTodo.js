import React, { Component } from "react";

import axios from "axios";

export default class EditTodo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      todo_description: "",
      todo_responsible: "",
      todo_priority: "",
      todo_completed: false
    };
    this.onChangeTodoDescription = this.onChangeTodoDescription.bind(this);
    this.onChangeTodoResponsible = this.onChangeTodoResponsible.bind(this);
    this.onChangeTodoPriority = this.onChangeTodoPriority.bind(this);
    this.onChangeTodoCompleted = this.onChangeTodoCompleted.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  setValue = (name, value) => {
    this.setState({
      [name]: value
    });
  };

  onChangeTodoDescription = e => {
    this.setValue("todo_description", e.target.value);
  };

  onChangeTodoResponsible = e => {
    this.setValue("todo_responsible", e.target.value);
  };

  onChangeTodoPriority = e => {
    this.setValue("todo_priority", e.target.value);
  };

  onChangeTodoCompleted = e => {
    this.setValue("todo_completed", !this.state.todo_completed);
  };

  onSubmit = e => {
    e.preventDefault();
    const { ...newItem } = this.state;
    const that = this;
    axios
      .patch(
        "http://localhost:3000/todos/" + that.props.match.params.id,
        newItem
      )
      .then(function(res) {
        console.log(res);
      })
      .catch(function(err) {
        console.log(err);
      })
      .then(function() {
        // always executed
      });
    this.props.history.push("/");
    this.setState({
      todo_description: "",
      todo_responsible: "",
      todo_priority: "",
      todo_completed: false
    });
  };

  componentDidMount() {
    const that = this;
    axios
      .get("http://localhost:3000/todos/" + that.props.match.params.id)
      .then(res => {
        const {
          todo_description,
          todo_priority,
          todo_responsible,
          todo_completed
        } = res.data;

        that.setState({
          todo_description: todo_description,
          todo_priority: todo_priority,
          todo_responsible: todo_responsible,
          todo_completed: todo_completed
        });
      })
      .catch(function(err) {
        console.log(err);
      })
      .then(function() {
        // always executed
      });
  }

  render() {
    return (
      <div>
        <h3 align="center">Update Todo</h3>
        <form onSubmit={this.onSubmit}>
          <div className="form-group">
            <label>Description: </label>
            <input
              type="text"
              className="form-control"
              value={this.state.todo_description || ""}
              onChange={this.onChangeTodoDescription}
            />
          </div>
          <div className="form-group">
            <label>Responsible: </label>
            <input
              type="text"
              className="form-control"
              value={this.state.todo_responsible || ""}
              onChange={this.onChangeTodoResponsible}
            />
          </div>
          <div className="form-group">
            <div className="form-check form-check-inline">
              <input
                className="form-check-input"
                type="radio"
                name="priorityOptions"
                id="priorityLow"
                value="Low"
                checked={this.state.todo_priority === "Low"}
                onChange={this.onChangeTodoPriority}
              />
              <label className="form-check-label">Low</label>
            </div>
            <div className="form-check form-check-inline">
              <input
                className="form-check-input"
                type="radio"
                name="priorityOptions"
                id="priorityMedium"
                value="Medium"
                checked={this.state.todo_priority === "Medium"}
                onChange={this.onChangeTodoPriority}
              />
              <label className="form-check-label">Medium</label>
            </div>
            <div className="form-check form-check-inline">
              <input
                className="form-check-input"
                type="radio"
                name="priorityOptions"
                id="priorityHigh"
                value="High"
                checked={this.state.todo_priority === "High"}
                onChange={this.onChangeTodoPriority}
              />
              <label className="form-check-label">High</label>
            </div>
          </div>
          <div className="form-check">
            <input
              className="form-check-input"
              id="completedCheckbox"
              type="checkbox"
              name="completedCheckbox"
              onChange={this.onChangeTodoCompleted}
              checked={this.state.todo_completed}
              value={this.state.todo_completed || false}
            />
            <label className="form-check-label" htmlFor="completedCheckbox">
              Completed
            </label>
          </div>

          <br />

          <div className="form-group">
            <input
              type="submit"
              value="Update Todo"
              className="btn btn-primary"
            />
          </div>
        </form>
      </div>
    );
  }
}
