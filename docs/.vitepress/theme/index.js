import DefaultTheme from 'vitepress/theme'
import { useData } from 'vitepress'
import { h } from 'vue'

import NavLinks from './components/NavLinks.vue'

export default {
    extends: DefaultTheme,
    Layout: () => {
        const props = {}

        const { frontmatter } = useData() 

        if (frontmatter.value && frontmatter.value.layoutClass) {
            props.class = frontmatter.value.layoutClass
        }

        return h(DefaultTheme.Layout, props)
    },
    enhanceApp({ app }) {
        app.component('NavLinks', NavLinks)
    }
}