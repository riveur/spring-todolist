import { toast } from "sonner";
import { Todo } from "@/lib/validation";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { cn } from "@/lib/utils";
import { Button } from "../ui/button";
import { CheckSquare2Icon, EditIcon, TrashIcon, XSquareIcon } from "lucide-react";
import useToggleTodoMutation from "@/hooks/use-toggle-todo-mutation";
import useDeleteTodoMutation from "@/hooks/use-delete-todo-mutation";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "../ui/alert-dialog";

type TodoCardProps = {
  todo: Todo;
}

export const TodoCard = ({ todo }: TodoCardProps) => {
  const { mutate: toggleTodo } = useToggleTodoMutation(todo.id);
  const { mutate: deleteTodo } = useDeleteTodoMutation(todo.id);

  const handleDelete = () => {
    deleteTodo(undefined, {
      onSuccess() {
        toast.success('Tâche supprimée avec succès');
      }
    });
  }
  return (
    <Card className="group">
      <CardHeader className="space-y-0 p-4 pb-2 flex flex-row justify-between items-center">
        <CardTitle className={cn('text-sm', !todo.title && 'text-muted-foreground font-normal italic')}>
          {todo.title || 'Pas de titre'}{' '}{todo.updated_at && (<span className="not-italic text-xs text-muted-foreground font-normal">(modifié)</span>)}
        </CardTitle>
        <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-75">
          <Button variant="ghost" size="icon" className="h-6 w-6" onClick={() => toggleTodo()}>
            {todo.done ? <CheckSquare2Icon className="w-4 h-4" /> : <XSquareIcon className="w-4 h-4" />}
          </Button>
          <Button variant="ghost" size="icon" className="h-6 w-6">
            <EditIcon className="w-4 h-4" />
          </Button>
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button type="button" variant="ghost" size="icon" className="h-6 w-6">
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
        </div>
      </CardHeader>
      <CardContent className={cn('p-4 pt-0')}>
        <p className="text-sm">{todo.content}</p>
      </CardContent>
    </Card>
  );
}