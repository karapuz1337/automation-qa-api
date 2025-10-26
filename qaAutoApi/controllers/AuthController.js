import BaseController from "./BaseController.js";

export default class AuthController extends BaseController {
  // SignUp method
  signUp(userData) {
    return this.client.post("/api/auth/signup", userData);
  }

  // SignIn method
  signIn(credentials) {
    return this.client.post("/api/auth/signin", credentials);
  }

  // deleteUser method
  deleteUser() {
    return this.client.delete("/api/users");
  }
}