import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

/**
 * 2초 지연을 시키는 함수입니다 (비동기 작업).
 */
import { waitTwoSeconds } from "../../utils";

export const __addToDo = createAsyncThunk(
  "__addToDo",
  async (payload, thunkAPI) => {
    await waitTwoSeconds();
    thunkAPI.dispatch(
      addTodo({
        id: payload.id,
        title: payload.title,
        body: payload.body,
      })
    );
  }
);

export const __deleteTodo = createAsyncThunk(
  "__deleteToDo",
  async (payload, thunkAPI) => {
    await waitTwoSeconds();
    thunkAPI.dispatch(
      deleteTodo({
        id: payload.id,
      })
    );
  }
);

const initialState = {
  list: [],
};

const todosSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {
    addTodo: (state, action) => {
      state.list = [
        {
          id: action.payload.id,
          title: action.payload.title,
          body: action.payload.body,
        },
        ...state.list,
      ];
    },
    deleteTodo: (state, action) => {
      state.list = state.list.filter((list) => list.id !== action.payload.id);
    },
  },
});

export const { addTodo, deleteTodo } = todosSlice.actions;
export default todosSlice.reducer;
