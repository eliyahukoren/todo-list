import request from "supertest";
import { app } from "../../app";
import { ITodo } from "./../../types/todo";

const wrongId = "642075d93afd22a47a69ae47";

const createToDo = async (
  name: string,
  description: string,
  status: boolean
) => {
  return await request(app)
    .post("/add-todo")
    .send({ name, description, status });
};

it("will return 404 for wrong route", async () => {

  await request(app).get("/any").send().expect(404);

});

// it("will return 404 for DELETE with wrong id", async () => {
//   // create todo for test
//   createToDo("test 1", "desc 1", false);

//   // test delete with wrong id
//   await request(app)
//     .delete(`delete-todo/${wrongId}`)
//     .send({ name: "any" })
//     .expect(404);
// });


// it("will return 404 for UPDATE with wrong id", async () => {
//   // create todo for test
//   createToDo("test 1", "desc 1", false);

//   // test update with wrong id
//   await request(app)
//     .put(`edit-todo/${wrongId}`)
//     .send({ name: "any" })
//     .expect(404);

// });


it("can create todo", async () => {
  createToDo("test 1", "desc 1", false);

  const response = await request(app).get("/todos").send().expect(200);

  expect(response.body.length).toEqual(1);
});


it("can fetch a list of todos", async () => {
  createToDo("test 1", "desc 1", false);
  createToDo("test 2", "desc 2", false);
  createToDo("test 3", "desc 3", false);

  const response = await request(app).get("/todos").send().expect(200);

  expect(response.body.length).toEqual(3);
});


it("can update data of todo", async () => {
  // create todo for test
  createToDo("test 1", "desc 1", false);

  // read new todo
  const response = await request(app).get("/todos").send().expect(200);

  // get id of created todo
  const { id } = response.body[0];

  // create another todos
  createToDo("test 2", "desc 2", false);
  createToDo("test 3", "desc 3", false);
  createToDo("test 4", "desc 4", false);

  const updToDo = {
    name: "new name",
    description: "new description",
    status: true,
  };

  // update first todo
  const updatedTodo = await request(app)
    .put(`/edit-todo/${id}`)
    .send(updToDo)
    .expect(200);

  const { todos } = updatedTodo.body;
  const firstToDo = todos.filter((t: ITodo) => t.id === id);
  const otherToDo = todos.filter(
    (t: ITodo) =>
      t.id !== id &&
      (t.name === updToDo.name ||
        t.description === updToDo.description ||
        t.status === updToDo.status)
  );

  // will update only one todo
  expect(firstToDo.length).toEqual(1);
  expect(firstToDo[0].name).toEqual(updToDo.name);
  expect(firstToDo[0].description).toEqual(updToDo.description);
  expect(firstToDo[0].status).toEqual(updToDo.status);

  // will not update any other todo
  expect(otherToDo.length).toEqual(0);
});


it("can delete todo", async () => {
  // create todos for test
  createToDo("test 1", "desc 1", false);

  // read new todo
  const response = await request(app).get("/todos").send().expect(200);

  // get id of created todo
  const { id } = response.body[0];

  // create another todos
  createToDo("test 2", "desc 2", false);
  createToDo("test 3", "desc 3", false);
  createToDo("test 4", "desc 4", false);

  // delete todo
  const deleteToDo = await request(app)
    .delete(`/delete-todo/${id}`)
    .send()
    .expect(200);

  const { todos } = deleteToDo.body;
  const firstToDo = todos.filter((t: ITodo) => t.id === id);
  const otherToDo = todos.filter((t: ITodo) => t.id !== id);

  // will delete only one todo with id
  expect(firstToDo.length).toEqual(0);
  expect(otherToDo.length).toEqual(3);
});
