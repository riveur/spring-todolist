import { FormEvent, useState } from "react";
import { toast } from "sonner";
import { Button } from "../ui/button";
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle, DrawerTrigger } from "../ui/drawer";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import useCreateTodoMutation from "@/hooks/use-create-todo-mutation";
import { CreateTodoSchema } from "@/lib/validation";

export default function AddTodoDrawer() {
  const [isOpen, setIsOpen] = useState(false);
  const { mutate: createTodo } = useCreateTodoMutation();

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);

    const data = CreateTodoSchema.parse({
      title: formData.get('title'),
      content: formData.get('content')
    });



    createTodo(data, {
      onSuccess() {
        toast.success('Tâche ajoutée avec succès');
        setIsOpen(false);
      }
    });
  }

  return (
    <Drawer open={isOpen} onOpenChange={setIsOpen}>
      <DrawerTrigger asChild>
        <Button>Ajouter une tâche</Button>
      </DrawerTrigger>
      <DrawerContent className="container mx-auto">
        <DrawerHeader>
          <DrawerTitle>Nouvelle tâche</DrawerTitle>
        </DrawerHeader>
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col p-2">
            <Input name="title" className="border-none shadow-none focus-visible:ring-0 text-lg font-bold" placeholder="Titre" />
            <Textarea name="content" placeholder="Contenu de la tâche" className="border-none shadow-none focus-visible:ring-0 resize-none" rows={10} />
            <Button type="submit">Ajouter</Button>
          </div>
        </form>
      </DrawerContent>
    </Drawer>
  );
}