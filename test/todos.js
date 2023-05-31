// Tester: BALA

import supertest from "supertest";
import { expect } from "chai";
import dotenv from "dotenv";
import { createTodos } from "../helpers/todos_helper";
import { updateTodos } from "../helpers/todos_helper";
import {
  createTestUserData,
  deleteTestUserData,
} from "../helpers/common_helper";
//configuration
dotenv.config();

const request = supertest("https://gorest.co.in/public/v2/");
const token = process.env.Bearer_Token;
let newTodoId;
let createdUserId;

//MOCHA test cases
describe("/Todos route", () => {
  before(async () => {
    const retObj = await createTestUserData();
    createdUserId = retObj.id;
  });

  after(async () => {
    await deleteTestUserData(createdUserId);
  });
  it("GET /todos", async () => {
    const res = await request.get("comments");
    // console.log(res.body);
    expect(res.body).to.not.be.empty;
  });
  it("POST /todos", async () => {
    const data = createTodos(createdUserId);
    const res = await request
      .post("todos")
      .set("Authorization", `Bearer ${token}`)
      .send(data);
    newTodoId = res.body.id;
    expect(res.body).to.deep.include(data);
  });
  it("GET /Todos | query parameters - get for todo", async () => {
    const url = `todos?access-token=${token}&user_id=${createdUserId}`;
    const res = await request.get(url);
    //Loop over each item
    res.body.forEach((todos) => {
      expect(todos.user_id).to.eq(createdUserId);
    });
  });
  it("PUT /todos", async () => {
    const data = updateTodos(createdUserId);
    const url = `todos/${newTodoId}`;
    const res = await request
      .put(url)
      .set("Authorization", `Bearer ${token}`)
      .send(data);

    expect(res.body).to.deep.include(data);
  });
  it("DELETE /todos", async () => {
    const url = `todos/${newTodoId}`;
    const res = await request
      .delete(url)
      .set("Authorization", `Bearer ${token}`);

    expect(res.status).equals(204);
  });
  it("GET /todos for non existing todo id (negative test)", async () => {
    const url = `todos/${newTodoId}?access-token=${token}`;
    const res = await request.get(url);
    expect(res.status).equals(404);
    expect(res.body.message).to.eq("Resource not found");
  });
});
