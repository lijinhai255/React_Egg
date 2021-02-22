// @ts-nocheck
import { ApplyPluginsType } from '/Users/xinxin/Desktop/demo/react_egg/client/node_modules/@umijs/runtime';
import { plugin } from './plugin';

const routes = [
  {
    "path": "/",
    "component": require('@/layouts/index').default,
    "routes": [
      {
        "path": "/",
        "component": require('/Users/xinxin/Desktop/demo/react_egg/client/src/pages/home/index').default,
        "title": "首页",
        "exact": true
      },
      {
        "path": "/order",
        "component": require('/Users/xinxin/Desktop/demo/react_egg/client/src/pages/order/index').default,
        "title": "订单",
        "auth": true,
        "exact": true
      },
      {
        "path": "/user",
        "component": require('/Users/xinxin/Desktop/demo/react_egg/client/src/pages/user/index').default,
        "title": "我的",
        "auth": true,
        "exact": true
      },
      {
        "path": "/user/edit",
        "component": require('/Users/xinxin/Desktop/demo/react_egg/client/src/pages/user/edit').default,
        "title": "设置用户",
        "exact": true
      },
      {
        "path": "/search",
        "component": require('/Users/xinxin/Desktop/demo/react_egg/client/src/pages/search/index').default,
        "title": "搜索",
        "exact": true
      },
      {
        "path": "/observer",
        "component": require('/Users/xinxin/Desktop/demo/react_egg/client/src/pages/observer').default,
        "title": "observer",
        "exact": true
      },
      {
        "path": "/house",
        "component": require('/Users/xinxin/Desktop/demo/react_egg/client/src/pages/house').default,
        "title": "房屋详情",
        "exact": true
      },
      {
        "path": "/login",
        "component": require('/Users/xinxin/Desktop/demo/react_egg/client/src/pages/login').default,
        "title": "登录",
        "exact": true
      },
      {
        "path": "/register",
        "component": require('/Users/xinxin/Desktop/demo/react_egg/client/src/pages/register').default,
        "title": "注册",
        "exact": true
      }
    ]
  }
];

// allow user to extend routes
plugin.applyPlugins({
  key: 'patchRoutes',
  type: ApplyPluginsType.event,
  args: { routes },
});

export { routes };
