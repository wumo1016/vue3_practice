const path = require('path')
const resolve = paths => path.resolve(__dirname, paths)

export const projectRoot = resolve('../../')
export const outDir = resolve('../../dist')
export const zpRoot = resolve('../../packages/z-plus')
export const componentRoot = path.resolve(projectRoot, 'packages/components')
