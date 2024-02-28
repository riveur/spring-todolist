import { ListTodoIcon } from "lucide-react";

export const Header = () => {
  return (
    <header className="container mx-auto p-4">
      <h1 className="text-xl font-bold flex items-center gap-2">
        <ListTodoIcon className="w-8 h-8" />
        Take notes with Spring
      </h1>
    </header>
  );
}