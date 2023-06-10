//Tester: BALA
import supertest from "supertest";
import { expect } from "chai";
import dotenv from "dotenv";
import { createComment } from "../helpers/comments_helper";
import { updateComment } from "../helpers/comments_helper";
import { createTestPostData } from "../helpers/common_helper";
import { deleteTestPostData } from "../helpers/common_helper";
//configuration
dotenv.config();

//Request
const request = supertest("https://gorest.co.in/public/v2/");
const token = process.env.Bearer_Token;
let newCommentId;
let createdPostId;

//MOCHA test cases
describe("/comments route", () => {
  before(async () => {
    const retObj = await createTestPostData();
    createdPostId = retObj.id;
  });

  after(async () => {
    await deleteTestPostData(createdPostId);
  });

  it("GET /comments", async () => {
    const res = await request.get("comments");
    expect(res.body).to.not.be.empty;
  });

  it("POST /comments", async () => {
    const data = createComment(createdPostId);
    const res = await request
      .post("comments")
      .set("Authorization", `Bearer ${token}`)
      .send(data);
    newCommentId = res.body.id;
    expect(res.body).to.deep.include(data);
  });

  it("GET /comments | query parameters - get for post id", async () => {
    const url = `comments?access-token=${token}&post_id=${createdPostId}`;
    const res = await request.get(url);
    res.body.forEach((comment) => {
      expect(comment.post_id).to.eq(createdPostId);
    });
  });

  it("PUT /comments", async () => {
    const data = updateComment(createdPostId);
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
