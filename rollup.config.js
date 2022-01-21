import pkg from './package.json'

export default [
  {
    input: 'lib/contentful.js',
    output: [
      {
        file: pkg.main,
        format: 'cjs',
        exports: 'named'
      },
      {
        file: pkg.module,
        format: 'es'
      }
    ],
    external: [
      ...Object.keys(pkg.dependencies || {}),
      ...Object.keys(pkg.peerDependencies || {})
    ]
  }
]
