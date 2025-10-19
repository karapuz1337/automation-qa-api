import { describe, expect, test } from "@jest/globals";
import axios from "axios";
import { PLACEHOLDER_URL } from "../src/constants/api.js";
import { validTodo, todoWithMaxLengthTitle } from "../src/testData/todos.js";

// Hardcoded valid todo ID
const EXISTING_TODO_ID = 1;

describe("PUT /todos", () => {
  test("Should update the todo with valid data", async() => {
    const response = await axios.put(`${PLACEHOLDER_URL}/todos/${EXISTING_TODO_ID}`, validTodo);

    // Check status code
    expect(response.status).toBe(200);

    // Check if the response is correct
    expect(response.data).toMatchObject({
      title: validTodo.title,
      completed: validTodo.completed,
      userId: validTodo.userId,
      id: expect.any(Number)
    });
  });

  test("Should update the todo with max length title", async() => {
    const response = await axios.put(`${PLACEHOLDER_URL}/todos/${EXISTING_TODO_ID}`, todoWithMaxLengthTitle);

    // Check status code
    expect(response.status).toBe(200);

    // Check if the response is correct
    expect(response.data).toMatchObject({
      title: todoWithMaxLengthTitle.title,
      completed: todoWithMaxLengthTitle.completed,
      userId: todoWithMaxLengthTitle.userId,
      id: expect.any(Number)
    });
  });

});