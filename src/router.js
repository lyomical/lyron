import Vue from 'vue'
import Router from 'vue-router'
import Home from './pages/home'
import Index from './pages/index'
import Login from './pages/login'
import Detail from './pages/detail'
import Product from './pages/product'
import Cart from './pages/cart'
import Order from './pages/order'
import OrderList from './pages/orderList'
import OrderConfirm from './pages/orderConfirm'
import OrderPay from './pages/orderPay'
import Alipay from './pages/alipay'

Vue.use(Router)

export default new Router({
    routes: [{
            path: '/',
            name: 'home',
            component: Home,
            redirect: '/index', //重定向，让默认打开index
            children: [{
                    path: '/index',
                    name: 'index',
                    component: Index
                },
                {
                    path: '/product/:id',
                    name: 'product',
                    component: Product
                },
                {
                    path: '/detail/:id',
                    name: 'detail',
                    component: Detail
                }
            ]
        },
        {
         path: '/login',
         name: 'login',
         component: Login
        },
        {
            path: '/cart',
            name: 'cart',
            component: Cart
        },
        {
            path: '/order',
            name: 'order',
            component: Order,
            //redirect: '/order/list',
            children: [{
                    path: 'list',
                    name: 'order-list',
                    component: OrderList
                },
                {
                    path: 'confirm',
                    name: 'order-confirm',
                    component: OrderConfirm
                },
                {
                    path: 'pay',
                    name: 'order-pay',
                    component: OrderPay
                },
                {
                    path: 'alipay',
                    name: 'alipay',
                    component: Alipay
                }
            ]
        }
    ]
})