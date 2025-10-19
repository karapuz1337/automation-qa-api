import {beforeAll, describe, expect, test} from "@jest/globals";
import axios from "axios";
import {PLACEHOLDER_URL} from "../src/constants/api.js";

describe("Comments API", () => {
    let availableCommentIds = [];
    let randomCommentId;

    // This runs ONCE before all tests
    beforeAll(async() => {
        const response = await axios.get(`${PLACEHOLDER_URL}/comments`);

        // Extract all comment Ids
        availableCommentIds = response.data.map(comment => comment.id);

        // Pick a random ID
        randomCommentId = availableCommentIds[Math.floor(Math.random() * availableCommentIds.length)];

    })

    test("GET /comments - Should get all comments", async() => {
        const response = await axios.get(`${PLACEHOLDER_URL}/comments`);

        // Check status
        expect(response.status).toBe(200);

        // Check if the array is returned
        expect(Array.isArray(response.data)).toBe(true);

        // Check if the array has items
        expect(response.data.length).toBeGreaterThan(0);

        // Check if each comment has correct structure
        response.data.forEach((comment) => {
            expect(comment).toMatchObject({
                id: expect.any(Number),
                postId: expect.any(Number),
                name: expect.any(String),
                email: expect.any(String),
                body: expect.any(String)
            })
        })
    })

    test("DELETE /comments/:id - Should delete a comment", async() =>{
        // Use the random id from beforeAll
        const response = await axios.delete(`${PLACEHOLDER_URL}/comments/${randomCommentId}`);

        // Check status
        expect(response.status).toBe(200);

        // Log which ID was deleted
        console.log(`Deleted commend ID: ${randomCommentId}`)
    })
})