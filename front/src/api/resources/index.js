import axios from 'axios'

const

  URL = process.env.VUE_APP_API + '/',

  getAll = () => {
    return new Promise ((resolve, reject) => axios
      .get(URL + 'resources')
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
  
  post = resource => {
    return new Promise ((resolve, reject) => axios
      .post(URL + 'resources', resource)
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
  post,
}
