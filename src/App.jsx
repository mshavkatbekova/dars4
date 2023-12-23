import { useSelector, useDispatch } from "react-redux";
import { addTodo, removeTodo, toggleComplete, statistic } from "./features/todoSlice";
import { useEffect, useRef } from "react";
import {v4 as uuidv4} from 'uuid'

function App() {
  const title = useRef()
  const completedRef = useRef()
  const dispatch = useDispatch();
  const { todos, completed, uncompleted } = useSelector((store) => store.todo);

  useEffect(() => {
dispatch(statistic())
  }, [todos, dispatch])

 const handleSubmit = (e) => {
  e.preventDefault()

  const newTodo = {
     id: uuidv4(),
     title: title.current.value, 
     completed: completedRef.current.checked
  }

  dispatch(addTodo(newTodo));
 }

  return (
    <div className="w-[500px] mx-auto pt-10 text-center">
      <h1 className="text-center font-bold text-5xl mb-5">My Todos</h1>

      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <span ref={title} className="block mb-2">Title</span>
          <input type="text" className="input input-bordered w-full max-w-xs bg-white text-black"  />
        </div>
        <div className="mb-3">
          <span ref={completedRef} className="block mb-2">Completed</span>
          <input type="checkbox" className="checkbox" />
        </div>
        <button className="btn btn-primary">add</button>
      </form>
      <div>
        <ul className="text-center">
          {todos.map((todo) => {
            return (
              <li className="flex items-center text-center mb-5" key={todo.id}>
                <div className="card w-96 bg-zinc-700 text-neutral-content">
                  <div className="card-body items-center text-center ">
                    <h2 className="card-title text-white text-2xl">
                      {todo.title}
                    </h2>
                    <p className="font-medium text-xl">
                      Completed: {todo.completed ? "✅" : "❌"}
                    </p>
                    <div className="card-actions justify-end">
                      <button
                        onClick={() => dispatch(toggleComplete(todo.id))}
                        className="btn btn-success font-semibold"
                      >
                        {todo.completed ? "Uncompleted" : "Completed"}
                      </button>
                      <button
                        onClick={() => dispatch(removeTodo(todo.id))}
                        className="btn btn-error font-semibold"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
      <div className="pt-10 text-xl">
        <h2>Completed: {completed}</h2>
        <h2>Uncompleted: {uncompleted}</h2>
      </div>
    </div>
  );
}

export default App;
