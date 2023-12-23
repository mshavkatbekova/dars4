import { createSlice } from "@reduxjs/toolkit";


function todosFromLocalStorage () {
  return JSON.parse(localStorage.getItem('todos')) || []
}

const state = {
  todos:todosFromLocalStorage(),
  completed: 0,
  uncompleted: 0


};

export const todoSlice = createSlice({
  name: "todo",
  initialState: state,
  reducers: {
    addTodo: (state, { payload }) => {
    const addTodos = state.todos.add((todo) => todo.title === payload)
    state.todos = addTodos
    },
    removeTodo: (state, { payload }) => {
    state.todos = state.todos.filter((todo) => todo.id !== payload)
    localStorage.setItem('todos', JSON.stringify(state.todos))
    },
    toggleComplete: (state, { payload }) => {
      const todo = state.todos.find((todo) => todo.id === payload )
      todo.completed = !todo.completed
    localStorage.setItem('todos', JSON.stringify(state.todos))

    },
    statistic: (state) => {
      let completed = 0
      let uncompleted = 0 

      state.todos.forEach((todo) => {
        if(todo.completed) completed++
        else uncompleted++
      })

      state.completed = completed
      state.uncompleted = uncompleted
    }
  },
















});

export const { addTodo, removeTodo, toggleComplete, statistic } = todoSlice.actions;
export default todoSlice.reducer;
