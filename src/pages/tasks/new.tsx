import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Button, Group, TextInput } from "@mantine/core";
import { type FunctionComponent } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/router";
import { handleCreateTodo } from "@/network/todo";

interface NewTodoProps {}

type FormData = {
  todoInput: string;
};

const schema = yup
  .object({
    todoInput: yup.string().required(),
  })
  .required();

const NewTodo: FunctionComponent<NewTodoProps> = () => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(schema),
  });
  const onSubmit = handleSubmit((data) => {
    handleCreateTodo(data.todoInput);
    router.push("/");
  });

  return (
    <>
      <form onSubmit={onSubmit}>
        <Group align="flex-start" className="flex">
          <TextInput
            placeholder="type your todo"
            {...register("todoInput")}
            error={errors.todoInput && `${errors.todoInput.message}`}
          />

          <Button type="submit">Submit</Button>
          <input type="submit" className="hidden" />
        </Group>
      </form>
    </>
  );
};

export default NewTodo;
