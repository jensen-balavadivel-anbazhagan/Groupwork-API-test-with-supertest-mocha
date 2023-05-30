import supertest from "supertest";
import { expect } from "chai";
import dotenv from "dotenv";
import { createRandomUser } from "../helpers/user_helper";

//configuration
dotenv.config();

//Request
const request = supertest("https://gorest.co.in/public/v2/");
const token = process.env.USER_TOKEN;

//Mocha test cases
describe(" /users route", () => {
  let userId = null;

  it("GET / users", async () => {
    const res = await request.get("users");
    expect(res.body).to.not.be.empty;
  });
  it("GET / users | query parameters- get males", async () => {
    const url = `users?access-token=${token}&gender=male&status=active`;
    const res = await request.get(url);
    res.body.forEach((user) => {
      expect(user.gender).to.eq("male");
      expect(user.status).to.eq("active");
    });
  });

  it("POST /users", async () => {
    const data = createRandomUser();
    const res = await request
      .post("users")
      .set("Authorization", `Bearer ${token}`)
      .send(data);
    expect(res.body).to.deep.include(data);
    expect(res.body).to.have.property("id");
    expect(res.body).to.have.property("email");
    userId = res.body.id;
  });
  it("POST /users  | Negative", async () => {
    const data = {};
    const res = await request
      .post("users")
      .set("Authorization", `Bearer ${token}`)
      .send(data);
      expect(res.body[0].message).to.eq("can't be blank");
  });

  it("GET /users/:id | Users we just created", async () => {
    const res = await request.get(`users/${userId}?access-token=${token}`);
    expect(res.body.id).to.eq(userId);
  });

  it("PUT/users/:id", async () => {
    const data = {
      name: "User name updated",
    };

    const res = await request
      .put(`users/${userId}`)
      .set("Authorization", `Bearer ${token}`)
      .send(data);

    expect(res.body.name).to.equal(data.name);
    expect(res.body).to.include(data);
  });

  it("DELETE /users/:id | user we just created", async () => {
    const res = await request
      .delete(`users/${userId}`)
      .set("Authorization", `Bearer ${token}`);
    expect(res.body).to.be.empty;
  });

  it("GET /users/:id | Negative", async () => {
    const res = await request.get(`users/${userId}`);
    expect(res.body.message).to.eq("Resource not found");
  });

  it("DELETE /users/:id | Negative", async () => {
    const res = await request
      .delete(`users/${userId}`)
      .set("Authorization", `Bearer ${token}`);
    expect(res.body.message).to.equal("Resource not found");
  });
});
