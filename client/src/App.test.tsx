import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { Provider } from "react-redux";
import { store } from "./app/store";
import App from "./App";
import AddTodo from "./components/AddTodo";
import TodoItem from "./components/TodoItem";
import userEvent from "@testing-library/user-event";

const todo: ITodo = {
  id: "Jhgusy77t732",
  name: "Todo name",
  description: "description",
  status: false,
};

describe("<App />", () => {
  test("renders app", () => {
    const { getByText } = render(
      <Provider store={store}>
        <App />
      </Provider>
    );

    expect(getByText(/Todo List/i)).toBeInTheDocument();

    const nameInput = screen.getByTestId("name-input");
    expect(nameInput).toBeInTheDocument();
    expect(nameInput).toHaveAttribute("type", "text");
  });
});

describe("<TodoItem />", () => {
  test("renders TodoItem with status false", () => {
    render(
      <Provider store={store}>
        <TodoItem todo={todo} />
      </Provider>
    );

    expect(screen.getByTestId("button-complete")).not.toHaveClass(
      "hide-button"
    );

    expect(screen.getByTestId("button-uncomplete")).toHaveClass(
      "hide-button"
    );
  });

  test("renders TodoItem with status true", () => {
    todo.status = true;

    render(
      <Provider store={store}>
        <TodoItem todo={todo} />
      </Provider>
    );

    expect(screen.getByTestId("button-complete")).toHaveClass(
      "hide-button"
    );

    expect(screen.getByTestId("button-uncomplete")).not.toHaveClass("hide-button");
  });
});

describe("<AddTodo />", () => {
  test("renders component", () => {
    const { getByText } = render(
      <Provider store={store}>
        <AddTodo />
      </Provider>
    );

    expect(getByText(/Name/i)).toBeInTheDocument();
    expect(getByText(/Description/i)).toBeInTheDocument();
    expect(getByText(/Add Todo/i)).toBeInTheDocument();
  });

  test("invalid inputs", () => {
    todo.status = true;

    const { getByTestId } = render(
      <Provider store={store}>
        <AddTodo />
      </Provider>
    );

    fireEvent.click(screen.getByTestId("add-button"));

    expect(getByTestId("error-msg")).toContainHTML(
      "Fields Name and Description is required!"
    );
  });

  test("valid inputs", async () => {
    todo.status = true;
    const testData = {
      name: "test Name",
      desc: "test Desc",
    };

    const { getByTestId } = render(
      <Provider store={store}>
        <AddTodo />
      </Provider>
    );

    const nameEl = screen.getByTestId("name-input");
    userEvent.type(nameEl, testData.name);
    await waitFor(() => {
      expect(nameEl).toHaveValue(testData.name);
    });

    const descEl = screen.getByTestId("description-input");
    userEvent.type(descEl, testData.desc);
    await waitFor(() => {
      expect(descEl).toHaveValue(testData.desc);
    });

    expect(getByTestId("error-msg")).toContainHTML("");
  });
});
