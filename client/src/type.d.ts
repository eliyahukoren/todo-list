interface ITodo {
  id: string;
  name: string;
  description: string;
  status: boolean;
  createdAt?: string;
  updatedAt?: string;
}

type TodoProps = {
  todo: ITodo;
};

type TodoListProps = {
  todos: ITodo[]
}

type ApiDataType = {
  message: string;
  status: string;
  todos: ITodo[];
  todo?: ITodo;
};

type ToDoFilter = {
  showCompleted: boolean;
  showUncompleted: boolean;
}
