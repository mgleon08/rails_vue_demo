# Rails with built in vue & webpack

# Version

```ruby
ruby  2.5.1
rails 5.2.0
node  10.6.0
```

# Installation

```ruby
brew install mysql
brew install yarn
```

# Create rails project with webpacker & vue

```ruby
rails new <app_name> -T -d=mysql
rails webpacker:install
rails webpacker:install:vue
# rails new <app_name> -T -d=mysql --webpack=vue --skip-turbolinks
```

### Gemfile 設定

移除 turbolinks

```ruby
# 一開始沒 skip turbolinks, 記得移除 turbolinks
# gem 'turbolinks', '~> 5'
```

新增 foreman

```ruby
# Gemfile
gem 'foreman' # 可同時啟動 web, webpack
```
```ruby
# 新增 Procfile
web: bundle exec rails s -p 3000
webpack: ./bin/webpack-dev-server --host 127.0.0.1
```

### 新增 vue-router

```js
yarn add vue-router
```

### 更改 javescript 結構

主要希望更改為 `vue-cli` 類似的結構

* 原本 app/javescript 結構

```js
// app/javescript
.
├── app.vue
└── packs
    ├── application.js
    └── hello_vue.js
```

* 更改後的結構

 * 原本 `app.vue` 改由 rails 中的 `application.html.erb` 來負責

```js
//  app/javescript
.
└── packs
    ├── application.js
    ├── components
    │   └── home
    │       └── index.vue
    └── router
        └── index.js
```


```ruby
# app/views/application.html.erb
<!DOCTYPE html>
<html>
  <head>
    <title>RailsVueDemo</title>
    <%= csrf_meta_tags %>
    <%= csp_meta_tag %>

    <%= stylesheet_link_tag    'application', media: 'all' %>
    <%= javascript_include_tag 'application' %>
    <%= javascript_pack_tag 'application' %>
  </head>

  <body>
    <div id="app">
      <router-view></router-view>
    </div>
  </body>
</html>

```

```js
// app/javascript/packs/application.js
import Vue from 'vue/dist/vue.esm'
import router from './router';

document.addEventListener('DOMContentLoaded', () => {
  new Vue({
    el: '#app',
    router
  })
})
```


```js
// app/javascript/packs/router/index.js
import Vue from 'vue/dist/vue.esm'
import Router from 'vue-router'
Vue.use(Router)

import HomeIndex from '../components/home/index.vue'

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'HomeIndex',
      component: HomeIndex
    }
  ]
})
```

```js
// app/javascript/packs/components/home/index.vue
<template>
  <div>
    <p>{{ message }}</p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      message: "Hello Vue!"
    }
  }
}
</script>

<style scoped>
p {
  font-size: 2em;
  text-align: center;
}
</style>
```

### 新增 normalize.css & element-ui

```js
yarn add normalize.css
yarn add element-ui
```

記得 `application.html.erb` 要去新增 `stylesheet_pack_tag` 否則不會載入

```ruby
# app/views/application.html.erb
<%= stylesheet_pack_tag 'application' %>
```

```js
// app/javascript/packs/application.js
import Vue from 'vue/dist/vue.esm'
import router from './router'
import ElementUI from 'element-ui'
import lang from 'element-ui/lib/locale/lang/zh-TW'
import 'normalize.css'
import 'element-ui/lib/theme-chalk/index.css'

Vue.use(ElementUI, { lang })

document.addEventListener('DOMContentLoaded', () => {
  new Vue({
    el: '#app',
    router
  })
})
```

啟動

```
foreman start
```
