import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Button, Group, TextInput } from "@mantine/core";
import { useEffect, useState, type FunctionComponent } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/router";
import { fetchTodo, handleCreateTodo, handleUpdateTodo } from "@/network/todo";
import { ITodo } from "@/types/todo/todo.entity";
import { useMutation, useQueryClient } from "@tanstack/react-query";

interface EditTodoProps {}

type FormData = {
  todoInput: string;
};

const schema = yup
  .object({
    todoInput: yup.string().required(),
  })
  .required();

export const getServerSideProps = () => {
  return { props: {} };
};

const EditTodo: FunctionComponent<EditTodoProps> = ({}) => {
  const router = useRouter();
  const [todo, setTodo] = useState<ITodo>();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>({
    resolver: yupResolver(schema),
    defaultValues: {
      todoInput: todo?.description,
    },
  });
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: (nTodo: ITodo) => handleUpdateTodo(nTodo.id, nTodo),
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ["todos"] });
    },
  });
  const onSubmit = handleSubmit((data) => {
    if (todo?.id) {
      mutation.mutate({
        ...todo,
        description: data.todoInput,
      });
      router.push("/");
    }
  });

  const getTodo = async () => {
    const id = router.query.id as string;
    if (id) {
      let response = await fetchTodo(id);
      setTodo(response);
      reset({ todoInput: response.description });
    }
  };

  useEffect(() => {
    getTodo();
  }, []);

  return (
    <>
      <form onSubmit={onSubmit}>
        <Group align="flex-start" className="flex">
          <TextInput
            placeholder="type your todo"
            {...register("todoInput")}
            error={errors.todoInput && `${errors.todoInput.message}`}
          />
          <Button type="submit">Save</Button>
          <input type="submit" className="hidden" />
        </Group>
      </form>
    </>
  );
};

export default EditTodo;
