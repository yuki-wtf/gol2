const httpProxy = require('http-proxy')
const net = require('net')

const config = [
  {
    source: {
      host: 'local.gol2.io',
      port: 3000
    },
    target: {
      host: 'localhost',
      port: 3001
    },
  },
  {
    source: {
      host: 'local.gol2.io',
      port: 8002
    },
    target: {
      host: 'localhost',
      port: 8002
    },
  },
]

const PROXY_SOURCE = `http://${config[0].source.host}:${config[0].source.port}`
const PROXY_READY_MESSAGE = `Server now ready on ${PROXY_SOURCE}`
const PROXY_READY_BANNER = `
   ┌───${PROXY_READY_MESSAGE.replace(/./g, '─')}───┐
   │   ${PROXY_READY_MESSAGE.replace(/./g, ' ')}   │
   │   ${PROXY_READY_MESSAGE}   │
   │   ${PROXY_READY_MESSAGE.replace(/./g, ' ')}   │
   └───${PROXY_READY_MESSAGE.replace(/./g, '─')}───┘
`


function onReady() {
  for (const {source, target} of config) {
    const proxy = httpProxy.createProxyServer({
      target,
      ws: true,
    })

    proxy.on('error', () => {})

    proxy.listen(source.port, source.host)
  }

  console.log(PROXY_READY_BANNER)
}

let interval = setInterval(() => {
  const socket = net.connect(3001)

  socket.on('error', () => {})
  socket.on('ready', () => {
    clearInterval(interval)
    onReady()
  })

  setTimeout(() => {
    socket.destroy()
  }, 45)
}, 50)
