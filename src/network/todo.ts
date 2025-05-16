import { IMockResponse } from "@/types/common";
import { ITodo } from "@/types/todo/todo.entity";
import { ITodoRequest } from "@/types/todo/todo.request";

export const fetchTodos: any = async () => {
  const todosRes = await fetch("/todos", {
    method: "GET",
  });
  const response: IMockResponse<ITodo[]> = await todosRes.json();
  return response.data;
};

export const fetchTodo: any = async (id: string) => {
  const todosRes = await fetch(`/todos/${id}`, {
    method: "GET",
  });
  const response: IMockResponse<ITodo> = await todosRes.json();
  return response.data;
};

export const handleCreateTodo = async (todoDesc: string) => {
  if (todoDesc) {
    try {
      const requestBody: ITodoRequest = {
        description: todoDesc,
        isCompleted: false,
      };
      await fetch("/todos", {
        method: "POST",
        body: JSON.stringify(requestBody),
      });
    } catch (error) {
      console.log(error);
    }
  }
};

export const handleUpdateTodo = async (id: string, updatedTodo: ITodo) => {
  try {
    await fetch(`/todos/${id}`, {
      method: "PUT",
      body: JSON.stringify(updatedTodo),
    });
  } catch (error) {
    console.log(error);
  }
};

export const handleTodoDelete = async (id: string) => {
  return await fetch(`todos/${id}`, {
    method: "DELETE",
  });
};
