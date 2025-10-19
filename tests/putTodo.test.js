import {describe, expect, test} from "@jest/globals";
import axios from "axios";
import {PLACEHOLDER_URL} from "../src/constants/api.js";
import {validTodo, maxLengthTitle} from "../src/testData/todos.js"

describe("PUT /todos", () => {
    test("Should update the todo with valid data", async() => {
        const response = await axios.put(`${PLACEHOLDER_URL}/todos/1`, validTodo)

        // Check status code
        expect(response.status).toBe(200)

        // Check if the response is correct
        expect(response.data).toMatchObject({
            title: validTodo.title,
            completed: validTodo.completed,
            userId: validTodo.userId,
            id: expect.any(Number)
        });
    });

    test("Should update the todo with max length title", async() => {
        const response = await axios.put(`${PLACEHOLDER_URL}/todos/1`, maxLengthTitle)

        // Check status code
        expect(response.status).toBe(200)

        // Check if the response is correct
        expect(response.data).toMatchObject({
            title: maxLengthTitle.title,
            completed: maxLengthTitle.completed,
            userId: maxLengthTitle.userId,
            id: expect.any(Number)
        });
    })

});