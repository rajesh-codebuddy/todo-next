import { TextInput } from "@mantine/core";
import { type FunctionComponent } from "react";

interface SearchTodoProps {
  handleSearchTodo: (searchQuery: string) => void;
}

const SearchTodo: FunctionComponent<SearchTodoProps> = ({
  handleSearchTodo,
}) => {
  return (
    <>
      <TextInput
        placeholder="search todos.."
        onChange={(e) => handleSearchTodo(e.target.value)}
        radius="md"
        size="md"
        mb="md"
      />
    </>
  );
};

export default SearchTodo;
