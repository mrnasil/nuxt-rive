export default defineAppConfig({
  ui: {
    colors: {
      primary: 'green',
      neutral: 'slate',
    },
    footer: {
      slots: {
        root: 'border-t border-default',
        left: 'text-sm text-muted',
      },
    },
  },
  seo: {
    siteName: 'Nuxt Rive',
  },
  header: {
    title: '',
    to: '/',
    logo: {
      alt: '',
      light: '',
      dark: '',
    },
    search: true,
    colorMode: true,
    links: [{
      'label': 'Docs',
      'to': '/getting-started',
      'aria-label': 'Documentation',
    }, {
      'label': 'Playground',
      'to': '/playground',
      'aria-label': 'Playground',
    }, {
      'label': 'Releases',
      'to': 'https://github.com/mrnasil/nuxt-rive/releases',
      'target': '_blank',
      'aria-label': 'Releases',
    }, {
      'icon': 'i-simple-icons-github',
      'to': 'https://github.com/mrnasil/nuxt-rive',
      'target': '_blank',
      'aria-label': 'GitHub',
    }],
  },
  footer: {
    credits: `Copyright © ${new Date().getFullYear()} Nuxt Rive`,
    colorMode: false,
    links: [{
      'icon': 'i-simple-icons-github',
      'to': 'https://github.com/mrnasil/nuxt-rive',
      'target': '_blank',
      'aria-label': 'Nuxt Rive on GitHub',
    }],
  },
  toc: {
    title: 'Table of Contents',
    bottom: {
      title: 'Community',
      links: [{
        icon: 'i-lucide-star',
        label: 'Star on GitHub',
        to: 'https://github.com/mrnasil/nuxt-rive',
        target: '_blank',
      }],
    },
  },
})
