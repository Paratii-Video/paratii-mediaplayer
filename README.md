<img src="https://i.imgur.com/CmTafs7.png" width="900">

[![js-standard-style](https://cdn.rawgit.com/feross/standard/master/badge.svg)](https://github.com/feross/standard) <img src="https://github.com/Paratii-Video/paratiisite/blob/master/rebrand/src/svgs/paratii-logo.svg" width="200">


🚨 This is software in active development, so you will likely find bugs. Especially if reading on an iPhone. We ❤️ people who point them out to us on Telegram or via a Github issue.

## Last release announcement

- [**Paratii Player v0.0.2 (and 7 original videos we’re delighted to watch in it**)](https://medium.com/paratii/paratii-player-v0-0-2-and-7-original-videos-were-delighted-to-watch-in-it-887302fda868)

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

- Run the following commands:

  ```
  $ git checkout master && git pull
  $ yarn version --new-version <patch|minor|major>
  $ git push --follow-tags
  ```
  This will tell `CircleCI` to build and then publish a new version `x.x.x` to the `npm` registry
