import { ApiClient } from "@/lib/api";
import { EditTodoInput } from "@/lib/validation";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export default function useEditTodoMutation(id: number) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: EditTodoInput) => ApiClient.getInstance().editTodo(id, data),
    onSuccess() {
      queryClient.invalidateQueries({ queryKey: ['todos'] });
    }
  });
}