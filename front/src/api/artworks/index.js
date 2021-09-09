import axios from 'axios'

const

  URL = process.env.VUE_APP_API + '/',

  getAll = () => {
    return new Promise ((resolve, reject) => axios
      .get(URL + 'artworks')
      .then(response => 
        resolve(
          response.data
        )
      )
      .catch(error => 
        reject(
          error
        )
      )
    )
  },
  
  post = artwork => {
    return new Promise ((resolve, reject) => axios
      .post(URL + 'artworks', artwork)
      .then(response => 
        resolve(
          response.data
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
  getAll,
  post
}
