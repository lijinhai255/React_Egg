// @ts-nocheck
import { Plugin } from '/Users/xinxin/Desktop/demo/react_egg/client/node_modules/@umijs/runtime';

const plugin = new Plugin({
  validKeys: ['modifyClientRenderOpts','patchRoutes','rootContainer','render','onRouteChange','dva','getInitialState','request',],
});
plugin.register({
  apply: require('/Users/xinxin/Desktop/demo/react_egg/client/src/app.js'),
  path: '/Users/xinxin/Desktop/demo/react_egg/client/src/app.js',
});
plugin.register({
  apply: require('/Users/xinxin/Desktop/demo/react_egg/client/src/.umi/plugin-dva/runtime.tsx'),
  path: '/Users/xinxin/Desktop/demo/react_egg/client/src/.umi/plugin-dva/runtime.tsx',
});
plugin.register({
  apply: require('../plugin-initial-state/runtime'),
  path: '../plugin-initial-state/runtime',
});
plugin.register({
  apply: require('../plugin-model/runtime'),
  path: '../plugin-model/runtime',
});

export { plugin };
