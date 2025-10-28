import { describe, expect, test } from "@jest/globals";
import axios from "axios";
import { PLACEHOLDER_URL } from "../../src/constants/api.js";

describe.skip("GET /users", () => {
  test("Should return 10 users with correct structure", async() => {
    const response = await axios.get(`${PLACEHOLDER_URL}/users`);

    // Define the expected structure of the user object
    const expectedUser = {
      id: expect.any(Number),
      name: expect.any(String),
      username: expect.any(String),
      email: expect.any(String),
      address: expect.any(Object),
      phone: expect.any(String),
      website: expect.any(String),
      company: expect.any(Object)
    };

    // Check status code
    expect(response.status).toBe(200);

    // Check that data provided is an array
    expect(response.data).toBeInstanceOf(Array);

    // Check if the number of user objects is correct
    // Use hardcoded "10" because we know that it is always 10 users
    expect(response.data).toHaveLength(10);

    // Check if the user objects have the expected structure
    response.data.forEach((user) => {
      expect(user).toMatchObject(expectedUser);
    });

  });
});
