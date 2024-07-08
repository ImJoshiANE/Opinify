import { getAuthSession } from '@/lib/auth'
import { db } from '@/lib/db'
import { z } from 'zod'

export async function GET(req: Request) {
  const url = new URL(req.url)

  const session = await getAuthSession()

  let followedCommunitiesIds: string[] = []

  if (session) {
    const followedCommunities = await db.subscription.findMany({
      where: {
        userId: session.user.id,
      },
      include: {
        space: true,
      },
    })

    followedCommunitiesIds = followedCommunities.map((sub) => sub.space.id)
  }

  try {
    const { limit, page, spaceName } = z
      .object({
        limit: z.string(),
        page: z.string(),
        spaceName: z.string().nullish().optional(),
      })
      .parse({
        spaceName: url.searchParams.get('spaceName'),
        limit: url.searchParams.get('limit'),
        page: url.searchParams.get('page'),
      })

    let whereClause = {}

    if (spaceName) {
      whereClause = {
        space: {
          name: spaceName,
        },
      }
    } else if (session) {
      whereClause = {
        space: {
          id: {
            in: followedCommunitiesIds,
          },
        },
      }
    }

    const posts = await db.post.findMany({
      take: parseInt(limit),
      skip: (parseInt(page) - 1) * parseInt(limit), // skip should start from 0 for page 1
      orderBy: {
        createdAt: 'desc',
      },
      include: {
        space: true,
        votes: true,
        author: true,
        comments: true,
      },
      where: whereClause,
    })

    return new Response(JSON.stringify(posts))
  } catch (error) {
    return new Response('Could not fetch posts', { status: 500 })
  }
}