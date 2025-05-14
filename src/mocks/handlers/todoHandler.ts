import { http, HttpResponse } from "msw";
import { v4 } from "uuid";
import type { ITodo } from "../../types/todo/todo.entity";
import type { IMockResponse } from "../../types/common";

let todos: ITodo[] = [
  {
    id: "7e706ed7-5cb7-4ac4-99ac-4ec727110e92",
    description: "1st Todo",
    isCompleted: false,
    createdAt: "Wed May 14 2025 15:49:57 GMT+0530 (India Standard Time)",
  },
];

const getTodosHandler = http.get("todos", () => {
  const response: IMockResponse<ITodo[]> = {
    status: 200,
    message: "",
    data: todos,
  };
  return HttpResponse.json(response);
});

const getTodoHandler = http.get("todos/:id", ({ params }) => {
  const { id } = params;
  const todo = todos.find((todo) => todo.id === id);
  if (!todo) {
    const response: IMockResponse<any> = {
      status: 400,
      message: "todo not found",
      data: null,
    };
    return HttpResponse.json(response);
  }
  const response: IMockResponse<ITodo> = {
    status: 200,
    message: "",
    data: todo,
  };
  return HttpResponse.json(response);
});

const updateTodoHandler = http.put("todos/:id", async ({ params, request }) => {
  const { id } = params;
  const updatedTodoReq = (await request.json()) as ITodo;
  if (updatedTodoReq) {
    todos = todos.map((todo) => {
      if (todo.id === id) {
        return updatedTodoReq;
      } else {
        return todo;
      }
    });
  }
});

const deleteTodoHandler = http.delete("todos/:id", ({ params }) => {
  const { id } = params;
  const newTodos = todos.filter((todo) => todo.id !== id);
  todos = newTodos;
  const response: IMockResponse<any> = {
    status: 200,
    message: "todo deleted",
    data: null,
  };
  return HttpResponse.json(response);
});

const createTodoHandler = http.post("/todos", async ({ request }) => {
  const newTodoReq = (await request.json()) as ITodo;
  if (newTodoReq) {
    todos.push({
      id: v4(),
      description: newTodoReq.description,
      isCompleted: newTodoReq.isCompleted,
      createdAt: new Date().toString(),
    });
  }
  const response: IMockResponse<any> = {
    status: 200,
    message: "todo created",
    data: null,
  };
  return HttpResponse.json(response);
});

export {
  getTodosHandler,
  createTodoHandler,
  getTodoHandler,
  deleteTodoHandler,
  updateTodoHandler,
};
