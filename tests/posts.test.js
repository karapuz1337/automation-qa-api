import { describe, expect, test } from "@jest/globals";
import axios from "axios";
import { PLACEHOLDER_URL } from "../src/constants/api.js";
import { validPost, boundaryPosts } from "../src/testData/posts.js";

// Use boundary testing bodies from boundaryPosts
const {maxLengthTitle, emptyTitle, emptyBody} = boundaryPosts;

describe("POST /posts", () => {
  test("Should create a post with valid data", async() => {
    const response = await axios.post(`${PLACEHOLDER_URL}/posts`, validPost);

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

  test("Should successfully create a post with 255-character title (boundary value)",
      async() => {const response = await axios.post(
          `${PLACEHOLDER_URL}/posts`, maxLengthTitle);

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
    const response = await axios.post(`${PLACEHOLDER_URL}/posts`, emptyBody);

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

    test("Should create a post with empty title", async() => {
        const response = await axios.post(`${PLACEHOLDER_URL}/posts`, emptyTitle);

        // Check status
        expect(response.status).toBe(201);

        // Check if the response is correct
        expect(response.data).toMatchObject({
            title: emptyTitle.title,
            body: emptyTitle.body,
            userId: emptyTitle.userId,
            id: expect.any(Number)
        });
    });
});