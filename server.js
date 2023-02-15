import cors from 'cors'
import express from 'express'
import morgan from 'morgan'
import { findMovies } from './lib/movies.js'

const port = process.env.PORT || 3000

const app = express()

// middlewares
app.use(morgan('tiny'))
app.use(cors({ credentials: true, origin: '*' }))

// routes
app.get('/movies', async (req, res) => {
  const search = req?.query?.search

  const results = await findMovies(search)
  res.json(results)
})

// start server on provided port
app.listen(port, () => {
  console.log(`Listening on port ${port}`)
})
