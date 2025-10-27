import { describe, expect, test, beforeEach, afterEach } from "@jest/globals";
import CarsController from "../controllers/CarsController.js";
import { createAxiosClient } from "../helpers/axiosClient.js";
import { setupAuth, cleanupAuth, waitForRateLimit } from "../helpers/authHelpers.js";
import {BRAND_IDS} from "../../src/fixtures/brands.js";
import {MODEL_IDS} from "../../src/fixtures/models.js";

describe("DELETE /cars/:id", () => {
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

    test("Should successfully delete an existing car", async() => {
        // Step 1: Create a car
        const carData = {
            carBrandId: BRAND_IDS.AUDI,
            carModelId: MODEL_IDS.AUDI_TT,
            mileage: 1000
        };

        const postResponse = await carsController.postCar(carData);
        const carId = postResponse.data.data.id;

        // Step 2: Delete a car
        const deleteResponse = await carsController.deleteCar(carId)

        expect(deleteResponse.status).toBe(200)
        expect(deleteResponse.data.data).toStrictEqual({
            carId: carId
        })

        // Step 3: Verify that the car is deleted
        const getResponse = await carsController.getCars()
        expect(getResponse.status).toBe(200)
        expect(getResponse.data.data).toEqual([]) // Empty array
    })

    // ========== NEGATIVE TESTS ==========

    test("Should return 404 for non-existent id", async() => {
        const nonExistentId = 999

        const deleteResponse = await carsController.deleteCar(nonExistentId)
        expect(deleteResponse.status).toBe(404)
        expect(deleteResponse.statusText).toBe("Not Found")
    })

    test("Should return 404 for negative id", async() => {
        const negativeId = -1

        const deleteResponse = await carsController.deleteCar(negativeId)
        expect(deleteResponse.status).toBe(404)
        expect(deleteResponse.statusText).toBe("Not Found")
    })

    // ========== ISOLATION TESTS ==========

    test("Should return 404 when trying to delete another user's car", async() => {
        // User A creates a car
        const carData = {
            carBrandId: BRAND_IDS.BMW,
            carModelId: MODEL_IDS.BMW_X5,
            mileage: 2000
        };

        const postResponse = await carsController.postCar(carData);
        const carId = postResponse.data.data.id;

        // Delete User A (clear session)
        await cleanupAuth(authController);
        authController = null; // Mark as deleted so afterEach skips cleanup

        // Create User B
        const { authController: authControllerB } = await setupAuth(client);

        // User B tries to delete User A's car
        const deleteResponse = await carsController.deleteCar(carId);

        // Should be denied
        expect(deleteResponse.status).toBe(404);
        expect(deleteResponse.statusText).toBe("Not Found")

        // Clean up User B
        await cleanupAuth(authControllerB);
    });
})