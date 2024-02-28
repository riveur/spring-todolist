import { Header } from "@/components/layouts/header";
import { Separator } from "@/components/ui/separator";
import TodoContainer from "@/components/shared/todo-container";
import AddTodoDrawer from "@/components/shared/add-todo-drawer";

export default function App() {

  return (
    <>
      <Header />
      <Separator />
      <main className="container mx-auto pt-4">
        <div className="flex justify-end pb-4">
          <AddTodoDrawer />
        </div>
        <TodoContainer />
      </main>
    </>
  );
}
