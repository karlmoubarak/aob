import axios from 'axios'

const

  URL = process.env.VUE_APP_API + '/',
    
  getAll = () => {
    return new Promise ((resolve, reject) => axios
      .get(URL + 'info')
      .then(response => {
        const info = response.data
        for (let key in info) {
          if (info[key+'AR']) {
            info[key] = {
              en: info[key],
              ar: info[key+'AR']
            }
            delete info[key+'AR']
          }
        }
        resolve(
          info
        )
      })
      .catch(error => 
        reject(
          error
        )
      )
    )
  }

export default {
  getAll,
}
