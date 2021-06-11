# Switter Backend

API Spec - Switter

## Switter

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

💡 Updating tweet

📬 Response `204`
