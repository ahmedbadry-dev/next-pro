import { mutation, query } from '../_generated/server'
import { v } from 'convex/values'
import { authComponent } from '../auth'

export const createComment = mutation({
  args: {
    blogId: v.id('blogs'),
    body: v.string(),
  },
  handler: async (ctx, args) => {
    // we need the name of author
    const user = await authComponent.safeGetAuthUser(ctx)
    if (!user) {
      throw new Error('Not authorized user')
    }

    await ctx.db.insert('comments', {
      blogId: args.blogId,
      body: args.body,
      authorId: user._id,
      authorName: user.name,
    })
  },
})

export const getCommentsByBlogId = query({
  args: {
    blogId: v.id('blogs'),
  },
  handler: async (ctx, args) => {
    const comments = await ctx.db
      .query('comments')
      .filter((comment) => comment.eq(comment.field('blogId'), args.blogId))
      .order('desc')
      .collect()
    return comments
  },
})
