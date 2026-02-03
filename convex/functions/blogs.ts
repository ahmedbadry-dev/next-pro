import { mutation, query } from '../_generated/server'
import { v } from 'convex/values'
import { authComponent } from '../auth'

// add blog to db
export const createBlog = mutation({
  args: { title: v.string(), content: v.string() },
  handler: async (ctx, args) => {
    // we need to check if user is authorized or not
    const user = await authComponent.safeGetAuthUser(ctx)

    if (!user) {
      throw new Error('Not authenticated')
    }
    const blogArticle = await ctx.db.insert('blogs', {
      title: args.title,
      content: args.content,
      authorId: user._id,
    })

    return blogArticle
  },
})

// fetch blogs from db
export const getBlogs = query({
  args: {},
  handler: async (ctx) => {
    const blogs = await ctx.db.query('blogs').order('desc').collect()
    return blogs
  },
})
