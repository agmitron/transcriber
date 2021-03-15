# API Docs

## Authentication
### Register
If you aren't registered and logged in, you can't use this API. You will need API Token to use it for each request.
To register, you have to send a POST request like this (pseudocode): 


#### Request
```
  url: '/api/auth/register'

  method: 'POST'

  headers {
    'Content-Type': 'application/json'
  }
  
  body {
    email: string // Must be an email-format string (with @ and domain), for example: admin@admin.ru
    password: string // Must be equals or greater than 6 characters
  }
```

#### Responses
**If it's OK and there is no user with such email, you will get a response like this**: 
```
  Status: 201 Created
  Body: {
    "message": "User was succesfully created"
  }
```
**If there is some errors, you will get this:** 
```
  Status: 500 Server Error
  Body: {
    "message": "<error message>" // Error message for certain case
  }
```

### Login 
Well, when you are signed up, you will need to sign in and get JWT token to use it for other actions. 

#### Request
```
  url: '/api/auth/login'

  method: 'POST'
  
  headers {
    'Content-Type': 'application/json'
  }
  
  body {
    email: string // Must be an email-format string (with @ and domain), for example: admin@admin.ru
    password: string // Must be equals or greater than 6 characters
  }
```

#### Response
**OK**: 
```
  Status: 200
  Body: {
    "token": "hash" // API Token for next operations
    "userID": "userID",
    "email": "user@user.com"
  }
```

**Incorrect password or login**:
```
  Status: 400
  Body: {
    message: "Incorrect password"
  }
```

Another server error: 
```
  Status: 500
  Body: {
    message: "<error message>"
  }
```

Well, you have the JWT token now. Use this for transcribing. If you'll try to use routes without an API Token, **you catch the 403 error**. 

## Projects
### Create a new project
#### Request
```
  url: '/api/projects'
  method: 'POST'
  headers: {
    'authorization': 'Bearer <token>',
    'Content-Type': 'multipart/form-data'
  },
  body: {
    engine_and_lang: "yandex_ru", // This is a format to recognize what's the engine and language to use. Existing combinations: 'yandex_ru', 'wit_ru', 'wit_en'
    title: "string",
    file: File // .mp3 or .mp4
  }
```

#### Response
**OK**:
```
  Status: 201
  Body: {
    "message": "Project was created",
    "result": "Recognized text"
  }

```

**Error**:
```
  Status: 500
  Body: {
    "message": "<error message>"
  }
```
### Get project
#### Request
```
  url: '/api/projects/<id>'
  method: 'GET'
  headers: 'Bearer <token>'
```

#### Response
**OK**:
```
  Status: 200
  Body: {
    "project": {
       title: "string"
       text: "string"
       lang: "string"
       author: "string"
    },
    "message": "Project was successfully returned"
  }
```

**Error**:
```
  Status: 500
  Body {
    "message": "<error message>"
  }
```

### Get projects
#### Request
```
  url: '/api/projects'
  method: 'GET'
  headers: 'Bearer <token>'
```

#### Response
**OK**:
```
  Status: 200
  Body: {
    "projects": [{
       title: "string"
       text: "string"
       lang: "string"
       author: "string"
    }],
    "message": "Projects were successfully returned"
  }
```

**Error**:
```
  Status: 500
  Body {
    "message": "<error message>"
  }
```

### Edit project
#### Request
```
  url: '/api/projects/<id>'
  method: 'PUT'
  headers: 'Bearer <token>'
  body: {
    title?: "string",
    text?: "string"
  }
```

#### Response
**OK**:
```
  Status: 200
  Body: {
    "result": {
       title: "string"
       text: "string"
       lang: "string"
       author: "string"
    },
    "message": "Project was updated"
  }
```

**Error**:
```
  Status: 500
  Body {
    "message": "<error message>"
  }
```

**Not found**:
```
  Status: 404
  Body {
    "message": "No such project."
  }
```

## Profile
### Get my profile
#### Request
```
  url: '/api/profile'
  method: 'GET'
  headers: 'Bearer <token>'
```

#### Response
**OK**:
```
  Status: 200
  Body: {
    "result": {
       login: "string"
       password: "string"
       full_name: "string"
       email: "string"
    },
    "message": "User was found."
  }
```

**Not found**:
```
  Status: 404
  Body {
    "message": "No such user."
  }
```

**Error**:
```
  Status: 500
  Body {
    "message": "<error message>"
  }
```

### Edit my profile
#### Request
```
  url: '/api/profile'
  method: 'PUT'
  headers: 'Bearer <token>',
  body: {
       login?: "string"
       password?: "string"
       full_name?: "string"
       email?: "string"
  }
```

#### Response
**OK**:
```
  Status: 200
  Body: {
    "result": {
       login: "string"
       password: "string"
       full_name: "string"
       email: "string"
    },
    "message": "User was edited successfully."
  }
```

**Error**:
```
  Status: 500
  Body {
    "message": "<error message>"
  }
```
