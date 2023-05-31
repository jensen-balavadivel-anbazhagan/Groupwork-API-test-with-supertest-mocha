import { randText, randFutureDate, randStatus } from "@ngneat/falso";

export const createTodos = (id) => {
  const data = {
    user_id: id,
    title: randText(),
    due_on: "2023-06-15T04:12:42.000+05:30",
    status: "pending",
  };
  return data;
};

export const updateTodos = (id) => {
  const data = {
    user_id: id,
    title: randText(),
    due_on: "2023-06-15T04:12:42.000+05:30",
    status: "pending",
  };
  return data;
};
