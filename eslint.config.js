import antfu from '@antfu/eslint-config'

export default antfu({
  ignores: ['docs'],
  formatters: true,
  astro: true,
  react: true,
  typescript: true,
  rules: {
    'no-console': ['error', { allow: ['info', 'warn', 'error'] }],
  },
})
