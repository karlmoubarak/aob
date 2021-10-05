import axios from 'axios'
import {
  sortAlphabetically,
} from '../../utils'

const

  URL = process.env.VUE_APP_API + '/',

  getAll = () => {
    return new Promise ((resolve, reject) => axios
      .get(URL + 'tags')
      .then(response => 
        resolve(
          sortAlphabetically(response.data, 'Name')
        )
      )
      .catch(error => 
        reject(error)
      )
    )
  }

export default {
  getAll
}
