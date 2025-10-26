import { describe, expect, test, beforeEach, afterEach } from "@jest/globals";
import CarsController from "../controllers/CarsController.js";
import { createAxiosClient } from "../helpers/axiosClient.js";
import { setupAuth, cleanupAuth } from "../helpers/authHelpers.js";

describe("GET /cars", () => {
  const client = createAxiosClient();
  const carsController = new CarsController(client);
  let authController;

  beforeEach(async() => {
    ({ authController } = await setupAuth(client));
  });

  afterEach(async() => {
    await cleanupAuth(authController);
  });

  test("Should return empty array for new user with no cars", async() => {
    const response = await carsController.getCars();

    expect(response.status).toBe(200);
    expect(response.data.status).toBe("ok");
    expect(response.data.data).toEqual([]);
  });
});