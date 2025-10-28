export default class BaseController {
  // Takes the client (created in each test)
  constructor(client) {
    this.client = client;
  }
}