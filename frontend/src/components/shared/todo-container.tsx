import useTodos from "@/hooks/use-todos";
import { AlertTriangleIcon, LoaderIcon } from "lucide-react";
import { TodoCard } from "./todo-card";

export default function TodoContainer() {
    const { data: todos, isSuccess, isError, isLoading } = useTodos();
    return (
        <>
            {isLoading && (
                <div className="grid justify-center items-center">
                    <div className="flex flex-col items-center gap-2">
                        <LoaderIcon className="w-8 h-8 animate-spin" />
                        <p>Chargement...</p>
                    </div>
                </div>
            )}
            {isError && (
                <div className="grid justify-center items-center">
                    <div className="flex flex-col items-center gap-2">
                        <AlertTriangleIcon className="w-8 h-8" />
                        <p>Une erreur est survenue</p>
                    </div>
                </div>
            )}
            {isSuccess && (
                <div className="grid lg:grid-cols-2 gap-4">
                    {todos.map((todo) => (
                        <TodoCard key={todo.id} todo={todo} />
                    ))}
                </div>
            )}
        </>
    );
}