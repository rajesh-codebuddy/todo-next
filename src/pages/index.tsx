import CreateTodo from "@/components/modules/CreateTodo";
import ListTodo from "@/components/modules/ListTodo";
import SearchTodo from "@/components/modules/SearchTodo";
import { fetchTodos } from "@/network/todo";
import { IMockResponse } from "@/types/common";
import { ITodo } from "@/types/todo/todo.entity";
import { ITodoRequest } from "@/types/todo/todo.request";
import { Container, Paper, Title } from "@mantine/core";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { useEffect, useState } from "react";

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

  const getTodos = async () => {
    const res = await fetchTodos();
    if (res) setTodos(res.data);
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

        await getTodos();
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
      await getTodos();
    } catch (error) {
      console.log(error);
    }
  };

  const handleUpdateTodo = async (id: string, updatedTodo: ITodo) => {
    try {
      await fetch(`todos/${id}`, {
        method: "PUT",
        body: JSON.stringify(updatedTodo),
      });
      await getTodos();
    } catch (error) {
      console.log(error);
    }
  };
  const handleSearchTodo = (query: string) => {
    setSearchQuery(query);
  };
  useEffect(() => {
    getTodos();
  }, []);
  return (
    <Container>
      <SearchTodo handleSearchTodo={handleSearchTodo} />
      <CreateTodo handleCreateTodo={handleCreateTodo} />
      <ListTodo
        todo={todos}
        handleTodoDelete={handleTodoDelete}
        searchTodo={searchQuery}
        handleUpdateTodo={handleUpdateTodo}
      />
    </Container>
  );
}
