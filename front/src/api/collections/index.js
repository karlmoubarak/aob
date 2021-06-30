import axios from 'axios'

const

  URL = process.env.VUE_APP_API + '/',

  getAll = () => {
    return new Promise ((resolve, reject) => axios
      .get(URL + 'collections')
      .then(response => {
        const collections = response.data
        collections.forEach(collection => {
          collection.items = collection.Item.map(
            i => i.artwork || i.resource
          ) 
        })
        resolve(
          collections
        )
      }
      )
      .catch(error => 
        reject(
          error
        )
      )
    )
  },
    
  get = slug => {
    return new Promise ((resolve, reject) => axios
      .get(URL + 'collections?slug=' + slug)
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
  get
}
