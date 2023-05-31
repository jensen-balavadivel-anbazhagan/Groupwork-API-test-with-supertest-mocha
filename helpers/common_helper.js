import supertest from "supertest";
import dotenv from "dotenv";
import { createRandomUser } from "./user_helper";

dotenv.config();

const request = supertest("https://gorest.co.in/public/v2/");
const token = process.env.Bearer_Token;

export const createTestUserData = async () => {
  const userData = createRandomUser();
  const userRes = await request
    .post("users")
    .set("Authorization", `Bearer ${token}`)
    .send(userData);
  return userRes.body;
};

export const deleteTestUserData = async (userId) => {
  const userData = createRandomUser();
  const userRes = await request
    .delete(`users/${userId}`)
    .set("Authorization", `Bearer ${token}`)
    .send(userData);
  return userRes.body;
};
