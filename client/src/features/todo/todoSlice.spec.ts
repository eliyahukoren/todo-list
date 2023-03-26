import todoReducer, {
  addTodo, deleteTodo, ToDoState, updateTodo
} from "./todoSlice";

describe("Tests to be done", () => {
  console.log("Hi there!");

  const initialState: ToDoState = {
    todos: [],
    isLoading: false,
    error: ''
  };

  todoReducer(initialState, addTodo({name: '', description: '', status: false}));
  todoReducer(initialState, updateTodo({id: 'aaa', newItem: 'string'}));
  todoReducer(initialState, deleteTodo('string'));
});
