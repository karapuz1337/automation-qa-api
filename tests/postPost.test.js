import {describe, expect, test} from "@jest/globals";
import axios from "axios";
import {PLACEHOLDER_URL} from "../src/constants/api.js";
import { validPost, maxLengthTitle, emptyBody } from "../src/testData/posts.js";

describe("POST /posts", () => {
    test("Should create a post with valid data", async() => {
        const response = await axios.post(`${PLACEHOLDER_URL}/posts/`, validPost);

        // Check status
        expect(response.status).toBe(201);

        // Check if the response is correct
        expect(response.data).toMatchObject({
            title: validPost.title,
            body: validPost.body,
            userId: validPost.userId,
            id: expect.any(Number)
        });

    });

    test("Should create a post with a max length title", async() => {
        const response = await axios.post(`${PLACEHOLDER_URL}/posts/`, maxLengthTitle);

        // Check status
        expect(response.status).toBe(201);

        // Check if the response is correct
        expect(response.data).toMatchObject({
            title: maxLengthTitle.title,
            body: maxLengthTitle.body,
            userId: maxLengthTitle.userId,
            id: expect.any(Number)
        });
    });

    test("Should create a post with empty body", async() => {
        const response = await axios.post(`${PLACEHOLDER_URL}/posts/`, emptyBody);

        // Check status
        expect(response.status).toBe(201);

        // Check if the response is correct
        expect(response.data).toMatchObject({
            title: emptyBody.title,
            body: emptyBody.body,
            userId: emptyBody.userId,
            id: expect.any(Number)
        });
    });
});