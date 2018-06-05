module.exports = (isDev) => {
  return {
    preserveWhitepace: true,
    extractCSS: !isDev, //剥离vue文件中的css为单独的css文件
    cssModules: {
      localIdentName: isDev ? '[path]-[name]-[hash:base64:6]' : '[hash:base64:6]',
      camelCase: true,
    },

  }
}