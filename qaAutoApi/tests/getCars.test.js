import { describe, expect, test, beforeEach, afterEach } from "@jest/globals";
import CarsController from "../controllers/CarsController.js";
import { createAxiosClient } from "../helpers/axiosClient.js";
import {setupAuth, cleanupAuth, waitForRateLimit} from "../helpers/authHelpers.js";

describe("GET /cars", () => {
  const client = createAxiosClient();
  const carsController = new CarsController(client);
  let authController;

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

  test("Should return empty array for new user with no cars", async() => {
    const response = await carsController.getCars();

    expect(response.status).toBe(200);
    expect(response.data.status).toBe("ok");
    expect(response.data.data).toEqual([]);
  });
});