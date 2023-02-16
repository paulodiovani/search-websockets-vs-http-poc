# Search websockets POC

Proof of concept for search engine using websockets in comparison with a REST api.

## Set up

```bash
# get movie list from https://github.com/metpallyv/MovieRecommendation
curl -o ./tmp/movies.txt https://raw.githubusercontent.com/metpallyv/MovieRecommendation/master/movies.txt
# install dependencies
npm install
# star the server
npm start
```

### Development modes

```
# run with auto reload (nodemon)
npm run dev

# debug mode (node inspect)
npm run inspect
```

## Endpoints

### `GET /movies`

Search movies using the REST HTTP API.

Params:

- `search` (string) text to search for (case insensitive)

Response:

- `{ count: number; results: strin[]; }`

Example:

```javascript
const text = 'text to search for'
const response = await fetch(`http://127.0.0.1/movies?search=${text}`)
const responseJson = await response.json()
// process results
// { count: 0, results: ['foo bar'] }
```

### `/socket`

[Socker.IO](https://socket.io/) namespace to connect and perform follo-up searches.

### Event `search`

Params:

- `search` (string) text to search for (case insensitive)
- `callback` (function) function to receive the search results on the first parameter
  + `{ count: number; results: strin[]; }`

Example:

```javascript
import io from 'socket.io-client'

const socket = io('http://localhost:3000/socket')

const text = 'text to search for'
socket.emit('search', text, (responseJson) => {
  // process results
  // { count: 0, results: ['foo bar'] }
});
```
