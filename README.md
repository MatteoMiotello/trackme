# Track.me API Backend

An easy to use application that allow you to track the stats of your links.

> Version 1.0

The Track.me API description

## Path Table

| Method | Path | Description |
| --- | --- | --- |
| GET | [/](#get) |  |
| POST | [/login](#postlogin) |  |
| POST | [/login/signup](#postloginsignup) |  |
| GET | [/resource/{id}](#getresourceid) |  |
| GET | [/resource](#getresource) |  |
| POST | [/resource/create](#postresourcecreate) |  |
| DELETE | [/resource/delete/{id}](#deleteresourcedeleteid) |  |
| GET | [/resource/logsCount/{id}](#getresourcelogscountid) |  |
| GET | [/resource/allLogs/{id}](#getresourcealllogsid) |  |

## Reference Table

| Name | Path | Description |
| --- | --- | --- |
| LoginDto | [#/components/schemas/LoginDto](#componentsschemaslogindto) |  |
| UserDto | [#/components/schemas/UserDto](#componentsschemasuserdto) |  |
| LoginResponseDto | [#/components/schemas/LoginResponseDto](#componentsschemasloginresponsedto) |  |
| SignupDto | [#/components/schemas/SignupDto](#componentsschemassignupdto) |  |
| ResourceDto | [#/components/schemas/ResourceDto](#componentsschemasresourcedto) |  |
| CreateDto | [#/components/schemas/CreateDto](#componentsschemascreatedto) |  |
| ResourceLogDto | [#/components/schemas/ResourceLogDto](#componentsschemasresourcelogdto) |  |

## Path Details

***

### [GET]/

#### Responses

- 200 

***

### [POST]/login

#### RequestBody

- application/json

```ts
{
  username: string
  password: string
}
```

#### Responses

- 400 If password is incorrect

- 401 If email is incorrect

- default Login success

`application/json`

```ts
{
  user: {
    id: number
    email: string
    password: string
    firstName: string
    lastName: string
    isActive: boolean
  }
  token: string
}
```

***

### [POST]/login/signup

#### RequestBody

- application/json

```ts
{
  email: string
  password: string
  repeatPassword: string
  firstName: string
  lastName: string
}
```

#### Responses

- default User created success

`application/json`

```ts
{
  id: number
  email: string
  password: string
  firstName: string
  lastName: string
  isActive: boolean
}
```

***

### [GET]/resource/{id}

#### Responses

- default 

`application/json`

```ts
{
  id: number
  userId: number
  token: string
  content: string
  isActive: boolean
  updatedDate: string
  createdDate: string
}
```

***

### [GET]/resource

#### Responses

- default 

`application/json`

```ts
{
  id: number
  userId: number
  token: string
  content: string
  isActive: boolean
  updatedDate: string
  createdDate: string
}[]
```

***

### [POST]/resource/create

#### RequestBody

- application/json

```ts
{
  destination: string
}
```

#### Responses

- default 

`application/json`

```ts
{
  id: number
  userId: number
  token: string
  content: string
  isActive: boolean
  updatedDate: string
  createdDate: string
}
```

***

### [DELETE]/resource/delete/{id}

#### Responses

- 200 

***

### [GET]/resource/logsCount/{id}

#### Parameters(Query)

```ts
aggregatePeriod: string
```

```ts
paramAggregations: {"name":string,"property":string}[]
```

```ts
aggregateFrom: yYYY-mm-dd
```

```ts
aggregateTo: yYYY-mm-dd
```

#### Responses

- 200 

***

### [GET]/resource/allLogs/{id}

#### Responses

- default 

`application/json`

```ts
{
  id: number
  resourceToken: string
  userAgent: string
  remoteIp: string
  request: {
  }
  updatedDate: string
  createdDate: string
}
```

## References

### #/components/schemas/LoginDto

```ts
{
  username: string
  password: string
}
```

### #/components/schemas/UserDto

```ts
{
  id: number
  email: string
  password: string
  firstName: string
  lastName: string
  isActive: boolean
}
```

### #/components/schemas/LoginResponseDto

```ts
{
  user: {
    id: number
    email: string
    password: string
    firstName: string
    lastName: string
    isActive: boolean
  }
  token: string
}
```

### #/components/schemas/SignupDto

```ts
{
  email: string
  password: string
  repeatPassword: string
  firstName: string
  lastName: string
}
```

### #/components/schemas/ResourceDto

```ts
{
  id: number
  userId: number
  token: string
  content: string
  isActive: boolean
  updatedDate: string
  createdDate: string
}
```

### #/components/schemas/CreateDto

```ts
{
  destination: string
}
```

### #/components/schemas/ResourceLogDto

```ts
{
  id: number
  resourceToken: string
  userAgent: string
  remoteIp: string
  request: {
  }
  updatedDate: string
  createdDate: string
}
```
