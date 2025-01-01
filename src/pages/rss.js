import { getFeed } from '../lib/feed'

export const prerender = false

// RSS: http://localhost:4321/rss?url=https%3A%2F%2Fastro.build%2Frss.xml
// Atom: http://localhost:4321/rss?url=https%3A%2F%2Fwww.netlify.com%2Fcommunity-feed.xml

export async function GET(Astro) {
  const feedUrl = Astro.url.searchParams.get('url')

  if (!feedUrl) {
    return Astro.redirect('/')
  }

  const feed = await getFeed(feedUrl)

  if (!feed) {
    return Astro.redirect('/')
  }

  return new Response(feed, {
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 'public, max-age=3600',
    },
  })
}
