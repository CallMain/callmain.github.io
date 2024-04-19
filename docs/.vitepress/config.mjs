import { defineConfig } from 'vitepress'

export default defineConfig({
  title: "CallMain",
  description: "CallMain Persion Site",
  themeConfig: {
    outline: {
      label: '目录'
    },
    nav: [
      { text: '导航', link: '/' },
    ],

    sidebar: [],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/callmain' }
    ]
  }
})
