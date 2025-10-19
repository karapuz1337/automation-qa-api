export const validPost = {
  title: "New Test Post",
  body: "This is a test post body",
  userId: 1
};

export const postWithMaxLengthTitle = {
  title: "a".repeat(255),
  body: "Test body",
  userId: 1
};

export const postWithEmptyTitle = {
  title: "",
  body: "Test body",
  userId: 1
};

export const postWithEmptyBody = {
  title: "New Test Post",
  body: "",
  userId: 1
};
