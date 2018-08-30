import { BASE, API } from './config'
import axios from 'axios'

const axiosPromise = function (url) {
  return axios.get(url)
    .then((response) => {
      // 不 return 外面就取不到数据，类似递归return
      return Promise.resolve(response.data)
    })
    .catch((error) => {
      console.error('内部错误，错误原因: ' + error)
    })
}

function getLatest() {
  const url = BASE + API.latest
  return axiosPromise(url)
}

function getNews(newsId) {
  const url = BASE + API.news + `/${newsId}`
  return axiosPromise(url)
}

function getPreviousNews(dateString) {
  const url = BASE + API.previous + `/${dateString}`
  return axiosPromise(url)
}

function getThemes() {
  const url = BASE + API.theme
  return axiosPromise(url)
}

function getThemeNews(themeNewsId) {
  const url = BASE + API.themeNews + `/${themeNewsId}`
  return axiosPromise(url)
}

export { getLatest, getNews, getPreviousNews, getThemes, getThemeNews }