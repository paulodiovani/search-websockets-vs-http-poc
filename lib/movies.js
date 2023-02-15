import { readFileSync } from 'fs'

const MOVIE_LIST = './tmp/movies.txt'

const allMovies = readFileSync(MOVIE_LIST, { encoding: 'utf-8', flag: 'r' }).trim().split('\n')

/**
  * @param {String} text
  */
const parseResponse = (text) => {
  return text
    .map((item) => item.substring(item.indexOf(',') + 1))
}

/**
  * @param {String} search
  */
export const findMovies = async (search) => {
  try {
    if (!search) {
      return { count: 0, results: [] }
    }

    const matches = allMovies.filter((line) => line.toLocaleLowerCase().indexOf(search.toLocaleLowerCase()) >= 0)

    const movies = parseResponse(matches)
    return { count: movies.length, results: movies }
  } catch (err) {
    console.error(err)
    return { count: 0, results: [] }
  }
}
