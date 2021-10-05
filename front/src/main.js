import { createApp }  from 'vue'
import Axios          from 'axios'
import VueMarkdownIt  from 'vue3-markdown-it'

import App            from './App'
import router         from './router'
import store          from './store'
import { highlight }  from './utils'
import locale         from './locale'

const app                   = createApp(App)

const mdOpts                = {
  html                      : true,
  linkify                   : true,
  typographer               : true
}

app.config.globalProperties = {
  $highlight                : highlight,
  $mdOpts                   : mdOpts, 
  $apiURL                   : process.env.VUE_APP_API,
  $http                     : Axios,
  $locale                   : locale,
}

app
  .use(VueMarkdownIt)
  .use(router)
  .use(store)
  .mount('#app')
