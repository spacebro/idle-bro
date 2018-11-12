# idle-bro

Utility for monitoring a spacebro events and notify state update with a `idle-start` or `idle-stop`.

### Usage

idle-bro is meant to be used as is. You install it, provide a custom configuration file and run it.

You can send a `'get-idle-status'` event to get the idle status in response from `idle-bro`.

Each time a new spacebro client connects, `idle-bro` will broadcast its status.

##### Install
```sh
$ git clone git@github.com:spacebro/idle-bro.git
$ cd idle-bro/
$ npm i
```

##### Eventually use custom settings
```sh
$ cp settings/settings.default.js settings/settings.js
$ vim settings/settings.js
```

### Run

```sh
$ node index.js
```

### Settings

```js
{
  "threshold": 1000, // time (in ms) before state update (must be > 100)
  "verbose": false, // does idle-bro logs everything or not
  "events": ["*"],
  // an array of event names to listen to. you can use a wildcard
  "spacebro": {
    "host": "127.0.0.1", // host of your spacebro server
    "port": 8888, // port of your spacebro server
    "channelName": "idle-bro" // channel name you want to use (optionnal)
  }
}
```
