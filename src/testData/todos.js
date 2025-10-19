export const validTodo = {
  title: "New Test Todo",
  completed: false,
  userId: 1
};

export const todoWithMaxLengthTitle = {
  title: "a".repeat(254),
  completed: false,
  userId: 1
};

export const boundaryTodos = {
  maxLengthTitle: todoWithMaxLengthTitle
};