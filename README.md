# Switter Backend

API Spec - Switter

- [https://switter-ac.herokuapp.com/](https://switter-ac.herokuapp.com/)

## Tweets

### `Tweet` Schema

```js
{
    id: string, // 트윗 아이디
    text: string, // 트윗 텍스트
    createdAt: Date, // 트윗 생성 날짜
    name: string, // 사용자 이름
    username: string, // 사용자 닉네임 (아이디)
    url?: string, // 사용자 프로파일 사진 URL (optional)
}
```

### `GET` /tweets

💡 Get all tweets

📬 Response `200`

```js
{
  [tweet, tweet, ...n],
}
```

### `GET` /tweets?username=:username

💡 Get all tweets for user's username

📬 Response `200`

```js
{
  [tweet, tweet, ...n],
}
```

### `GET` /tweets/:id

💡 Get tweet by id

📬 Response `200`

```js
{
  tweet,
}
```

### `POST` /tweets

💡 Creating new tweet

📮 Request

```js
{
  text,
  name,
  username,
  url?,
}
```

📬 Response `201`

```js
{
  tweet,
}
```

### `PUT` /tweets/:id

💡 Updating tweet

📮 Request

```js
{
  text,
}
```

📬 Response `200`

```js
{
  tweet,
}
```

### `DELETE` /tweets/:id

💡 Delete tweet

📬 Response `204`

## Auth

User's profile photos

- https://cdn.expcloud.co/life/uploads/2020/04/27135731/Fee-gentry-hed-shot-1.jpg

- https://widgetwhats.com/app/uploads/2019/11/free-profile-photo-whatsapp-1.png

- https://widgetwhats.com/app/uploads/2019/11/free-profile-photo-whatsapp-4-300x300.png

### `Auth` Schema

```js
{
  id: string, // 사용자의 고유한 아이디
  username: string,  // 사용자 닉네임 (아이디)
  password: string,  // 사용자 비밀번호
  name: string,  // 사용자 이름
  email: string,  // 사용자 이메일
  url?: string,  // 사용자 프로파일 사진 URL (optional)
}
```

### `POST` /auth/signup

📮 Request

```js
{
  username,
	password,
  name,
  email,
  url,
}
```

📬 Response `200`

```js
{
  token,
	username,
}
```

### `POST` /auth/login

📮 Request

```js
{
  username,
	password,
}
```

📬 Response `200`

```js
{
  token,
	username,
}
```

### `POST` /auth/logout

📬 Response `200`

### `GET` /auth/me

📬 Response `200`

```js
{
  token,
	username,
}
```

### `GET` /auth/csrf-token

📬 Response `200`

```js
{
  csrfToken,
}
```
