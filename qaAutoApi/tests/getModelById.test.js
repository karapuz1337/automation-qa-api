import { MODEL_IDS, MODELS } from "../../src/fixtures/models.js";
import { describe, expect, test, beforeEach, afterEach } from "@jest/globals";
import CarsController from "../controllers/CarsController.js";
import { createAxiosClient } from "../helpers/axiosClient.js";
import { setupAuth, cleanupAuth, waitForRateLimit } from "../helpers/authHelpers.js";

describe("GET /models/:id", () => {
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

  // Boundary test: First model ID
  test("Should get first model (AUDI TT - ID 1)", async() => {
    const response = await carsController.getModelById(MODEL_IDS.AUDI_TT);

    expect(response.status).toBe(200);
    expect(response.data.status).toBe("ok");
    expect(response.data.data).toEqual(MODELS.AUDI_TT);
  });

  // Middle test: Different brand (BMW)
  test("Should get middle model (BMW X5 - ID 8)", async() => {
    const response = await carsController.getModelById(MODEL_IDS.BMW_X5);

    expect(response.status).toBe(200);
    expect(response.data.status).toBe("ok");
    expect(response.data.data).toEqual(MODELS.BMW_X5);
  }
  );

  // Middle test: Different brand (Ford)
  test("Should get middle model (Ford Mondeo - ID 14)", async() => {
    const response = await carsController.getModelById(MODEL_IDS.FORD_MONDEO);

    expect(response.status).toBe(200);
    expect(response.data.status).toBe("ok");
    expect(response.data.data).toEqual(MODELS.FORD_MONDEO);
  }
  );

  // Boundary test: Last model ID
  test("Should get last model (Fiat Scudo - ID 23)", async() => {
    const response = await carsController.getModelById(MODEL_IDS.FIAT_SCUDO);

    expect(response.status).toBe(200);
    expect(response.data.data).toEqual(MODELS.FIAT_SCUDO);
  });

  // Negative test: Non-existent model
  test("Should return 404 for non-existent model", async() => {
    const nonExistingId = 999;
    const response = await carsController.getModelById(nonExistingId);

    expect(response.status).toBe(404);
    expect(response.statusText).toBe("Not Found");
  });
});