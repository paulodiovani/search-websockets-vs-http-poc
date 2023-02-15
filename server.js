import cors from 'cors'
import express from 'express'
import morgan from 'morgan'
import { Server as IoServer } from 'socket.io'
import { createServer } from 'http'
import { findMovies } from './lib/movies.js'

const port = process.env.PORT || 3000

const app = express()
const httpServer = createServer(app)
const io = new IoServer(httpServer, {
  cors: { origin: '*' }
})

// middlewares
app.use(morgan('tiny'))
app.use(cors({ credentials: true, origin: '*' }))

// routes
app.get('/movies', async (req, res) => {
  const search = req?.query?.search

  const results = await findMovies(search)
  res.json(results)
})

// socket io connections
io
  .of('/socket.io')
  .on('connection', (socket) => {
    console.log('Client connected')

    socket.on('search', async (search, callback) => {
      const results = await findMovies(search)
      callback(results)
    })
  })

// start server on provided port
httpServer.listen(port, () => {
  console.log(`Listening on port ${port}`)
})
