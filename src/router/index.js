// 1. 定义路由组件.
// 也可以从其他文件导入
const Home = { template: '<div>Home</div>' }

import Login from '@/components/Login.vue'
import Main from '@/components/Main.vue'
import Management from'@/components/Management.vue'
import Data from '@/components/Data.vue'
import { createRouter, createWebHistory } from 'vue-router'


// 2. 定义一些路由
// 每个路由都需要映射到一个组件。
// 我们后面再讨论嵌套路由。
const routes = [
  { path: '/', component: Home },
  { path: '/login', component: Login },
  { path: '/main', component: Main },
  { path: '/management', component: Management },
  { path: '/data', component: Data }
]

// 3. 创建路由实例并传递 `routes` 配置
// 你可以在这里输入更多的配置，但我们在这里
// 暂时保持简单
const router = createRouter({
  // 4. 内部提供了 history 模式的实现
  history: createWebHistory(),
  routes, // `routes: routes` 的缩写
})

export default router



// 现在，应用已经启动了！