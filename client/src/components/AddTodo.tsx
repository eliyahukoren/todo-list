import React, { useState, useRef } from "react";
import { useAppDispatch } from "../app/hooks";
import { addTodoAPI } from "../features/todo/todoAPI";
import { addTodoAction } from "../features/todo/todoSlice";

const AddTodo: React.FC = () => {
  const dispatch = useAppDispatch();
  const nameRef = useRef<HTMLInputElement>(null);
  const descRef = useRef<HTMLInputElement>(null);
  const [errorMsg, setErrorMsg ] = useState('');

  const resetForm = () => {
    if (nameRef.current) {
      nameRef.current.value = "";
    }

    if (descRef.current) {
      descRef.current.value = "";
    }
  };


  const saveTodo = (e: React.FormEvent ): void => {
    e.preventDefault();
    setErrorMsg('');

    if( (!nameRef.current || !descRef.current) || (nameRef.current.value === "" || descRef.current.value === "") ){
      setErrorMsg('Fields Name and Description is required!');
      setTimeout(() => { setErrorMsg('')}, 5000);
      return;
    }

    const refTodo: Omit<ITodo, "id" | "status"> | any = {
      name: nameRef.current.value,
      description: descRef.current.value,
    };

    dispatch(addTodoAPI(refTodo))
    .then((res) => {
      dispatch(addTodoAction(res.payload.todo))
      resetForm();
    })
  }

  return (
    <div>
      <div>
        <form className="form" onSubmit={(e) => saveTodo(e)}>
          <div>
            <div>
              <label htmlFor="name">Name</label>
              <input
                data-testid="name-input"
                ref={nameRef}
                type="text"
                id="name"
              />
            </div>

            <div>
              <label htmlFor="description">Description</label>
              <input
                data-testid="description-input"
                ref={descRef}
                type="text"
                id="description"
              />
            </div>
          </div>
          <button data-testid="add-button">Add Todo</button>
        </form>
      </div>

      <div className="form--error">
        <h3 data-testid="error-msg">{errorMsg}</h3>
      </div>
    </div>
  );
};

export default AddTodo;
