# conveyor-server-example

## Run app

`npm run dev`

## Endpoint

### POST /goods

Field:
`color` value yang didukung `black` dan `white`

Contoh:

```
POST /goods HTTP/1.1
Host: localhost:3000
Content-Type: application/x-www-form-urlencoded

color=black
```