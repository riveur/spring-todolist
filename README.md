# Spring Boot + React Vite: Todo-list application

## Requirements:

| Tech | Version |
| ---- | ------- |
| Java | 17      |
| npm  | 10.4.0  |

To run the application, you have to follow theses instructions:

1. Set up env variables (backend) in `backend/src/main/resources/env.properties` (create the file)

```sh
# DATABASE

DB_NAME=spring-todolist
DB_USERNAME=postgres
DB_PASSWORD=admin

# CORS
ALLOWED_ORIGINS=http://localhost:5173
```

2. Set up env variables (frontend) in `frontend/.env.local` (create the file)


```sh
VITE_BACKEND_URL=http://localhost:8080
```


3. Install front-end assets
```sh
cd frontend
pnpm install #or npm install
```

4. Run the application

```sh
cd frontend
pnpm dev
```

```sh
cd frontend
mvnw spring-boot:run
```

5. Ready to use !

**INFO:** You can access to api docs via [http://localhost:8080/swagger-ui.html](http://localhost:8080/swagger-ui.html)