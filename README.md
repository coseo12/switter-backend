# Switter Backend

API Spec - Switter

## Switter

### Tweet `Schema`

```json
{
    id: string, // 트윗 아이디
    text: string, // 트윗 텍스트
    createdAt: Date, // 트윗 생성 날짜
    name: string, // 사용자 이름
    username: string, // 사용자 닉네임 (아이디)
    url: string (optional), // 사용자 프로파일 사진 URL
}
```

### `GET` /tweets

💡 Get all tweets

📬 Response `200`

```json
{
  [tweet, tweet, ...n],
}
```

### `GET` /tweets?username=:username

💡 Get all tweets for user's username

📬 Response `200`

```json
{
  [tweet, tweet, ...n],
}
```

### `GET` /tweets/:id

💡 Get tweet by id

📬 Response `200`

```json
{
  tweet,
}
```

### `POST` /tweets

💡 Creating new tweet

📮 Request

```json
{
  text,
  name,
  username,
  url, (optional)
}
```

📬 Response `201`

```json
{
    tweet
}
```

### `PUT` /tweets/:id

💡 Updating tweet

📮 Request

```json
{
  text
}
```

📬 Response `200`

```json
{
    tweet
}
```

### `DELETE` /tweets/:id

💡 Updating tweet

📬 Response `204`
