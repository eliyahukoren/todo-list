import React, { useEffect } from "react";

import { useAppDispatch, useAppSelector } from "./app/hooks";
import TodoItem from "./components/TodoItem";
import AddTodo from "./components/AddTodo";
import { fetchAllTodos } from "./features/todo/todoAPI";
import FilterTodo from "./components/FilterTodo";

const App: React.FC = () => {
  const store = useAppSelector((state) => state.todos);
  const dispatch = useAppDispatch();

  const showTodos = (): JSX.Element | JSX.Element[] => {
    if( store.todos.length === 0){
      return <h2>No Todos</h2>
    }

    return store.todos.map(
      (todo: ITodo) => <TodoItem key={todo.id} todo={todo} />
    )
  }

  useEffect(() => {
    dispatch(fetchAllTodos());
  }, []);

  return (
    <main className='app'>
      <h1>Todo List</h1>
      <h4>{store.isLoading && `Loading ...`}</h4>
      <AddTodo />
      <FilterTodo />
      { showTodos() }
    </main>
  );
}

export default App;
