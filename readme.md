# overwhelmingly-positive

Run development server with
```
npm start
```

Pushes to master are automatically deployed to production.

Frontpage `/` renders [src/pages/index.tsx](src/pages/index.tsx) and pages for specific games like
`/games/portal` uses the same component but with the game modal opened.

## Data Overview

### top-games-steamdb.json

```js
[
    {
    "appId": "620",
    "name": "Portal 2",
    "positive": 214848,
    "negative": 2681
    }, ...
]
```

### steam-games.json

Key: AppId
Value: Steam Game Data

```
{
  "<appid>": {
    "name": ...
  }...
}
```

### appid-to-video.json

```js
{
  "10": {
    "id": "bTDJQYV5Q58",
    "lastUpdated": "2020-11-06T17:59:59.631Z"
  }, ...
```
