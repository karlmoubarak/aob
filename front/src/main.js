import { createApp }  from 'vue'
import Axios          from 'axios'
import VueMarkdownIt  from 'vue3-markdown-it'
import VMdEditor      from '@kangc/v-md-editor'
import githubTheme    from '@kangc/v-md-editor/lib/theme/github.js'
import enUS           from '@kangc/v-md-editor/lib/lang/en-US'

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

store.$locale               = locale

VMdEditor
  .use(githubTheme)
  
VMdEditor.lang
  .use('en-US', enUS)
  
app
  .use(VueMarkdownIt)
  .use(VMdEditor)
  .use(router)
  .use(store)
  .mount('#app')
