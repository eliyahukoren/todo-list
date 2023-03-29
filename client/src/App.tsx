import React, { useEffect } from "react";

import { useAppDispatch, useAppSelector } from "./app/hooks";
import TodoItem from "./components/TodoItem";
import AddTodo from "./components/AddTodo";
import { fetchAllTodos } from "./features/todo/todoAPI";
import FilterTodo from "./components/FilterTodo";

const App: React.FC = () => {
  const store = useAppSelector((state) => state.todos);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchAllTodos());
  }, []);

  return (
    <main className='app'>
      <h1>Todo List</h1>
      <AddTodo />
      <FilterTodo />
      {
        store.todos.map((todo:ITodo) => (
          <TodoItem key={todo.id} todo={todo}/>
        ))
      }
    </main>
  );
}

export default App;
