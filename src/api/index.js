import {BASE, API} from './config'
import axios from 'axios'

export function getLatest() {
  const url = BASE + API.latest
  axios.get(url)
  .then((response) => {
    console.log(response)
  })
  .catch((error) => {
    console.log(error)
  })
}
