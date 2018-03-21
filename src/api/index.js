import {BASE, API} from './config'
import axios from 'axios'

export function getLatest() {
    const url = BASE + API.latest;
    return axios.get(url)
        .then((response) => {
            // 不 return 外面就取不到数据，类似递归return
            return Promise.resolve(response.data);
        })
        .catch((error) => {
            console.error('内部错误，错误原因: ' + error);
        })
}

export function getNews(newsId) {
  const url = BASE + API.news + `/${newsId}`;
  return axios.get(url)
    .then((response) => {
      // 不 return 外面就取不到数据，类似递归return
      return Promise.resolve(response.data);
    })
    .catch((error) => {
      console.error('内部错误，错误原因: ' + error);
    })
}

export function getPreviousNews(dateString) {
  const url = BASE + API.previous + `/${dateString}`;
  return axios.get(url)
    .then((response) => {
      // 不 return 外面就取不到数据，类似递归return
      return Promise.resolve(response.data);
    })
    .catch((error) => {
      console.error('内部错误，错误原因: ' + error);
    })
}