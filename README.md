# paratii-mediaplayer


[![js-standard-style](https://cdn.rawgit.com/feross/standard/master/badge.svg)](https://github.com/feross/standard)

Clapprjs vs videojs

**WORK IN PROGRESS**


## Installation


```bash
$ git clone https://github.com/Paratii-Video/paratii-mediaplayer
$ cd paratii-mediaplayer
$ npm install
```

## Developing

### Demo app

```bash
$ npm run dev
```

Then visit `http://localhost:8080`.

### paratii-player

In `paratii-mediaplayer`:

```bash
$ npm link
$ npm run build:watch 
```
_Note: The `paratii-mediaplayer` bundle will rebuild on file changes._

In `paratii-player`:

```bash
$ npm link paratii-mediaplayer
$ npm run dev-concurrently
```

_Note: You **will** need to restart `paratii-player` if it was previously running._
