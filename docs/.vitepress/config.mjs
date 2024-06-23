import { defineConfig } from 'vitepress'

export default defineConfig({
  title: "CallMain",
  description: "CallMain Persion Site",
  themeConfig: {
    search: {
      provider: 'local'
    },
    outline: {
      label: '目录'
    },
    nav: [
      {
        text: 'Java',
        items: [
          {
            text: '消息队列',
            link: '/java/mq/jmsconnect.md'
          },
          {
            text: 'Java增强',
            link: '/java/classenhance/index.md'
          }
        ]
      },
      {
        text: '前端',
        items: [
          {
            text: 'PDF处理',
            link: '/front/pdf/view.md'
          }
        ]
      },
      {
        text: '其它',
        items: [
          {
            text: '运维',
            link: '/opex/linuxbash.md'
          }
        ]
      },
      {
        text: '插件开发',
        items: [
          {
            text: 'Chrome窗口定位插件',
            link: '/plugindev/chrome/newwindow.md'
          }
        ]
      }
    ],

    sidebar: {
      '/java/mq/': [
        {
          text: 'JMS通讯',
          collapsed: true,
          link: '/java/mq/jmsconnect.md'
        }
      ],
      '/java/classenhance/': [
        {
          text: '类增强',
          items:[
            {
              text: 'ByteBuddy',
              link: '/java/classenhance/bytebuddy.md'
            }
          ]
        }
      ],
      '/front/pdf/': [
        {
          text: 'PDF预览',
          link: '/front/pdf/view.md'
        },
        {
          text: 'PDF拆分合并',
          link: '/front/pdf/splitmerge.md'
        }
      ],
      '/opex/': [
        {
          text: 'Linux下Bash优化',
          link: '/opex/linuxbash.md'
        },
        {
          text: 'Linux下虚拟机安装',
          link: '/opex/kvm.md'
        },
        
      ]
    },

    socialLinks: [
      { icon: 'github', link: 'https://github.com/callmain' }
    ]
  }
})
