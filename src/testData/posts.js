export const validPost = {
    title: "New Test Post",
    body: "This is a test post body",
    userId: 1
};

export const maxLengthTitle = {
        title: "a".repeat(255),
        body: "Test body",
        userId: 1
    }

export const emptyTitle = {
        title: "",
        body: "Test body",
        userId: 1
    }

export const emptyBody = {
        title: "New Test Post",
        body: "",
        userId: 1
    }

export const boundaryPosts = {
    maxLengthTitle,
    emptyTitle,
    emptyBody
}