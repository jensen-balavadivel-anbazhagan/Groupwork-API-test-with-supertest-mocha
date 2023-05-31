//Tester: BALA
import supertest from "supertest";
import { expect } from "chai";
import dotenv from "dotenv";
import { createComment } from "../helpers/comments_helper";
import { updateComment } from "../helpers/comments_helper";
//configuration
dotenv.config();

//Request
const request = supertest("https://gorest.co.in/public/v2/");
const token = process.env.Bearer_Token;
let newCommentId;

//MOCHA test cases
describe("/comments route", () => {
  it("GET /comments", async () => {
    const res = await request.get("comments");
    // console.log(res.body);
    expect(res.body).to.not.be.empty;
  });
  it("GET /comments | query parameters - get for name", async () => {
    const url = `comments?access-token=${token}&name=Balavadivel`;
    const res = await request.get(url);
    //Loop over each item

    res.body.forEach((comment) => {
      expect(comment.name).to.eq("Balavadivel");
    });
  });
  it("POST /comments", async () => {
    const data = createComment();
    const res = await request
      .post("comments")
      .set("Authorization", `Bearer ${token}`)
      .send(data);
    newCommentId = res.body.id;
    expect(res.body).to.deep.include(data);
  });
  it("PUT /comments", async () => {
    const data = updateComment();
    const url = `comments/${newCommentId}`;
    const res = await request
      .put(url)
      .set("Authorization", `Bearer ${token}`)
      .send(data);

    expect(res.body).to.deep.include(data);
    expect(res.body.id).to.equal(newCommentId);
  });
  it("DELETE /comments", async () => {
    const url = `comments/${newCommentId}`;
    const res = await request
      .delete(url)
      .set("Authorization", `Bearer ${token}`);

    expect(res.status).equals(204);
  });
  it("GET /comments for non existing comment id (negative test)", async () => {
    const url = `comments/${newCommentId}?access-token=${token}`;
    const res = await request.get(url);
    expect(res.status).equals(404);
    expect(res.body.message).to.eq("Resource not found");
  });
});
