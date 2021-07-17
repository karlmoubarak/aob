import { createApp }  from 'vue'
import App            from './App'
import Axios          from 'axios'
import VueMarkdownIt  from 'vue3-markdown-it'
import router         from './router'
import store          from './store'
import { highlight }  from './utils'
import locale         from './locale'

const app = createApp(App)

const mdOpts = {
  html: true,
  linkify: true,
  typographer: true
}

app.config.globalProperties.$highlight = highlight
app.config.globalProperties.$mdOpts    = mdOpts
app.config.globalProperties.$apiURL    = process.env.VUE_APP_API
app.config.globalProperties.$http      = Axios
app.config.globalProperties.$locale    = locale

app
  .use(VueMarkdownIt)
  .use(router)
  .use(store)
  .mount('#app')



