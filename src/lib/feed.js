export async function getFeed(feedUrl, { headers = {} } = {}) {
  const feedResponse = await fetch(feedUrl, {
    headers: {
      ...headers,
      Accept: 'application/rss+xml',
    },
    cf: {
      cacheEverything: true,
      cacheTtlByStatus: {
        200: 60 * 60,
      },
    },
  })

  let feedText = await feedResponse.text()

  const headText = feedText?.substring(0, 100)
  if (!headText?.includes('<?xml') && !headText?.includes('<rss') && !headText?.includes('<feed')) {
    return null
  }

  if (feedText.includes('<?xml-stylesheet')) {
    feedText = feedText.replace(/<\?xml-stylesheet .*\?>/, '')
  }

  let style = `<?xml-stylesheet type="text/xsl" href="/rss.xsl" ?>`
  if (!feedText.includes('<rss')) {
    style = `<?xml-stylesheet type="text/xsl" href="/atom.xsl" ?>`
  }

  return feedText.replace(/^(<\?xml .*\?>)?(.*)$/s, `$1${style}$2`)
}
