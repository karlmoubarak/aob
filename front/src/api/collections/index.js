import axios from 'axios'
import { objectKeysToLowercase } from '../../utils'

const

  URL = process.env.VUE_APP_API + '/',

  getAll = () => {
    return new Promise ((resolve, reject) => axios
      .get(URL + 'collections')
      .then(response => {
        const collections = response.data
        collections.forEach(collection => {
          collection.items = collection.Item.map(
            i => objectKeysToLowercase(i.resource || i.artwork )
          ) 
          delete collection.Item
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
  },
  
  post = collection => {
    return new Promise ((resolve, reject) => axios
      .post(URL + 'collections', collection)
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
  get,
  post,
}
