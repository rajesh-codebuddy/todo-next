import {
  getTodosHandler,
  getTodoHandler,
  createTodoHandler,
  deleteTodoHandler,
  updateTodoHandler,
} from "./todoHandler";

const handlers = [
  getTodosHandler,
  getTodoHandler,
  createTodoHandler,
  deleteTodoHandler,
  updateTodoHandler,
];

export default handlers;
