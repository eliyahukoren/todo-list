// The function below is called a thunk and allows us to perform async logic. It
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { ITodo } from "../../interfaces/todo";


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
