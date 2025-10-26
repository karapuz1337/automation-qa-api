import AuthController from "../controllers/AuthController.js";
import { generateUserData } from "./testUser.js";

/**
 * Sets up authentication for a test suite
 * Returns controllers and user data
 */
export async function setupAuth(client) {
    const authController = new AuthController(client);
    const userData = generateUserData();

    // Sign up
    const signUpResponse = await authController.signUp(userData);
    if (signUpResponse.status !== 201) {
        throw new Error(`Sign up failed: ${signUpResponse.status}`);
    }

    // Sign in
    const signInResponse = await authController.signIn({
        email: userData.email,
        password: userData.password,
        remember: false
    });
    if (signInResponse.status !== 200) {
        throw new Error(`Sign in failed: ${signInResponse.status}`);
    }

    return { authController, userData };
}

/**
 * Cleans up user after tests
 */
export async function cleanupAuth(authController) {
    const deleteUserResponse = await authController.deleteUser();
    if (deleteUserResponse.status !== 200) {
        console.warn(`User deletion failed: ${deleteUserResponse.status}`);
    }
}