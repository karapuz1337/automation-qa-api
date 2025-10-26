import { describe, expect, test } from "@jest/globals";
import axios from "axios";
import { PLACEHOLDER_URL } from "../../src/constants/api.js";
import {
  validPost,
  postWithMaxLengthTitle,
  postWithEmptyTitle,
  postWithEmptyBody
} from "../testData/posts.js";

// Hardcoded the expected post ID. (JsonPlaceholderAPI always returns id: 101 for a new post)
const EXPECTED_POST_ID = 101;


describe.skip("POST /posts", () => {
  test("Should create a post with valid data", async() => {
    const response = await axios.post(`${PLACEHOLDER_URL}/posts`, validPost);

    // Check status
    expect(response.status).toBe(201);

    // Check if the response is correct
    expect(response.data).toMatchObject({
      title: validPost.title,
      body: validPost.body,
      userId: validPost.userId,
      id: EXPECTED_POST_ID
    });

  });

  test("Should successfully create a post with 255-character title (boundary value)", async() => {
    const response = await axios.post(`${PLACEHOLDER_URL}/posts`, postWithMaxLengthTitle);

    // Check status
    expect(response.status).toBe(201);

    // Check if the response is correct
    expect(response.data).toMatchObject({
      title: postWithMaxLengthTitle.title,
      body: postWithMaxLengthTitle.body,
      userId: postWithMaxLengthTitle.userId,
      id: EXPECTED_POST_ID
    });
  });

  test("Should create a post with empty body", async() => {
    const response = await axios.post(`${PLACEHOLDER_URL}/posts`, postWithEmptyBody);

    // Check status
    expect(response.status).toBe(201);

    // Check if the response is correct
    expect(response.data).toMatchObject({
      title: postWithEmptyBody.title,
      body: postWithEmptyBody.body,
      userId: postWithEmptyBody.userId,
      id: EXPECTED_POST_ID
    });
  });

  test("Should create a post with empty title", async() => {
    const response = await axios.post(`${PLACEHOLDER_URL}/posts`, postWithEmptyTitle);

    // Check status
    expect(response.status).toBe(201);

    // Check if the response is correct
    expect(response.data).toMatchObject({
      title: postWithEmptyTitle.title,
      body: postWithEmptyTitle.body,
      userId: postWithEmptyTitle.userId,
      id: EXPECTED_POST_ID
    });
  });
});