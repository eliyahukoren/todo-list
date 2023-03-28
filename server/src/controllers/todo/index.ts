import { Request, Response } from "express";
import Todo from "../../models/todo";
import { ITodo } from "./../../types/todo";

const errorHandler = (res: Response, error: any) => {
  let message;
  if (error instanceof Error) message = error.message;
  else message = String(error);

  res.status(500).json({message});
}

const read = async (req: Request, res: Response): Promise<void> => {
  try {
    const todos: ITodo[] = await Todo.find();
    res.status(200).send(todos)
  } catch (error) {
    throw error;
  }
};

const create = async (req: Request, res: Response): Promise<void> => {
  try {
    const body = req.body as Pick<ITodo, "name" | "description" | "status">;

    const todo: ITodo = new Todo({
      name: body.name,
      description: body.description,
      status: body.status,
    });

    const newTodo: ITodo = await todo.save();
    const allTodos: ITodo[] = await Todo.find();

    res
      .status(201)
      .send({ message: "Todo created", todo: newTodo, todos: allTodos });
  } catch (error) {
    errorHandler(res, error);
  }
};

const update = async (req: Request, res: Response): Promise<void> => {
  try {
    const {
      params: { id },
      body,
    } = req;
    const updateTodo: ITodo | null = await Todo.findByIdAndUpdate(
      { _id: id },
      body
    );
    const allTodos: ITodo[] = await Todo.find();
    res.status(200).send({
      message: "Todo updated",
      todo: updateTodo,
      todos: allTodos,
    });
  } catch (error) {
    errorHandler(res, error);
  }
};

const remove = async (req: Request, res: Response): Promise<void> => {
  try {
    const deletedTodo: ITodo | null = await Todo.findByIdAndRemove(
      req.params.id
    );
    const allTodos: ITodo[] = await Todo.find();
    res.status(200).send({
      message: "Todo removed",
      todo: deletedTodo,
      todos: allTodos,
    });
  } catch (error) {
    errorHandler(res, error);
  }
};

export { read, create, update, remove };
