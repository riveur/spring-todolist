import { TodoInput, TodoSchema, TodosSchema } from "./validation";
import { env } from "@/env/client";
import ky, { type Options } from 'ky';

type ApiEndpoint = {
  method: AllowedMethods;
  path: string;
};

type AllowedMethods = "GET" | "POST" | "PUT" | "DELETE";

type FetchOptions = {
  body?: Record<string, unknown>;
  params?: Record<string, string | number>;
}

type Endpoints =
  "get-all-todos" |
  "get-one-todo" |
  "toggle-todo" |
  "create-todo" |
  "delete-todo";

const APIEndpoints: Record<Endpoints, ApiEndpoint> = {
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
  "delete-todo": {
    method: "DELETE",
    path: "/todos/:id",
  },
  "toggle-todo": {
    method: "POST",
    path: "/todos/:id/toggle",
  },
} as const;

export class ApiClient {
  private static instance: ApiClient;

  private constructor() { }

  static getInstance() {
    if (!ApiClient.instance) {
      ApiClient.instance = new ApiClient();
    }

    return ApiClient.instance;
  }

  private buildEndpoint<Endpoint extends Endpoints>(endpoint: Endpoint, params: FetchOptions['params'] = {}) {
    const apiUrl = env.VITE_BACKEND_URL;
    let path = APIEndpoints[endpoint].path;

    Object.keys(params).forEach((key) => {
      path = path.replace(`:${key}`, params[key].toString());
    });

    return apiUrl + path;
  }

  private async fetch<Endpoint extends Endpoints>(path: Endpoint, options: FetchOptions = {}) {
    const endpoint = APIEndpoints[path];
    const url = this.buildEndpoint(path, options.params);

    const fetchOptions: Options = {
      method: endpoint.method,
      headers: {
        'Accept': 'application/json',
      }
    };

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

  async deleteTodo(id: number) {
    return this.fetch("delete-todo", { params: { id } });
  }

  async toggleTodoById(id: number) {
    return this.fetch("toggle-todo", { params: { id } });
  }

}