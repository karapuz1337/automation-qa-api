import { describe, expect, test, beforeEach, afterEach } from "@jest/globals";
import CarsController from "../controllers/CarsController.js";
import { createAxiosClient } from "../helpers/axiosClient.js";
import {setupAuth, cleanupAuth, waitForRateLimit} from "../helpers/authHelpers.js";
import { BRANDS, BRAND_IDS } from "../../src/fixtures/brands.js";
import { MODELS, MODEL_IDS } from "../../src/fixtures/models.js";

describe("GET /cars/:id", () => {
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

  // ========== POSITIVE TESTS ==========

  test("Should get car by valid ID", async() => {
    // Step 1: Create a car
    const carData = {
      carBrandId: BRAND_IDS.AUDI,
      carModelId: MODEL_IDS.AUDI_TT,
      mileage: 1000
    };

    // Step 2: Post a car
    const postResponse = await carsController.postCar(carData);
    const carId = postResponse.data.data.id;

    // Step 3: Get the car by ID
    const getResponse = await carsController.getCarById(carId);

    // Step 4: Verify the response
    expect(getResponse.status).toBe(200);
    expect(getResponse.data.status).toBe("ok");
    expect(getResponse.data.data).toMatchObject({
      id: carId,
      carBrandId: carData.carBrandId,
      carModelId: carData.carModelId,
      initialMileage: carData.mileage,
      mileage: carData.mileage,
      brand: BRANDS.AUDI.title,
      model: MODELS.AUDI_TT.title,
      logo: BRANDS.AUDI.logoFilename,
      updatedMileageAt: expect.any(String)
    });
  });

  // ========== NEGATIVE TESTS ==========

  test("Should return 404 for non-existent car ID", async() => {
    const nonExistentId = 999999;

    const response = await carsController.getCarById(nonExistentId);

    expect(response.status).toBe(404);
    expect(response.statusText).toBe("Not Found");
  });

  test("Should return 404 when trying to get another user's car", async() => {
    // Step 1: User A creates a car
    const carData = {
      carBrandId: BRAND_IDS.BMW,
      carModelId: MODEL_IDS.BMW_X5,
      mileage: 2000
    };

    const postResponse = await carsController.postCar(carData);
    const carId = postResponse.data.data.id;

    expect(postResponse.status).toBe(201);

    // Step 2: Delete User A
    await cleanupAuth(authController);
    // eslint-disable-next-line require-atomic-updates
    authController = null; // Mark as deleted so afterEach skips cleanup

    // Step 3: Create User B
    const { authController: authControllerB } = await setupAuth(client);

    // Step 4: User B tries to get User A's car
    const getResponse = await carsController.getCarById(carId);

    // Step 5: Should return 404 (User B can't access User A's car)
    expect(getResponse.status).toBe(404);
    expect(getResponse.statusText).toBe("Not Found");

    // Step 6: Clean up User B
    await cleanupAuth(authControllerB);
  });
});