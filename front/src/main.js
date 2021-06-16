import { createApp }  from 'vue'
import App            from './App'
import Axios          from 'axios'
import VueMarkdownIt  from 'vue3-markdown-it'
import router         from './router'
import store          from './store'

const app = createApp(App)

app.config.globalProperties.$apiURL = process.env.VUE_APP_API
app.config.globalProperties.$http   = Axios

app
  .use(VueMarkdownIt)
  .use(router)
  .use(store)
  .mount('#app')



