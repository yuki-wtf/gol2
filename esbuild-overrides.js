const esbuild = require('esbuild')
const Module = require('module')
const babel = require('./esbuild-plugin-babel')

const originalRequire = Module.prototype.require
const originalBuild = esbuild.build

const build = (options) => {
  return originalBuild({
    ...options,

    plugins: [
      ...options.plugins,
      babel({
        filter: /[/]app[/].+(tsx?)$/,
        config: {
          overrides: [
            {
              test: /\.ts$/,
              plugins: [['@babel/plugin-syntax-typescript', { isTSX: false, disallowAmbiguousJSXLike: false }]],
            },
            {
              test: /\.tsx$/,
              plugins: [['@babel/plugin-syntax-typescript', { isTSX: true, disallowAmbiguousJSXLike: false }]],
            },
          ],
          plugins: ['@babel/plugin-syntax-jsx', '@emotion/babel-plugin'],
        },
      }),
    ],
  })
}

Module.prototype.require = function (id) {
  // when remix requires esbuild, it will get our modified build function from above
  if (id === 'esbuild') {
    return { ...esbuild, build }
  }
  return originalRequire.apply(this, arguments)
}
