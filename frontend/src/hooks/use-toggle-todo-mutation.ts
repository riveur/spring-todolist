import { ApiClient } from '@/lib/api';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export default function useToggleTodoMutation(id: number) {
    const queryClient = useQueryClient();
    return useMutation({
        retry: false,
        mutationFn: () => ApiClient.getInstance().toggleTodoById(id),
        onSuccess() {
            queryClient.invalidateQueries({ queryKey: ['todos'] });
        }
    });
}