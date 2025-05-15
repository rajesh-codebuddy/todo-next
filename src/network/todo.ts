import { IMockResponse } from "@/types/common";
import { ITodo } from "@/types/todo/todo.entity";
import { ITodoRequest } from "@/types/todo/todo.request";

export const fetchTodos: any = async (attempt: number = 1) => {
  try {
    const todosRes = await fetch("/todos", {
      method: "GET",
    });
    const response: IMockResponse<ITodo[]> = await todosRes.json();
    return response;
  } catch (error) {
    if (attempt < 3) {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      return await fetchTodos(attempt + 1);
    }
    console.log(error);
  }
};

export const fetchTodo: any = async (id: string, attempt: number = 1) => {
  try {
    const todosRes = await fetch(`/todos/${id}`, {
      method: "GET",
    });
    const response: IMockResponse<ITodo> = await todosRes.json();
    return response.data;
  } catch (error) {
    if (attempt < 3) {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      return fetchTodo(attempt + 1);
    }
    console.log(error);
  }
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
