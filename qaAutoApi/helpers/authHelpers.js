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
    /* eslint-disable no-console */
    console.log("❌ Sign up failed!");
    console.log("User data:", JSON.stringify(userData, null, 2));
    console.log("API response:", JSON.stringify(signUpResponse.data, null, 2));
     
    throw new Error(`Sign up failed: ${signUpResponse.status} - ${signUpResponse.data.message}`);
  }

  // Sign in
  const signInResponse = await authController.signIn({
    email: userData.email,
    password: userData.password,
    remember: false
  });
  if (signInResponse.status !== 200) {
    throw new Error(`Sign in failed: ${signInResponse.status} - ${signInResponse.data.message}`);
  }

  return { authController, userData };
}

/**
 * Cleans up user after tests
 */
export async function cleanupAuth(authController) {
  const deleteUserResponse = await authController.deleteUser();
  if (deleteUserResponse.status !== 200) {
    throw new Error(`User deletion failed: ${deleteUserResponse.status} - ${deleteUserResponse.data.message}`);
  }
}

// Add delay to avoid rate limiting
export async function waitForRateLimit() {
  // Need ~5 seconds delay
  const delay = 5000;
  await new Promise(resolve => setTimeout(resolve, delay));
}