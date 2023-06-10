import supertest from "supertest";
import dotenv from "dotenv";
import { createRandomUser } from "./user_helper";
import { createRandomPost } from "./post_helper";

dotenv.config();

const request = supertest("https://gorest.co.in/public/v2/");
const token = process.env.Bearer_Token;
let createdUserId;

export const createTestUserData = async () => {
  const userData = createRandomUser();
  const userRes = await request
    .post("users")
    .set("Authorization", `Bearer ${token}`)
    .send(userData);
  return userRes.body;
};

export const deleteTestUserData = async (userId) => {
  const userRes = await request
    .delete(`users/${userId}`)
    .set("Authorization", `Bearer ${token}`);
  return userRes.body;
};

export const createTestPostData = async () => {
  const retObj = await createTestUserData();
  createdUserId = retObj.id;
  const postData = createRandomPost(createdUserId);
  const postRes = await request
    .post("posts")
    .set("Authorization", `Bearer ${token}`)
    .send(postData);
  return postRes.body;
};

export const deleteTestPostData = async (postId) => {
  const postRes = await request
    .delete(`posts/${postId}`)
    .set("Authorization", `Bearer ${token}`);
  await deleteTestUserData(createdUserId);
  return postRes.body;
};
