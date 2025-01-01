import process from 'node:process'
import cloudflare from '@astrojs/cloudflare'
import netlify from '@astrojs/netlify'
import node from '@astrojs/node'
import react from '@astrojs/react'
import tailwind from '@astrojs/tailwind'
import vercel from '@astrojs/vercel'
import { defineConfig } from 'astro/config'

import { provider } from 'std-env'

const providers = {
  vercel: vercel({
    edgeMiddleware: false,
  }),
  cloudflare_pages: cloudflare(),
  netlify: netlify({
    edgeMiddleware: false,
  }),
  node: node({
    mode: 'standalone',
  }),
}

const adapterProvider = process.env.SERVER_ADAPTER || provider

export default defineConfig({
  adapter: providers[adapterProvider] || providers.node,
  integrations: [tailwind(), react()],
  vite: {
    ssr: {
      noExternal: process.env.DOCKER ? !!process.env.DOCKER : undefined,
    },
    publicDir: import.meta.env.PROD ? 'public' : 'dist',
    resolve: {
      // Use react-dom/server.edge instead of react-dom/server.browser for React 19.
      // Without this, MessageChannel from node:worker_threads needs to be polyfilled.
      alias: import.meta.env.PROD && {
        'react-dom/server': 'react-dom/server.edge',
      },
    },
  },
})
