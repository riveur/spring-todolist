import { toast } from "sonner";
import { CheckSquare2Icon, RefreshCcw, SaveIcon, TrashIcon, XSquareIcon } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { EditTodoInput, EditTodoSchema, Todo } from "@/lib/validation";
import { Card, CardContent, CardHeader } from "../ui/card";
import { cn } from "@/lib/utils";
import { Button } from "../ui/button";
import useToggleTodoMutation from "@/hooks/use-toggle-todo-mutation";
import useDeleteTodoMutation from "@/hooks/use-delete-todo-mutation";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger
} from "../ui/alert-dialog";
import { Form, FormField } from "../ui/form";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import useEditTodoMutation from "@/hooks/use-edit-todo-mutation";

const unstyledInputClass = "border-none shadow-none focus-visible:ring-0 px-0";

type TodoCardProps = {
  todo: Todo;
}

export const TodoCard = ({ todo }: TodoCardProps) => {
  const { mutate: toggleTodo } = useToggleTodoMutation(todo.id);
  const { mutate: deleteTodo } = useDeleteTodoMutation(todo.id);
  const { mutate: editTodo } = useEditTodoMutation(todo.id);
  const form = useForm<EditTodoInput>({
    resolver: zodResolver(EditTodoSchema),
    defaultValues: {
      ...todo,
      title: todo.title || '',
    },
  });

  const handleDelete = () => {
    deleteTodo(undefined, {
      onSuccess() {
        toast.success('Tâche supprimée avec succès');
      }
    });
  }

  const handleEdit: SubmitHandler<EditTodoInput> = (data) => {
    editTodo(data, {
      onSuccess(responseData) {
        toast.success('Tâche modifiée avec succès');
        form.reset(responseData);
      }
    });
  }

  return (
    <Card className="group">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleEdit)}>
          <CardHeader className="space-y-0 p-4 pb-2 flex flex-row justify-between items-center">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => {
                return (
                  <Input
                    className={cn(unstyledInputClass, 'text-sm font-bold', !field.value?.length && 'font-normal italic')}
                    {...field}
                    placeholder="Sans titre"
                    value={field.value || ''}
                  />
                );
              }}
            />
            <div className={cn('flex gap-2', !form.formState.isDirty && 'opacity-0 group-hover:opacity-100 transition-opacity duration-75')}>
              {!form.formState.isDirty && (
                <>
                  <Button type="button" variant="ghost" size="icon" className="h-7 w-7" onClick={() => toggleTodo()}>
                    {todo.done ? <CheckSquare2Icon className="w-4 h-4" /> : <XSquareIcon className="w-4 h-4" />}
                  </Button>
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button type="button" variant="ghost" size="icon" className="h-7 w-7">
                        <TrashIcon className="w-4 h-4" />
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>Êtes-vous sûr de vouloir supprimer cette tâche ?</AlertDialogTitle>
                        <AlertDialogDescription>
                          Cette action est irreversible.
                          Cela supprimera définitivement la tâche et retirera vos données de nos serveurs.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Annuler</AlertDialogCancel>
                        <AlertDialogAction onClick={() => handleDelete()}>Supprimer</AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </>
              )}
              {form.formState.isDirty && (
                <>
                  <Button type="submit" variant="ghost" size="icon" className="h-7 w-7">
                    <SaveIcon className="w-4 h-4" />
                  </Button>
                  <Button type="button" variant="ghost" size="icon" className="h-7 w-7" onClick={() => form.reset()}>
                    <RefreshCcw className="w-4 h-4" />
                  </Button>
                </>
              )}
            </div>
          </CardHeader>
          <CardContent className={cn('p-4 pt-0')}>
            <FormField
              control={form.control}
              name="content"
              render={({ field }) => {
                return (
                  <Textarea
                    className={cn(unstyledInputClass, 'text-sm min-h-10')}
                    {...field}
                    placeholder="Contenu de la tâche"
                  />
                );
              }}
            />
          </CardContent>
        </form>
      </Form>
    </Card>
  );
}