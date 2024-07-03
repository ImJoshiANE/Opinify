import { z } from 'zod'

export const SpaceValidator = z.object({
  name: z.string().min(3).max(21),
})

export const SpaceSubscriptionValidator = z.object({
  spaceId: z.string(),
})

export type CreateSpacePayload = z.infer<typeof SpaceValidator>
export type SubscribeToSpacePayload = z.infer<
  typeof SpaceSubscriptionValidator
>