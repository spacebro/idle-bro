'use strict'

const settings = require('standard-settings')
const { SpacebroClient } = require('spacebro-client')

let idle = false
let timer = null

let threshold = settings.get('threshold') || 1000
let lastPing = Date.now()

let events = settings.get('events') || ['*']
(!Array.isArray(events)) && (events = [events])

const client = new SpacebroClient({
  host: settings.get('spacebro:host') || '127.0.0.1',
  port: settings.get('spacebro:port') || 8888,
  channelName: settings.get('spacebro:channelName') || '',
  client: {
    name: 'idle',
    description: 'send an event when idle'
  },
  verbose: settings.get('verbose') || true
})

function setTimer () {
  timer = setTimeout(() => {
    const prev = idle
    idle = true
    client.emit('idle-start')
  }, threshold)
}

for (let i = 0; i < events.length; i++) {
  const event = events[i]
  client.on(event, (datas) => {
    clearTimeout(timer)
    if (idle) {
      client.emit('idle-stop')
      idle = false
    }
    setTimer()
  })
}

setTimer()
