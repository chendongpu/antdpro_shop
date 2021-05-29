export default [
  {
    path: '/',
    component: '../layouts/BlankLayout',
    routes: [
      {
        path: '/login',
        component: '../layouts/LoginLayout',
        routes: [
          {
            name: 'login',
            path: '/login',
            component: './Login',
          },
        ],
      },
      {
        path: '/',
        component: '../layouts/SecurityLayout',
        routes: [
          {
            path: '/',
            component: '../layouts/BasicLayout',
            routes: [
              {
                  path: '/',
                  redirect:'/dashboard'
              },
              {
                  path: '/dashboard',
                  name:'dashboard',
                  icon:'PieChartOutlined',
                  component:'@/pages/DashBoard'
              },
                {
                    path: '/user',
                    name:'user',
                    icon:'UserOutlined',
                    component:'@/pages/User'
                },
                {
                    path: '/goods',
                    name:'goods',
                    icon:'UserOutlined',
                    component:'@/pages/Goods'
                },
                 {
                    path: '/cateory',
                    name:'category',
                    icon:'UserOutlined',
                    component:'@/pages/Category'
                },
                {
                    path: '/orders',
                    name:'orders',
                    icon:'UserOutlined',
                    component:'@/pages/Orders'
                },
                {
                    path: '/slides',
                    name:'slides',
                    icon:'UserOutlined',
                    component:'@/pages/Slides'
                },
                 {
                    path: '/comments',
                    name:'comments',
                    icon:'UserOutlined',
                    component:'@/pages/Comments'
                },
              {
                component: './404',
              },
            ],
          },
          {
            component: './404',
          },
        ],
      },
    ],
  },
  {
    component: './404',
  },
];
