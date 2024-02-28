import { ApiClient } from "@/lib/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export default function useDeleteTodoMutation(id: number) {
  const queryClient = useQueryClient();
  return useMutation({
    retry: false,
    mutationFn: () => ApiClient.getInstance().deleteTodo(id),
    onSuccess() {
      queryClient.invalidateQueries({ queryKey: ['todos'] });
    }
  });
}