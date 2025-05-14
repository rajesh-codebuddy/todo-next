import CreateTodo from "@/components/modules/CreateTodo";
import ListTodo from "@/components/modules/ListTodo";
import SearchTodo from "@/components/modules/SearchTodo";
import { IMockResponse } from "@/types/common";
import { ITodo } from "@/types/todo/todo.entity";
import { ITodoRequest } from "@/types/todo/todo.request";
import { Container, Paper, Title } from "@mantine/core";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { useState } from "react";

export const getServerSideProps = (async () => {
  // Fetch data from external API
  let existsTodos: ITodo[] = [];
  try {
    const res = await fetch("https://localhost:3000/todos");
    existsTodos = await res.json();
    console.log(existsTodos);
  } catch (error) {
    console.log(error);
  }
  // Pass data to the page via props
  return { props: { existsTodos } };
}) satisfies GetServerSideProps<{ existsTodos: ITodo[] }>;

export default function Home({
  existsTodos,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const [todos, setTodos] = useState<ITodo[]>(existsTodos);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const fetchTodos = async () => {
    try {
      const todosRes = await fetch("todos", {
        method: "GET",
      });
      const response: IMockResponse<ITodo[]> = await todosRes.json();
      setTodos(response.data);
    } catch (error) {
      console.log(error);
    }
  };
  const handleCreateTodo = async (todoDesc: string) => {
    if (todoDesc) {
      try {
        const requestBody: ITodoRequest = {
          description: todoDesc,
          isCompleted: false,
        };
        await fetch("todos", {
          method: "POST",
          body: JSON.stringify(requestBody),
        });

        fetchTodos();
      } catch (error) {
        console.log(error);
      }
    }
  };
  const handleTodoDelete = async (id: string) => {
    try {
      await fetch(`todos/${id}`, {
        method: "DELETE",
      });
      fetchTodos();
    } catch (error) {
      console.log(error);
    }
  };
  const handleSearchTodo = (query: string) => {
    setSearchQuery(query);
  };
  return (
    <div className="h-screen w-screen bg-gradient-to-r from-gray-100 to-gray-400 flex items-center justify-center px-4">
      <Paper
        shadow="lg"
        radius="lg"
        className="w-full max-w-md bg-white border rounded-lg border-gray-200 p-4"
      >
        <Title order={2} mb="md" size="xl" className="text-gray-700 mb-6">
          Todo App
        </Title>
        <Container>
          <SearchTodo handleSearchTodo={handleSearchTodo} />
          <CreateTodo handleCreateTodo={handleCreateTodo} />
          <ListTodo
            todo={todos}
            handleTodoDelete={handleTodoDelete}
            searchTodo={searchQuery}
          />
        </Container>
      </Paper>
    </div>
  );
}
