# University Forum API documentation

## Initialization with Docker

Clone the repo and run:

```bash
docker compose up --build
```

## Authentication

Some routes require a valid **JWT token**.  
Provide it in the `Authorization` header as:

`Authorization: Bearer <your-token>`

You can get a valid token after logging in (see Auth Routes).

## Endpoints

### Auth Routes

#### Register

**POST** `/auth/register`
- `name` (string, required)
- `email` (string, required)
- `password` (string, required)

#### Login

**POST** `/auth/login`
- `email` (string, required)
- `password` (string, required)

### User Routes

**GET** `/users`

**POST** `/users`
- `name` (string, required)
- `email` (string, required)
- `password` (string, required)

#### User Profile

**GET** `/users/:userId/profile`

**PATCH** `/users/profile` (requires auth)
- `bio` (string, optional)
- `avatar_url` (string, optional)

### Post Routes

**GET** `/posts/`

**GET** `/posts/search?q=text`

**GET** `/posts/:postId`

#### Create Post

**POST** `/posts/` (requires auth)
- `title` (string, required)
- `content` (string, required)
- `faculty_id` (integer, required)
- `tag_ids` (array of integers, optional)

#### Delete Post

**DELETE** `/posts/:postId` (requires auth)

#### Update Post

**PATCH** `/posts/:postId` (requires auth)
- Fields you want to update

#### Post Replies

**GET** `/posts/:postId/replies`

**POST** `/posts/:postId/replies` (requires auth)
- `content` (string, required)

**DELETE** `/posts/:postId/replies/:replyId` (requires auth)

**PATCH** `/posts/:postId/replies/:replyId/` (requires auth)
- `content` (string, required)

#### Reply Comments 

**GET** `/posts/:postId/replies/:replyId/comments`

**POST** `/posts/:postId/replies/:replyId/comments` (requires auth)
- `content` (string, required)

**DELETE** `/posts/:postId/replies/:replyId/comments/:commentId` (requires auth)

**PATCH** `/posts/:postId/replies/:replyId/comments/:commentId` (requires auth)
- `content` (string, required)

#### Like Posts and Replies

**POST** `/posts/:postId/like` (requires auth)

**GET** `/posts/:postId/likes/count`

**POST** `/posts/:postId/replies/:replyId/like` (requires auth)

**GET** `/posts/:postId/replies/:replyId/likes/count`

### Tag Routes

**GET** `/tags`

**POST** `/tags`
- `name` (string, required)

### Faculty Routes

**GET** `/faculties`

**POST** `/faculties` (requires auth)
- `name` (string, required)
- `description` (string, required)

**GET** `/faculties/:facultyId`

**GET** `/faculties/:facultyId/posts`