import { exec } from 'child_process'
import { promisify } from 'util'

const execPromise = promisify(exec)

const MOVIE_LIST = './tmp/movies.txt'

/**
  * @param {String} text
  */
const parseResponse = (text) => {
  return text
    .trim()
    .split('\n')
    .map((item) => item.substring(item.indexOf(',') + 1))
}

export const findMovies = async (search) => {
  const { stderr, stdout } = await execPromise(`grep "${search}" ${MOVIE_LIST}`)

  if (stderr) {
    console.error(stderr)
  }

  const movies = parseResponse(stdout)
  return { count: movies.length, results: movies }
}
