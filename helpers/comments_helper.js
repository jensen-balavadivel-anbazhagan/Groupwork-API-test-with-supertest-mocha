import { randFullName, randEmail, randText } from "@ngneat/falso";

export const createComment = () => {
  const data = {
    post_id: 39960,
    name: randFullName({ gender: "male" }),
    email: randEmail({ provider: "jenseneducation", suffix: "se" }),
    body: randText(),
  };
  return data;
};

export const updateComment = () => {
  const data = {
    post_id: 39960,
    name: randFullName({ gender: "male" }),
    email: randEmail({ provider: "jenseneducation", suffix: "se" }),
    body: randText(),
  };
  return data;
};
