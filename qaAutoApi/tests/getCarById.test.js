import { describe, expect, test, beforeEach, afterEach } from "@jest/globals";
import CarsController from "../controllers/CarsController.js";
import { createAxiosClient } from "../helpers/axiosClient.js";
import { setupAuth, cleanupAuth } from "../helpers/authHelpers.js";
import { BRANDS, BRAND_IDS } from "../../src/fixtures/brands.js";
import { MODELS, MODEL_IDS } from "../../src/fixtures/models.js";

describe("GET /cars/:id", () => {
  const client = createAxiosClient();
  const carsController = new CarsController(client);
  let authController;

  beforeEach(async() => {
    ({ authController } = await setupAuth(client));
  });

  afterEach(async() => {
    await cleanupAuth(authController);
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
    // Step 1: Create a car with current user
    const carData = {
      carBrandId: BRAND_IDS.BMW,
      carModelId: MODEL_IDS.BMW_X5,
      mileage: 2000
    };

    // Step 2: Post a car with current user
    const postResponse = await carsController.postCar(carData);
    const carId = postResponse.data.data.id;

    // Step 3: Logout current user
    await cleanupAuth(authController);

    // Step 4: Create a NEW user
    const { authController : authController2 } = await setupAuth(client);

    // Step 5: Try to get the first user's car
    const getResponse = await carsController.getCarById(carId);

    // Step 6: Should return 404 (not authorized to see other user's cars)
    expect(getResponse.status).toBe(404);
    expect(getResponse.statusText).toBe("Not Found");

    // Step 7: Logout the new user
    await cleanupAuth(authController2);
  });
});