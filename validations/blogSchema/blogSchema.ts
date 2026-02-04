import { z } from 'zod'

const blogSchema = z.object({
  title: z.string().min(3).max(50),
  content: z.string().min(10),
  image: z.instanceof(File),
})

type TBlogSchema = z.infer<typeof blogSchema>

export { blogSchema, type TBlogSchema }
