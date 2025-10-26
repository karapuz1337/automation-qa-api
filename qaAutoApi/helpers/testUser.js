import { faker } from "@faker-js/faker";

/**
 * Generates random user data for testing
 * Password requirements:
 * - 8 to 15 characters long
 * - At least one integer
 * - At least one capital letter
 * - At least one small letter
 */
export function generateUserData() {
  // Generate password: "Qwerty@" (7 chars) + number (1-8 digits) = 8-15 chars total
  const randomNumber = faker.number.int({ min: 1, max: 99999999 }); // 1-8 digits
  const password = `Qwerty@${randomNumber}`;

  return {
    // Trim name and lastName of any symbols
    name: faker.person.firstName().replace(/[^a-zA-Z]/g, ""),
    lastName: faker.person.lastName().replace(/[^a-zA-Z]/g, ""),
    email: faker.internet.email(),
    password,
    repeatPassword: password
  };
}