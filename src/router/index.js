import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const login = r => require.ensure([], () => r(require('@/page/login')), 'login')
const customer = r =>
  require.ensure([], () => r(require('@/page/customer')), 'customer')
const manage = r =>
  require.ensure([], () => r(require('@/page/manage')), 'manage')
const home = r => require.ensure([], () => r(require('@/page/home')), 'home')
const addGoods = r =>
  require.ensure([], () => r(require('@/page/addGoods')), 'addGoods')
const userList = r =>
  require.ensure([], () => r(require('@/page/userList')), 'userList')
const commentList = r =>
  require.ensure([], () => r(require('@/page/commentList')), 'commentList')
const bookingList = r =>
  require.ensure([], () => r(require('@/page/bookingList')), 'bookingList')
const newsList = r =>
  require.ensure([], () => r(require('@/page/newsList')), 'newsList')
const visitor = r =>
  require.ensure([], () => r(require('@/page/visitor')), 'visitor')
const newMember = r =>
  require.ensure([], () => r(require('@/page/newMember')), 'newMember')
const uploadImg = r =>
  require.ensure([], () => r(require('@/page/uploadImg')), 'uploadImg')
const vueEdit = r =>
  require.ensure([], () => r(require('@/page/vueEdit')), 'vueEdit')
const adminSet = r =>
  require.ensure([], () => r(require('@/page/adminSet')), 'adminSet')
const sendMessage = r =>
  require.ensure([], () => r(require('@/page/sendMessage')), 'sendMessage')
const explain = r =>
  require.ensure([], () => r(require('@/page/explain')), 'explain')
const stadium = r =>
  require.ensure([], () => r(require('@/page/stadium')), 'stadium')

const stadiumList = r =>
  require.ensure([], () => r(require('@/page/stadiumList')), 'stadiumList')
const userInfo = r =>
  require.ensure([], () => r(require('@/page/userInfo')), 'userInfo')
const adminLogin = r =>
  require.ensure([], () => r(require('@/page/adminLogin')), 'adminLogin')
// mainPage
const mainPage = r =>
  require.ensure([], () => r(require('@/page/mainPage')), 'mainPage')

const routes = [
  {
    path: '/',
    component: login,
    meta: []
  },
  {
    path: '/adminLogin',
    component: adminLogin,
    meta: []
  },
  {
    path: '/customer',
    component: customer,
    name: '',
    meta: [
      {
        requireAuth: 0
      }
    ],
    children: [
      {
        path: 'mainPage',
        component: mainPage,
        meta: []
      },
      {
        path: '',
        component: home,
        meta: [
          {
            requireAuth: 0
          }
        ]
      },
      {
        path: 'stadium',
        component: stadium,
        meta: [
          '场馆',
          '场馆介绍',
          {
            requireAuth: 0
          }
        ]
      },
      {
        path: 'userInfo',
        component: userInfo,
        meta: [
          '我的',
          '我的信息',
          {
            requireAuth: 0
          }
        ]
      }
    ]
  },
  {
    path: '/manage',
    component: manage,
    name: '',
    meta: [
      {
        requireAuth: 1
      }
    ],
    children: [
      {
        path: '',
        component: home,
        meta: [
          {
            requireAuth: 1
          }
        ]
      },
      {
        path: 'mainPage',
        component: mainPage,
        meta: []
      },
      {
        path: 'commentList',
        component: commentList,
        meta: [
          '添加数据',
          '添加商铺',
          {
            requireAuth: 1
          }
        ]
      },
      {
        path: 'addGoods',
        component: addGoods,
        meta: [
          '添加数据',
          '添加商品',
          {
            requireAuth: 1
          }
        ]
      },
      {
        path: 'userList',
        component: userList,
        meta: [
          '数据管理',
          '用户列表',
          {
            requireAuth: 1
          }
        ]
      },
      {
        path: 'commentList',
        component: commentList,
        meta: [
          '数据管理',
          '留言列表',
          {
            requireAuth: 1
          }
        ]
      },
      {
        path: 'bookingList',
        component: bookingList,
        meta: [
          '数据管理',
          '订单列表',
          {
            requireAuth: 1
          }
        ]
      },
      {
        path: 'stadiumList',
        component: stadiumList,
        meta: [
          '数据管理',
          '场馆列表',
          {
            requireAuth: 1
          }
        ]
      },
      {
        path: 'newsList',
        component: newsList,
        meta: [
          '数据管理',
          '新闻管理',
          {
            requireAuth: 1
          }
        ]
      },
      {
        path: 'visitor',
        component: visitor,
        meta: [
          '图表',
          '用户分布',
          {
            requireAuth: 1
          }
        ]
      },
      {
        path: 'newMember',
        component: newMember,
        meta: [
          '图表',
          '用户数据',
          {
            requireAuth: 1
          }
        ]
      },
      {
        path: 'uploadImg',
        component: uploadImg,
        meta: [
          '文本编辑',
          'MarkDown',
          {
            requireAuth: 1
          }
        ]
      },
      {
        path: 'vueEdit',
        component: vueEdit,
        meta: [
          '编辑',
          '文本编辑',
          {
            requireAuth: 1
          }
        ]
      },
      {
        path: 'adminSet',
        component: adminSet,
        meta: [
          '设置',
          '管理员设置',
          {
            requireAuth: 1
          }
        ]
      },
      {
        path: 'sendMessage',
        component: sendMessage,
        meta: [
          '设置',
          '发送通知',
          {
            requireAuth: 1
          }
        ]
      },
      {
        path: 'explain',
        component: explain,
        meta: [
          '说明',
          '说明',
          {
            requireAuth: 1
          }
        ]
      },
      {
        path: 'stadium',
        component: stadium,
        meta: [
          '场馆',
          '场馆介绍',
          {
            requireAuth: 1
          }
        ]
      },
      {
        path: 'userInfo',
        component: userInfo,
        meta: [
          '我的',
          '我的信息',
          {
            requireAuth: 1
          }
        ]
      }
    ]
  }
]

export default new Router({
  routes,
  strict: process.env.NODE_ENV !== 'production'
})
