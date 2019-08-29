import React from "react";
import { Link } from "react-router-dom";

const Todo = props => (
  <tr>
    <td className={props.todo.todo_completed ? "font-strike" : ""}>
      {props.todo.todo_description}
    </td>
    <td className={props.todo.todo_completed ? "font-strike" : ""}>
      {props.todo.todo_responsible}
    </td>
    <td className={props.todo.todo_completed ? "font-strike" : ""}>
      {props.todo.todo_priority}
    </td>
    <td>
      <Link to={"/edit/" + props.todo._id}>Edit</Link>
    </td>
  </tr>
);

export default Todo;
