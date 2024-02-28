import { ApiClient } from '@/lib/api';
import { useQuery } from '@tanstack/react-query';
import { useEffect } from 'react';

export default function useTodos() {
    const query = useQuery({
        queryKey: ['todos'],
        queryFn: () => ApiClient.getInstance().getAllTodos(),
    });

    useEffect(() => {
        if (query.error) {
            console.error(query.error);
        }
    }, [query.error]);

    return query;
}