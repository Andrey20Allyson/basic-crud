## Basic CRUD API

### Schemas

```ts
interface UserCreateRequestDTO {
  name: string;
  birthDate: Date;
  password: string;
}

interface UserUpdateRequestDTO {
  name?: string;
  birthDate?: Date;
  password?: string;
}

interface UserDeleteResponseBody {
  deleted: boolean;
}

interface UserResponseDTO {
  id: number;
  name: string;
  birthDate: Date;
}  
```

### End-Points

- GET /user
  ```ts
  interface QueryParams {
    page?: number;
  }

  type RespBody = UserResponseDTO[];
  ```
- GET /user/:id
  ```ts
  interface PathParams {
    id: number;
  }

  type ResBody = UserResponseDTO;
  ```
- POST /user
  ```ts
  type ReqBody = UserCreateRequestDTO;

  type ResBody = UserResponseDTO;
  ```
- PUT /user/:id
  ```ts
  interface PathParams {
    id: number;
  }

  type ReqBody = UserUpdateRequestDTO;

  type ResBody = UserResponseDTO;
  ```
- DELETE /user/:id
  ```ts
  interface PathParams {
    id: number;
  }

  type ResBody = UserDeleteResponseBody;
  ```