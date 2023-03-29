import React, { useState, useEffect } from "react";
import { useAppDispatch } from "../app/hooks";
import { fetchAllTodos } from "../features/todo/todoAPI";
import { filterTodoAction } from "../features/todo/todoSlice";

const FilterTodo: React.FC = () => {
  const dispatch = useAppDispatch();
  const [filterCompleted, setFilterCompleted] = useState(false);
  const [filterUnCompleted, setFilterUnCompleted] = useState(false);

  useEffect(() => {
    dispatch(fetchAllTodos())
      .then(
        () => dispatch(
          filterTodoAction({
            showCompleted: filterCompleted,
            showUncompleted: filterUnCompleted})
          )
      )
  }, [filterCompleted, filterUnCompleted]);

  return (
    <div>
      <fieldset>
        <legend className="filter">Filter ToDo</legend>
        <div className='filter--option'>
          <input
            type="checkbox"
            id="complete"
            defaultChecked={filterCompleted}
            onChange={() => setFilterCompleted(!filterCompleted)}
          />
          <label htmlFor="complete">Complete</label>
        </div>
        <div className='filter--option'>
          <input
            type="checkbox"
            id="uncomplete"
            defaultChecked={filterCompleted}
            onChange={() => setFilterUnCompleted(!filterUnCompleted)}
          />
          <label htmlFor="uncomplete">Uncomplete</label>
        </div>
      </fieldset>
    </div>
  );
};

export default FilterTodo;
