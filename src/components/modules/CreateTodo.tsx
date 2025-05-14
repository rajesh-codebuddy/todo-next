import { Button, Group, TextInput } from "@mantine/core";
import {
  useRef,
  useState,
  type ChangeEvent,
  type FormEvent,
  type FunctionComponent,
} from "react";

interface CreateTodoProps {
  handleCreateTodo: (todoDesc: string) => void;
}

const CreateTodo: FunctionComponent<CreateTodoProps> = ({
  handleCreateTodo,
}) => {
  const [todoDesc, setTodoDesc] = useState<string>("");
  const btnRef = useRef<HTMLButtonElement>(null);

  const handleTodoDesc = (e: ChangeEvent<HTMLInputElement>) => {
    const todoDescription = e.target.value;
    setTodoDesc(todoDescription);
  };

  return (
    <>
      <Group className="flex">
        <TextInput
          placeholder="type your todo"
          value={todoDesc}
          onChange={handleTodoDesc}
          onKeyDown={(e) => {
            if (e.key === "Enter" && btnRef.current) {
              btnRef.current.click();
            }
          }}
        />
        <Button
          onClick={() => {
            handleCreateTodo(todoDesc);
            setTodoDesc("");
          }}
          ref={btnRef}
        >
          Submit
        </Button>
      </Group>
    </>
  );
};

export default CreateTodo;
