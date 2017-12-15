# paratii-mediaplayer


[![js-standard-style](https://cdn.rawgit.com/feross/standard/master/badge.svg)](https://github.com/feross/standard)

Clapprjs vs videojs

**WORK IN PROGRESS**


## Installation


```bash
$ git clone https://github.com/Paratii-Video/paratii-mediaplayer
$ cd paratii-mediaplayer
$ yarn
```

## Developing

### Demo app

```bash
$ yarn run dev
```

Then visit `http://localhost:8080`.

### paratii-player

In `paratii-mediaplayer`:

```bash
$ yarn link
$ yarn run build:watch 
```
_Note: The `paratii-mediaplayer` bundle will rebuild on file changes._

In `paratii-player`:

```bash
$ yarn link paratii-mediaplayer
$ npm run dev-concurrently
```

_Note: You **will** need to restart `paratii-player` if it was previously running._

## Deploying


- Create a feature branch off of `master`
- When ready, merge into `master` and run ```yarn version <patch|minor|major> && git push --follow-tags```
 - this will have `CircleCI` publish a new version `x.x.x` to the `npm` registry
