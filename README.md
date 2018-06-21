# my-project

> A Vue.js project

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report

# run unit tests
npm run unit

# run e2e tests
npm run e2e

# run all tests
npm test
```

For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).

完善目标
0. 实现登陆
0. 首次进入网页，登陆校验
3. 用户权限验证，路由跳转限制
4. 接口报错提示
5. 与store相关的调用，放在action中执行
6. 优化界面
7. 删除操作，需要再确认
8. 查重功能
9. sidebar滚动条

10. vuex重构：
a. 与后台有关的数据, 通过action和store实现
b. vuex只处理数据, 展现相关的在view中实现
c. 接口返回数据的统一化处理,封装给action使用,返回 status, message(失败), result(成功)
d. 提示的统一化处理,封装给view使用

// 指定页面做缓存控制, 指定页面做权限控制
