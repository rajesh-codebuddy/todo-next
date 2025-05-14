import {
  getTodosHandler,
  getTodoHandler,
  createTodoHandler,
  deleteTodoHandler,
} from "./todoHandler";

const handlers = [
  getTodosHandler,
  getTodoHandler,
  createTodoHandler,
  deleteTodoHandler,
];

export default handlers;
