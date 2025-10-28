import { describe, expect, test, beforeEach, afterEach } from "@jest/globals";
import CarsController from "../controllers/CarsController.js";
import { createAxiosClient } from "../helpers/axiosClient.js";
import { setupAuth, cleanupAuth, waitForRateLimit } from "../helpers/authHelpers.js";
import { BRANDS, BRAND_IDS } from "../../src/fixtures/brands.js";
import { MODELS, MODEL_IDS } from "../../src/fixtures/models.js";

describe("POST /cars", () => {
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

  test("Should create a car with valid data", async() => {
    // Valid data
    const carData = {
      carBrandId: BRAND_IDS.AUDI,
      carModelId: MODEL_IDS.AUDI_TT,
      mileage: 1000
    };

    const response = await carsController.postCar(carData);

    expect(response.status).toBe(201);
    expect(response.data.data).toMatchObject({
      id: expect.any(Number),
      carBrandId: carData.carBrandId,
      carModelId: carData.carModelId,
      initialMileage: carData.mileage,
      mileage: carData.mileage,
      brand: BRANDS.AUDI.title,
      model: MODELS.AUDI_TT.title,
      logo: BRANDS.AUDI.logoFilename,
      updatedMileageAt: expect.any(String)
    });

    // Additional check for a valid date in the "updatedMileageAt" property
    const timestamp = response.data.data.updatedMileageAt;
    expect(new Date(timestamp).toString()).not.toBe("Invalid Date");
  });

  test("Should create a car with minimum mileage", async() => {
    // Minimum mileage
    const carData = {
      carBrandId: BRAND_IDS.BMW,
      carModelId: MODEL_IDS.BMW_X5,
      mileage: 0
    };

    const response = await carsController.postCar(carData);

    expect(response.status).toBe(201);
    expect(response.data.data).toMatchObject({
      id: expect.any(Number),
      carBrandId: carData.carBrandId,
      carModelId: carData.carModelId,
      initialMileage: carData.mileage,
      mileage: carData.mileage,
      brand: BRANDS.BMW.title,
      model: MODELS.BMW_X5.title,
      logo: BRANDS.BMW.logoFilename,
      updatedMileageAt: expect.any(String)
    });

    // Additional check for a valid date in the "updatedMileageAt" property
    const timestamp = response.data.data.updatedMileageAt;
    expect(new Date(timestamp).toString()).not.toBe("Invalid Date");
  });

  test("Should create a car with maximum mileage", async() => {
    // Maximum mileage
    const carData = {
      carBrandId: BRAND_IDS.FORD,
      carModelId: MODEL_IDS.FORD_FOCUS,
      mileage: 999999
    };

    const response = await carsController.postCar(carData);

    expect(response.status).toBe(201);
    expect(response.data.data).toMatchObject({
      id: expect.any(Number),
      carBrandId: carData.carBrandId,
      carModelId: carData.carModelId,
      initialMileage: carData.mileage,
      mileage: carData.mileage,
      brand: BRANDS.FORD.title,
      model: MODELS.FORD_FOCUS.title,
      logo: BRANDS.FORD.logoFilename,
      updatedMileageAt: expect.any(String)
    });

    // Additional check for a valid date in the "updatedMileageAt" property
    const timestamp = response.data.data.updatedMileageAt;
    expect(new Date(timestamp).toString()).not.toBe("Invalid Date");
  });

  // ========== INTEGRATION TESTS ==========

  test("Should create a car and verify it appears in GET /cars", async() => {
    // Step 1: Create a car
    const carData = {
      carBrandId: BRAND_IDS.PORSCHE,
      carModelId: MODEL_IDS.PORSCHE_911,
      mileage: 5000
    };

    const postResponse = await carsController.postCar(carData);
    const createdCarId = postResponse.data.data.id;

    expect(postResponse.status).toBe(201);

    // Step 2: Get all cars
    const getResponse = await carsController.getCars();

    expect(getResponse.status).toBe(200);
    expect(getResponse.data.status).toBe("ok");
    expect(getResponse.data.data).toHaveLength(1);  // Should have 1 car

    // Step 3: Verify the created car is in the list
    expect(getResponse.data.data[0]).toMatchObject({
      id: createdCarId,
      carBrandId: carData.carBrandId,
      carModelId: carData.carModelId,
      initialMileage: carData.mileage,
      mileage: carData.mileage,
      brand: BRANDS.PORSCHE.title,
      model: MODELS.PORSCHE_911.title,
      logo: BRANDS.PORSCHE.logoFilename,
      updatedMileageAt: expect.any(String)
    });

    // Additional check for a valid date in the "updatedMileageAt" property
    const timestamp = getResponse.data.data[0].updatedMileageAt;
    expect(new Date(timestamp).toString()).not.toBe("Invalid Date");
  });

  test("Should create multiple cars and verify all appear in GET /cars", async() => {
    // Step 1: Create first car
    const car1Data = {
      carBrandId: BRAND_IDS.AUDI,
      carModelId: MODEL_IDS.AUDI_R8,
      mileage: 1500
    };
    const car1Response = await carsController.postCar(car1Data);
    const car1Id = car1Response.data.data.id;

    expect(car1Response.status).toBe(201);

    // Step 2: Create second car
    const car2Data = {
      carBrandId: BRAND_IDS.FIAT,
      carModelId: MODEL_IDS.FIAT_PUNTO,
      mileage: 8000
    };
    const car2Response = await carsController.postCar(car2Data);
    const car2Id = car2Response.data.data.id;

    expect(car2Response.status).toBe(201);

    // Step 3: Get all cars
    const getResponse = await carsController.getCars();

    expect(getResponse.status).toBe(200);
    expect(getResponse.data.status).toBe("ok");
    expect(getResponse.data.data).toHaveLength(2);  // Should have 2 cars

    // Step 4: Verify both cars are in the list
    const carIds = getResponse.data.data.map(car => car.id);
    expect(carIds).toContain(car1Id);
    expect(carIds).toContain(car2Id);

    // Step 5: Verify first car details
    const car1InList = getResponse.data.data.find(car => car.id === car1Id);
    expect(car1InList).toMatchObject({
      id: car1Id,
      carBrandId: car1Data.carBrandId,
      carModelId: car1Data.carModelId,
      initialMileage: car1Data.mileage,
      mileage: car1Data.mileage,
      brand: BRANDS.AUDI.title,
      model: MODELS.AUDI_R8.title,
      logo: BRANDS.AUDI.logoFilename,
      updatedMileageAt: expect.any(String)
    });

    // Step 6: Verify second car details
    const car2InList = getResponse.data.data.find(car => car.id === car2Id);
    expect(car2InList).toMatchObject({
      id: car2Id,
      carBrandId: car2Data.carBrandId,
      carModelId: car2Data.carModelId,
      initialMileage: car2Data.mileage,
      mileage: car2Data.mileage,
      brand: BRANDS.FIAT.title,
      model: MODELS.FIAT_PUNTO.title,
      logo: BRANDS.FIAT.logoFilename,
      updatedMileageAt: expect.any(String)
    });
  });

  // ========== NEGATIVE TESTS ==========

  test("Should return 404 for non-existent brand", async() => {
    // Invalid carBrandId
    const carData = {
      carBrandId: 999,  // ❌ Doesn't exist
      carModelId: MODEL_IDS.AUDI_TT,
      mileage: 1000
    };

    const response = await carsController.postCar(carData);

    expect(response.status).toBe(404);
    expect(response.statusText).toBe("Not Found");
  });

  test("Should return 400 for missing mileage", async() => {
    // Invalid mileage
    const carData = {
      carBrandId: BRAND_IDS.AUDI,
      carModelId: 999,
      mileage: -100    // ❌ Negative
    };

    const response = await carsController.postCar(carData);

    expect(response.status).toBe(400);
    expect(response.statusText).toBe("Bad Request");
  });
});