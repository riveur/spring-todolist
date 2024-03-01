import { z } from 'zod';

export const CategorySchema = z.object({
  id: z.number(),
  name: z.string().max(255),
  color: z.string().max(255),
});

export const TodoSchema = z.object({
  id: z.number(),
  title: z.string().max(255).optional().nullable(),
  content: z.string().min(1),
  done: z.boolean(),
  category_id: z.string().optional().nullable(),
  category: CategorySchema.optional().nullable(),
  created_at: z.string().datetime(),
  updated_at: z.string().datetime().nullable(),
});

export const TodosSchema = z.array(TodoSchema);

export const CreateTodoSchema = TodoSchema.omit({ id: true, created_at: true, updated_at: true, done: true })

export const LoginInputSchema = z.object({
  email: z.string().email(),
  password: z.string(),
});

export const LoginResponseSchema = z.object({
  token: z.string(),
});

export type Category = z.infer<typeof CategorySchema>;
export type Todo = z.infer<typeof TodoSchema>;
export type TodoInput = z.infer<typeof CreateTodoSchema>;
export type LoginResponse = z.infer<typeof LoginResponseSchema>;