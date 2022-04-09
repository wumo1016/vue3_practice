// https://github.com/vbenjs/vite-plugin-svg-icons/blob/main/README.zh_CN.md
export default {
  multipass: true, // boolean. false by default
  datauri: 'enc', // 'base64' (default), 'enc' or 'unenc'.
  js2svg: {
    indent: 2, // string with spaces or number of spaces. 4 by default
    pretty: true // boolean, false by default
  },
  plugins: [
    'preset-default', // set of built-in plugins enabled by default
    'prefixIds', // enable built-in plugins by name
    // or by expanded notation which allows to configure plugin
    {
      name: 'sortAttrs',
      params: {
        xmlnsOrder: 'alphabetical'
      }
    }
  ]
}
