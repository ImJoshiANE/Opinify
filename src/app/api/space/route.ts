import { getAuthSession } from '@/lib/auth'
import { db } from '@/lib/db'
import { SpaceValidator } from '@/lib/validators/space'
import { z } from 'zod'

export async function POST(req: Request) {
  try {
    const session = await getAuthSession()

    if (!session?.user) {
      return new Response('Unauthorized', { status: 401 })
    }

    const body = await req.json()
    const { name } = SpaceValidator.parse(body)

    // check if Space already exists
    const spaceExists = await db.space.findFirst({
      where: {
        name,
      },
    })

    if (spaceExists) {
      return new Response('Space already exists', { status: 409 })
    }

    // create Space and associate it with the user
    const space = await db.space.create({
      data: {
        name,
        creatorId: session.user.id,
      },
    })

    // creator also has to be subscribed
    await db.subscription.create({
      data: {
        userId: session.user.id,
        spaceId: space.id,
      },
    })

    return new Response(space.name)
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new Response(error.message, { status: 422 })
    }

    return new Response('Could not create Space', { status: 500 })
  }
}