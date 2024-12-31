import antfu from '@antfu/eslint-config'

export default antfu({
  ignores: ['src/xslt/**/*', 'debug/**/*'],
  formatters: true,
  astro: true,
  react: true,
  typescript: true,
  rules: {
    'no-console': ['error', { allow: ['info', 'warn', 'error'] }],
  },
})
