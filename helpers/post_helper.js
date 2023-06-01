import { randFullName, randEmail, randText } from "@ngneat/falso";

import { randPost } from '@ngneat/falso';

export const createPostUser = () => {
  const data = {
    name: randFullName({ gender: "male" }),
    email: randEmail({ provider: "jenseneducation", suffix: "se" }),
    status: 'active',
    gender: 'male'
  };
  return data;
};


export const createRandomPost = (userId) => {
  const post = {
    user_id: userId,
    title: randText(),
    body: randText(),
  };
  return post;
};
