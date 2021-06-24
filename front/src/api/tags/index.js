import axios from 'axios'
// import {
//   toObject,
//   sortAlphabetically,
//   sortByUpdate
// } from '../utils'

const

  URL = process.env.VUE_APP_API + '/',

  getAll = () => {
    return new Promise ((resolve, reject) => axios
      .get(URL + 'tags')
      .then(response => 
        resolve(
          response
        )
      )
      .catch(error => 
        reject(
          error
        )
      )
    )
  }

export default {
  getAll
}
