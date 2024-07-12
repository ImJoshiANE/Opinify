import { getAuthSession } from "@/lib/auth";
import { db } from "@/lib/db";
import { skip } from "node:test";
import { z } from "zod";

async function getCommunityPosts(
  limit: number,
  page: number,
  spaceName: string
) {
  return await db.post.findMany({
    take: limit,
    skip: (page - 1) * limit, // skip should start from 0 for page 1
    orderBy: {
      createdAt: "desc",
    },
    include: {
      space: true,
      votes: true,
      author: true,
      comments: true,
    },
    where: {
      space: {
        name: spaceName,
      },
    },
  });
}

async function getHomePosts(limit: number, page: number) {
  const session = await getAuthSession();
  let followedCommunitiesIds: string[] = [];

  if (session) {
    const followedCommunities = await db.subscription.findMany({
      where: {
        userId: session.user.id,
      },
      include: {
        space: true,
      },
    });
    followedCommunitiesIds = followedCommunities.map((sub) => sub.space.id);
  }

  const recommendedPostCount = await db.post.count({
    where: {
      space: {
        id: {
          in: followedCommunitiesIds,
        },
      },
    },
  });

  // console.log(recommendedPostCount);

  let whereClause = {};
  let skipAmount = (page - 1) * limit;

  if (recommendedPostCount > skipAmount) {
    whereClause = {
      space: {
        id: {
          in: followedCommunitiesIds,
        },
      },
    };
  } else {
    whereClause = {
      space: {
        id: {
          notIn: followedCommunitiesIds,
        },
      },
    };
    skipAmount =
      skipAmount -
      recommendedPostCount -
      (limit - (recommendedPostCount % limit));
  }

  if(!session) {
    skipAmount = skipAmount + limit;
  }
  // console.log(recommendedPostCount);

  return await db.post.findMany({
    take: limit,
    skip: skipAmount,
    orderBy: {
      createdAt: "desc",
    },
    include: {
      space: true,
      votes: true,
      author: true,
      comments: true,
    },
    where: whereClause,
  });
}

export async function GET(req: Request) {
  const url = new URL(req.url);

  try {
    const { limit, page, spaceName } = z
      .object({
        limit: z.string(),
        page: z.string(),
        spaceName: z.string().nullish().optional(),
      })
      .parse({
        spaceName: url.searchParams.get("spaceName"),
        limit: url.searchParams.get("limit"),
        page: url.searchParams.get("page"),
      });

    const parsedLimit = parseInt(limit);
    const parsedPage = parseInt(page);

    // console.log(parsedLimit, parsedPage);

    if (spaceName) {
      const posts = await getCommunityPosts(parsedLimit, parsedPage, spaceName);
      return new Response(JSON.stringify(posts));
    }

    const posts = await getHomePosts(parsedLimit, parsedPage);
    return new Response(JSON.stringify(posts));
  } catch (error) {
    return new Response("Could not fetch posts", { status: 500 });
  }
}
