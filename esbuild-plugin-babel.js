/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
const babel = require('@babel/core')
const fs = require('fs')
const path = require('path')

const pluginBabel = (options = {}) => ({
  name: 'babel',
  setup(build, { transform } = {}) {
    const { filter = /.*/, namespace = '', config = {} } = options

    const transformContents = ({ args, contents }) => {
      const babelOptions = babel.loadOptions({
        ...config,
        filename: args.path,
        caller: {
          name: 'esbuild-plugin-babel',
          supportsStaticESM: true,
        },
      })
      if (!babelOptions) return { contents }

      if (babelOptions.sourceMaps) {
        const filename = path.relative(process.cwd(), args.path)

        babelOptions.sourceFileName = filename
      }

      return new Promise((resolve, reject) => {
        babel.transform(contents, babelOptions, (error, result) => {
          error ? reject(error) : resolve({ contents: result.code })
        })
      })
    }

    if (transform) return transformContents(transform)

    build.onLoad({ filter, namespace }, async (args) => {
      const contents = await fs.promises.readFile(args.path, 'utf8')

      return {
        ...(await transformContents({ args, contents })),
        loader: args.path.endsWith('tsx') ? 'tsx' : 'ts',
      }
    })
  },
})

module.exports = pluginBabel
