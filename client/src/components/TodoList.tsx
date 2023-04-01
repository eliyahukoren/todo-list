import TodoItem from "./TodoItem";

const TodoList: React.FC<TodoListProps> = ({ todos }) => {
  return (
    <div>
      {todos.length === 0 ? (
        <h1>Empty</h1>
      ) : (
        todos.map((todo: ITodo) => <TodoItem key={todo.id} todo={todo} />)
      )}
    </div>
  );
};

export default TodoList;
