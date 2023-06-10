import { randFullName, randEmail, randText } from "@ngneat/falso";

export const createComment = (postId) => {
  const data = {
    post_id: postId,
    name: randFullName({ gender: "male" }),
    email: randEmail({ provider: "jenseneducation", suffix: "se" }),
    body: randText(),
  };
  return data;
};

export const updateComment = (postId) => {
  const data = {
    post_id: postId,
    name: randFullName({ gender: "male" }),
    email: randEmail({ provider: "jenseneducation", suffix: "se" }),
    body: randText(),
  };
  return data;
};
