import { mutation, query } from '../_generated/server'
import { v } from 'convex/values'
import { authComponent } from '../auth'

// add blog to db
export const createBlog = mutation({
  args: {
    title: v.string(),
    content: v.string(),
    imageStorageId: v.id('_storage'),
  },
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
      imageStorageId: args.imageStorageId,
    })

    return blogArticle
  },
})

// fetch blogs from db
export const getBlogs = query({
  args: {},
  handler: async (ctx) => {
    const blogs = await ctx.db.query('blogs').order('desc').collect()
    return Promise.all(
      blogs.map(async (blog) => {
        // we need to generate url for each image cose we store image id in db not the image url
        const url =
          blog.imageStorageId !== undefined
            ? // we generate the url for each image if it have imageId
              await ctx.storage.getUrl(blog.imageStorageId)
            : null

        return {
          ...blog,
          imageUrl: url,
        }
      })
    )
  },
})

// generating the upload url
export const generateUploadUrl = mutation({
  args: {},
  handler: async (ctx) => {
    // we need to check if user is authorized or not
    const user = await authComponent.safeGetAuthUser(ctx)
    if (!user) {
      throw new Error('Not authenticated')
    }

    // generating the upload url
    return ctx.storage.generateUploadUrl()
  },
})

// get blog by id
export const getBlogById = query({
  args: { id: v.id('blogs') },
  handler: async (ctx, args) => {
    const blog = await ctx.db.get(args.id)

    // we can handle null her or we can handle it in thr front end
    if (!blog) {
      return null
    }

    // get image url
    const resolveImageUrl =
      blog?.imageStorageId !== undefined
        ? await ctx.storage.getUrl(blog.imageStorageId)
        : null

    return {
      ...blog,
      imageUrl: resolveImageUrl,
    }
  },
})
