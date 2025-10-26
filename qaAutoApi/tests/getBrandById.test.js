import { describe, expect, test, beforeEach, afterEach } from "@jest/globals";
import CarsController from "../controllers/CarsController.js";
import { createAxiosClient } from "../helpers/axiosClient.js";
import { setupAuth, cleanupAuth } from "../helpers/authHelpers.js";
import { BRAND_IDS } from "../../src/fixtures/brands.js";

describe("GET /brands/:id", () => {
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
    await cleanupAuth(authController);
  });

  // Positive test cases
  test("Should get first brand (Audi)", async() => {
    const response = await carsController.getBrandById(BRAND_IDS.AUDI);

    expect(response.status).toBe(200);
    expect(response.data.data).toEqual({
      id: BRAND_IDS.AUDI,
      title: "Audi",
      logoFilename: "audi.png"
    });
  });

  test("Should get middle brand (Ford)", async() => {
    const response = await carsController.getBrandById(BRAND_IDS.FORD);

    expect(response.status).toBe(200);
    expect(response.data.data).toEqual({
      id: BRAND_IDS.FORD,
      title: "Ford",
      logoFilename: "ford.png"
    });
  });

  test("Should get last brand (Fiat)", async() => {
    const response = await carsController.getBrandById(BRAND_IDS.FIAT);

    expect(response.status).toBe(200);
    expect(response.data.data).toEqual({
      id: BRAND_IDS.FIAT,
      title: "Fiat",
      logoFilename: "fiat.png"
    });
  });

  // Negative test case
  test("Should return 404 for non-existent brand id", async() => {
    const nonExistingId = 999;
    const response = await carsController.getBrandById(nonExistingId);

    expect(response.status).toBe(404);
    expect(response.statusText).toBe("Not Found");
  });
});