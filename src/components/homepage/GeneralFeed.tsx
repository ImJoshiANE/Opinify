import { db } from '@/lib/db'
import PostFeed from '../PostFeed'
import { INFINITE_SCROLL_PAGINATION_RESULTS } from '@/config'

const GeneralFeed = async () => {
  const posts = await db.post.findMany({
    orderBy: {
      createdAt: 'desc',
    },
    include: {
      votes: true,
      author: true,
      comments: true,
      space: true,
    },
    take: INFINITE_SCROLL_PAGINATION_RESULTS, // 5 to demonstrate infinite scroll, should be higher in production
  })

  return <PostFeed initialPosts={posts} />
}

export default GeneralFeed