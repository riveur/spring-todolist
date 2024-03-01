import { EditTodoInput, LoginResponseSchema, TodoInput, TodoSchema, TodosSchema } from "@/lib/validation";
import { env } from "@/env/client";
import useTokenStore from "@/hooks/use-token-store";
import ky, { type Options } from "ky";

type ApiEndpoint = {
  method: AllowedMethods;
  path: string;
};

type AllowedMethods = "GET" | "POST" | "PUT" | "DELETE";

type FetchOptions = {
  body?: Record<string, unknown>;
  params?: Record<string, string | number>;
}

const APIEndpoints = {
  "get-all-todos": {
    method: "GET",
    path: "/todos",
  },
  "get-one-todo": {
    method: "GET",
    path: "/todos/:id",
  },
  "create-todo": {
    method: "POST",
    path: "/todos",
  },
  "edit-todo": {
    method: "PUT",
    path: "/todos/:id",
  },
  "delete-todo": {
    method: "DELETE",
    path: "/todos/:id",
  },
  "toggle-todo": {
    method: "POST",
    path: "/todos/:id/toggle",
  },
  "auth-login": {
    method: "POST",
    path: "/auth/login",
  },
} satisfies Record<string, ApiEndpoint>;

type Endpoints = keyof typeof APIEndpoints;

export class ApiClient {
  private static instance: ApiClient;

  private constructor() { }

  static getInstance() {
    if (!ApiClient.instance) {
      ApiClient.instance = new ApiClient();
    }

    return ApiClient.instance;
  }

  private buildEndpoint(endpoint: Endpoints, params: FetchOptions['params'] = {}) {
    const apiUrl = env.VITE_BACKEND_URL;
    let path = APIEndpoints[endpoint].path;

    Object.keys(params).forEach((key) => {
      path = path.replace(`:${key}`, params[key].toString());
    });

    return apiUrl + path;
  }

  private async fetch(path: Endpoints, options: FetchOptions = {}) {
    const endpoint = APIEndpoints[path];
    const url = this.buildEndpoint(path, options.params);
    const tokenStore = useTokenStore.getState();

    const fetchOptions: Options = {
      method: endpoint.method,
      headers: {
        'Accept': 'application/json',
      },
      hooks: {
        beforeError: [
          (error) => {
            if (error.response.status === 401) {
              tokenStore.reset();
            }
            return error;
          }
        ]
      }
    };

    if (tokenStore.getToken()) {
      fetchOptions.headers = {
        ...fetchOptions.headers,
        'Authorization': `Bearer ${tokenStore.getToken()}`,
      };
    }

    if (options.body) {
      fetchOptions.body = JSON.stringify(options.body);
      fetchOptions.headers = {
        ...fetchOptions.headers,
        'Content-Type': 'application/json',
      };
    }

    return ky(url, fetchOptions).json();
  }

  async getAllTodos() {
    return this.fetch("get-all-todos").then(TodosSchema.parse);
  }

  async getTodoById(id: number) {
    return this.fetch("get-one-todo", { params: { id } }).then(TodoSchema.parse);
  }

  async createTodo(todo: TodoInput) {
    return this.fetch("create-todo", { body: todo }).then(TodoSchema.parse);
  }

  async editTodo(id: number, todo: EditTodoInput) {
    return this.fetch("edit-todo", { params: { id }, body: todo }).then(TodoSchema.parse);
  }

  async deleteTodo(id: number) {
    return this.fetch("delete-todo", { params: { id } });
  }

  async toggleTodoById(id: number) {
    return this.fetch("toggle-todo", { params: { id } });
  }

  async login(email: string, password: string) {
    return this.fetch("auth-login", { body: { email, password } }).then(LoginResponseSchema.parse);
  }

}