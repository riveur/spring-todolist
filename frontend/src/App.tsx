import { Header } from "@/components/layouts/header";
import { Separator } from "@/components/ui/separator";
import TodoContainer from "@/components/shared/todo-container";
import AddTodoDrawer from "@/components/shared/add-todo-drawer";
import useTokenStore from "./hooks/use-token-store";
import LoginForm from "./components/shared/login-form";

export default function App() {

  const isLoggedIn = useTokenStore(state => state.token).length > 0;

  if (!isLoggedIn) {
    return (
      <div className="flex items-center justify-center h-screen">
        <LoginForm />
      </div>
    );
  }

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
