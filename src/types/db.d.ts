import type { Post, User, Vote, Comment, Space } from '@prisma/client'

export type ExtendedPost = Post & {
  space: Space
  votes: Vote[]
  author: User
  comments: Comment[]
}