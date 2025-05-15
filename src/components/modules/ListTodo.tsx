import type { FunctionComponent } from "react";
import type { ITodo } from "../../types/todo/todo.entity";
import { Button, Checkbox, Group, ScrollArea, Text } from "@mantine/core";
import { useRouter } from "next/router";

interface ListTodoProps {
  todo: ITodo[];
  handleTodoDelete: (id: string) => void;
  searchTodo: string;
  handleUpdateTodo: (id: string, updatedTodo: ITodo) => void;
}

const ListTodo: FunctionComponent<ListTodoProps> = ({
  todo,
  handleTodoDelete,
  searchTodo,
  handleUpdateTodo,
}) => {
  const router = useRouter();
  const filterTodo = searchTodo
    ? todo.filter((tdo) => tdo.description.includes(searchTodo))
    : todo;

  const sortTodo = filterTodo.sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );

  const handleTodoEdit = (id: string) => {
    router.push(`tasks/${id}/edit`);
  };

  return (
    <>
      <ScrollArea style={{ height: 300 }} className="mt-4">
        {sortTodo.length === 0 ? (
          <Text>No todos</Text>
        ) : (
          sortTodo.map((tdo, idx) => (
            <div
              key={tdo.id}
              className="border-p flex justify-between py-2 px-1 hover:bg-gray-50 transition-all"
            >
              <span className="flex">
                <Checkbox
                  checked={tdo.isCompleted}
                  onChange={(event) => {
                    handleUpdateTodo(tdo.id, {
                      ...tdo,
                      isCompleted: !tdo.isCompleted,
                    });
                  }}
                />
                <Text ml={5}>{tdo.description}</Text>
              </span>
              <Group>
                <Button onClick={() => handleTodoEdit(tdo.id)}>Edit</Button>
                <Button onClick={() => handleTodoDelete(tdo.id)}>Delete</Button>
              </Group>
            </div>
          ))
        )}
      </ScrollArea>
    </>
  );
};

export default ListTodo;
