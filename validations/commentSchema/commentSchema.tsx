import { Id } from '@/convex/_generated/dataModel'
import { z } from 'zod'

const commentSchema = z.object({
    blogId: z.custom<Id<'blogs'>>(),
    body: z.string().min(3)
})

type TCommentSchema = z.infer<typeof commentSchema>

export { commentSchema, type TCommentSchema }