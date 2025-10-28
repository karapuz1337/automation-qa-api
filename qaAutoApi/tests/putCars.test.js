import { describe, expect, test, beforeEach, afterEach } from "@jest/globals";
import CarsController from "../controllers/CarsController.js";
import { createAxiosClient } from "../helpers/axiosClient.js";
import { setupAuth, cleanupAuth, waitForRateLimit } from "../helpers/authHelpers.js";
import { BRAND_IDS, BRANDS } from "../../src/fixtures/brands.js";
import { MODELS, MODEL_IDS } from "../../src/fixtures/models.js";

describe("PUT /cars/:id", () => {
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

  test("Should update car with valid data", async() => {
    // Step 1: Create a car
    const carData = {
      carBrandId: BRAND_IDS.AUDI,
      carModelId: MODEL_IDS.AUDI_TT,
      mileage: 1000
    };

    const postResponse = await carsController.postCar(carData);
    const carId = postResponse.data.data.id;

    // Step 2: Update the car
    const updateData = {
      carBrandId: BRAND_IDS.BMW,
      carModelId: MODEL_IDS.BMW_X5,
      mileage: 5000
    };

    const putResponse = await carsController.putCar(carId, updateData);

    expect(putResponse.status).toBe(200);
    expect(putResponse.data.status).toBe("ok");
    expect(putResponse.data.data).toMatchObject({
      id: carId,
      carBrandId: updateData.carBrandId,
      carModelId: updateData.carModelId,
      initialMileage: carData.mileage,        // ⚠️ Should stay the same!
      mileage: updateData.mileage,            // ✅ Updated
      brand: BRANDS.BMW.title,
      model: MODELS.BMW_X5.title,
      logo: BRANDS.BMW.logoFilename,
      updatedMileageAt: expect.any(String)
    });
  });

  test("Should update car and verify changes with GET", async() => {
    // Step 1: Create a car
    const carData = {
      carBrandId: BRAND_IDS.PORSCHE,
      carModelId: MODEL_IDS.PORSCHE_911,
      mileage: 2000
    };

    const postResponse = await carsController.postCar(carData);
    const carId = postResponse.data.data.id;

    // Step 2: Update the car
    const updateData = {
      carBrandId: BRAND_IDS.FORD,
      carModelId: MODEL_IDS.FORD_FOCUS,
      mileage: 8000
    };

    await carsController.putCar(carId, updateData);

    // Step 3: Get the car and verify changes
    const getResponse = await carsController.getCarById(carId);

    expect(getResponse.status).toBe(200);
    expect(getResponse.data.data).toMatchObject({
      id: carId,
      carBrandId: updateData.carBrandId,
      carModelId: updateData.carModelId,
      initialMileage: carData.mileage,        // ⚠️ Initial value
      mileage: updateData.mileage,            // ✅ Updated
      brand: BRANDS.FORD.title,
      model: MODELS.FORD_FOCUS.title,
      logo: BRANDS.FORD.logoFilename
    });
  });

  test("Should update only mileage without changing brand/model", async() => {
    // Step 1: Create a car
    const carData = {
      carBrandId: BRAND_IDS.AUDI,
      carModelId: MODEL_IDS.AUDI_TT,
      mileage: 1000
    };

    const postResponse = await carsController.postCar(carData);
    const carId = postResponse.data.data.id;

    // Step 2: Update only mileage (same brand/model)
    const updateData = {
      carBrandId: carData.carBrandId,
      carModelId: carData.carModelId,
      mileage: 3000  // Only mileage changed
    };

    const putResponse = await carsController.putCar(carId, updateData);

    expect(putResponse.status).toBe(200);
    expect(putResponse.data.data).toMatchObject({
      id: carId,
      carBrandId: carData.carBrandId,
      carModelId: carData.carModelId,
      initialMileage: 1000,  // ⚠️ Stays the same
      mileage: 3000,         // ✅ Updated
      brand: BRANDS.AUDI.title,
      model: MODELS.AUDI_TT.title
    });
  });

  test("Should update car multiple times", async() => {
    // Step 1: Create a car
    const carData = {
      carBrandId: BRAND_IDS.BMW,
      carModelId: MODEL_IDS.BMW_X5,
      mileage: 1000
    };

    const postResponse = await carsController.postCar(carData);
    const carId = postResponse.data.data.id;

    // Step 2: First update
    await carsController.putCar(carId, {
      carBrandId: BRAND_IDS.AUDI,
      carModelId: MODEL_IDS.AUDI_TT,
      mileage: 2000
    });

    // Step 3: Second update
    const putResponse2 = await carsController.putCar(carId, {
      carBrandId: BRAND_IDS.FORD,
      carModelId: MODEL_IDS.FORD_FOCUS,
      mileage: 3000
    });

    // Step 4: Verify final state
    expect(putResponse2.status).toBe(200);
    expect(putResponse2.data.data).toMatchObject({
      id: carId,
      carBrandId: BRAND_IDS.FORD,
      carModelId: MODEL_IDS.FORD_FOCUS,
      initialMileage: 1000,  // ⚠️ Still the original!
      mileage: 3000          // ✅ Latest update
    });
  });

  // ========== NEGATIVE TESTS ==========

  test("Should return 404 for non-existent car ID", async() => {
    const nonExistentId = 999;
    const updateData = {
      carBrandId: BRAND_IDS.AUDI,
      carModelId: MODEL_IDS.AUDI_TT,
      mileage: 5000
    };

    const response = await carsController.putCar(nonExistentId, updateData);

    expect(response.status).toBe(404);
    expect(response.statusText).toBe("Not Found");
  });

  test("Should return 404 for negative car ID", async() => {
    const negativeId = -1;
    const updateData = {
      carBrandId: BRAND_IDS.AUDI,
      carModelId: MODEL_IDS.AUDI_TT,
      mileage: 5000
    };

    const response = await carsController.putCar(negativeId, updateData);

    expect(response.status).toBe(404);
    expect(response.statusText).toBe("Not Found");
  });

  test("Should accept mismatched brand and model (API allows this) #BUG", async() => {
    // Step 1: Create a car
    const carData = {
      carBrandId: BRAND_IDS.AUDI,
      carModelId: MODEL_IDS.AUDI_TT,
      mileage: 1000
    };

    const postResponse = await carsController.postCar(carData);
    const carId = postResponse.data.data.id;

    // Step 2: Try to update with mismatched brand/model
    const updateData = {
      carBrandId: carData.carBrandId,     // Audi
      carModelId: MODEL_IDS.BMW_X5,   // ❌ BMW model!
      mileage: 2000
    };

    const putResponse = await carsController.putCar(carId, updateData);

    // API accepts this (no validation)
    expect(putResponse.status).toBe(200);

    // Verify that the mismatched model is NOT updated
    expect(putResponse.data.data).toMatchObject({
      carBrandId: carData.carBrandId,
      carModelId: carData.carModelId,
      mileage: updateData.mileage
    });

    // Note: API accepts mismatched brand/model but doesn't save them
    // Should return 400 installed
  });

  test("Should return 400 for negative mileage", async() => {
    // Step 1: Create a car
    const carData = {
      carBrandId: BRAND_IDS.AUDI,
      carModelId: MODEL_IDS.AUDI_TT,
      mileage: 1000
    };

    const postResponse = await carsController.postCar(carData);
    const carId = postResponse.data.data.id;

    // Step 2: Try to update with negative mileage
    const updateData = {
      carBrandId: carData.carBrandId,
      carModelId: carData.carModelId,
      mileage: -100  // ❌ Negative
    };

    const putResponse = await carsController.putCar(carId, updateData);

    expect(putResponse.status).toBe(400);
    expect(putResponse.statusText).toBe("Bad Request");
  });

  test("Should return 200 for missing mileage but do not change the mileage", async() => {
    // Step 1: Create a car
    const carData = {
      carBrandId: BRAND_IDS.AUDI,
      carModelId: MODEL_IDS.AUDI_TT,
      mileage: 1000
    };

    const postResponse = await carsController.postCar(carData);
    const carId = postResponse.data.data.id;

    // Step 2: Try to update with missing mileage
    const updateData = {
      carBrandId: carData.carBrandId,
      carModelId: carData.carModelId
      // mileage: missing!
    };

    const putResponse = await carsController.putCar(carId, updateData);
    expect(putResponse.status).toBe(200);
    expect(putResponse.data.data).toMatchObject({
      ...carData,
      id: carId
    });
  });

  // ========== ISOLATION TESTS ==========

  test("Should return 404 when trying to update another user's car", async() => {
    // Step 1: User A creates a car
    const carData = {
      carBrandId: BRAND_IDS.AUDI,
      carModelId: MODEL_IDS.AUDI_TT,
      mileage: 1000
    };

    const postResponse = await carsController.postCar(carData);
    const carId = postResponse.data.data.id;

    // Step 2: Cleanup User A
    await cleanupAuth(authController);
    // eslint-disable-next-line require-atomic-updates
    authController = null; // Mark as deleted so afterEach skips cleanup

    // Step 2: Create User B
    const { authController: authControllerB } = await setupAuth(client);

    // Step 3: User B tries to update User A's car
    const updateData = {
      carBrandId: BRAND_IDS.BMW,
      carModelId: MODEL_IDS.BMW_X5,
      mileage: 5000
    };

    const putResponse = await carsController.putCar(carId, updateData);

    // Step 4: Should return 404 (Not Found)
    expect(putResponse.status).toBe(404);
    expect(putResponse.statusText).toBe("Not Found");

    // Step 5: Clean up User B
    await cleanupAuth(authControllerB);

  });

  test("Should update car1 without affecting car2", async() => {
    // Step 1: Create car1
    const car1Data = {
      carBrandId: BRAND_IDS.PORSCHE,
      carModelId: MODEL_IDS.PORSCHE_CAYENNE,
      mileage: 1000
    };

    const car1Response = await carsController.postCar(car1Data);
    const car1Id = car1Response.data.data.id;

    // Step 2: Create car2
    const car2Data = {
      carBrandId: BRAND_IDS.FIAT,
      carModelId: MODEL_IDS.FIAT_PANDA,
      mileage: 5000
    };

    const car2Response = await carsController.postCar(car2Data);
    const car2Id = car2Response.data.data.id;


    // Step 3: Update car1
    const updateData = {
      carBrandId: BRAND_IDS.BMW,
      carModelId: MODEL_IDS.BMW_Z3,
      mileage: 2000
    };

    await carsController.putCar(car1Id, updateData);

    // Step 4: Get car2 - should remain unchanged
    const getCar2Response = await carsController.getCarById(car2Id);

    expect(getCar2Response.data.data).toMatchObject({
      ...car2Data,
      id: car2Id,
      initialMileage: car2Data.mileage,
      brand: BRANDS.FIAT.title,
      model: MODELS.FIAT_PANDA.title
    });
  });
});