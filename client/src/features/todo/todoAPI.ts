// The function below is called a thunk and allows us to perform async logic. It
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const BASE_URL = process.env.BASE_URL || "http://localhost:4000";

// can be dispatched like a regular action: `dispatch(incrementAsync(10))`. This
// will call the thunk with the `dispatch` function as the first argument. Async
// code can then be executed and other actions can be dispatched. Thunks are
// typically used to make async requests.
export const fetchAllTodos = createAsyncThunk(
  "todos/fetchAll",
  async (_, thunkApi) => {
    try {
      const response = await axios.get<ITodo[]>(`${BASE_URL}/todos`);
      return response.data;
    } catch (err) {
      return thunkApi.rejectWithValue("error message");
    }
  }
);

export const deleteTodoAPI = createAsyncThunk(
  "todos/deleteTodo",
  async (id: string, thunkApi) => {
    try {
      const deletedTodo = await axios.delete(`${BASE_URL}/delete-todo/${id}`);
      return deletedTodo;
    } catch (err) {
      return thunkApi.rejectWithValue("error message");
    }

  }
);

export const updateTodoAPI = createAsyncThunk(
  "todos/updatedTodo",
  async (todo: ITodo, thunkApi) => {
    try {

      const todoUpdate: Pick<ITodo, 'status'> = {
        status: todo.status,
      };

      const updatedTodo = await axios.put(
        `${BASE_URL}/edit-todo/${todo.id}`,
        todoUpdate
      );

      return updatedTodo;
    } catch (err) {
      return thunkApi.rejectWithValue("error message");
    }
  }
);

export const addTodoAPI = createAsyncThunk(
  "todos/addTodo",
  async (formData: ITodo, thunkApi) => {
    try {
      const todo: Omit<ITodo, "id"> = {
        name: formData.name,
        description: formData.description,
        status: false,
      };

      const saveTodo = await axios.post(`${BASE_URL}/add-todo`, todo);

      return saveTodo.data;
    } catch (err) {
      return thunkApi.rejectWithValue("error message");
    }
  }
);
