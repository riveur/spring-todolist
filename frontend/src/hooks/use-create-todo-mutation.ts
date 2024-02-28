import { ApiClient } from "@/lib/api";
import { TodoInput } from "@/lib/validation";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export default function useCreateTodoMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    retry: false,
    mutationFn: (todo: TodoInput) => ApiClient.getInstance().createTodo(todo),
    onSuccess() {
      queryClient.invalidateQueries({ queryKey: ['todos'] });
    }
  });
}