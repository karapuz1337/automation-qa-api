import { expectedGetModelsResponse } from "../../src/fixtures/models.js";
import { describe, expect, test, beforeEach, afterEach } from "@jest/globals";
import CarsController from "../controllers/CarsController.js";
import { createAxiosClient } from "../helpers/axiosClient.js";
import {setupAuth, cleanupAuth, waitForRateLimit} from "../helpers/authHelpers.js";

describe("GET /models", () => {
  // Create axios client with cookies
  const client = createAxiosClient();

  // Create Cars API client
  const carsController = new CarsController(client);

  // Create Auth client
  let authController;

  // Create a new user for each test
  beforeEach(async() => {
    ({ authController } = await setupAuth(client));
  });

    // Delete each created user
    afterEach(async() => {
        if (authController) {
            await cleanupAuth(authController);
        }
        // Add delay for each test to avoid rate limiting
        await waitForRateLimit();
    });

  test("Should get models", async() => {
    const response = await carsController.getModels();

    expect(response.status).toBe(200);
    expect(response.data).toEqual(expectedGetModelsResponse);
  });
});