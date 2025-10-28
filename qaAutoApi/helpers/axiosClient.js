import axios from "axios";
import { wrapper } from "axios-cookiejar-support";
import { CookieJar } from "tough-cookie";
import { QAAUTO_API_URL } from "../../src/constants/api.js";

/**
 * Creates a new axios client with cookie support
 * Each test suite should create its own client for isolation
 */
export function createAxiosClient() {
  const jar = new CookieJar();
  const client = wrapper(axios.create({
    baseURL: QAAUTO_API_URL,
    validateStatus: () => true,
    jar
  }));

  return client;
}