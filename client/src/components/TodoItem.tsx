import React from "react";

import { deleteTodoAPI, updateTodoAPI } from "../features/todo/todoAPI";

import { updateTodoStatusAction, deleteTodoAction } from "../features/todo/todoSlice";
import { useAppDispatch } from "../app/hooks";

const TodoItem: React.FC<TodoProps> = ({ todo }) => {
  const dispatch = useAppDispatch();

  const updateTodo = (todo: ITodo) => {
    dispatch(updateTodoAPI(todo));
    dispatch(updateTodoStatusAction(todo.id));

  }
  const deleteTodo = (id: string) => {
    return Promise.all([
      dispatch(deleteTodoAPI(id)),
      dispatch(deleteTodoAction(id))
    ]
    );
  };

  const checkTodo: string = todo.status ? `line-through` : '' ;
  return (
    <div className="card">
      <div className="card--text">
        <h1>{todo.name}</h1>
        <span className={checkTodo}>{todo.description}</span>
      </div>

      <div className="card--button">
        <button
          data-testid="button-complete"
          onClick={() => updateTodo({ ...todo, status: true })}
          className={todo.status ? `hide-button` : `card--button__done`}
        >
          Complete
        </button>

        <button
          data-testid="button-uncomplete"
          onClick={() => updateTodo({ ...todo, status: false })}
          className={!todo.status ? `hide-button` : `card--button__reset`}
        >
          Uncomplete
        </button>

        <button
          onClick={() => deleteTodo(todo.id)}
          className="card--button__delete"
        >
          Delete
        </button>
      </div>
    </div>
  );

};

export default TodoItem;
