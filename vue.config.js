const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  css : {
    loaderOptions : {
      scss : {
        additionalData: `
          @import "@/assets/scss/config.scss";
          @import "@/assets/scss/mixins.scss";
          @import "@/assets/scss/variables.scss";
        `
      }
    }
  },
  publicPath: process.env.NODE_ENV === 'production'
    ? '/voviepedia'
    : '/'
})