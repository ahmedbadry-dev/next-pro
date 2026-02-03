'use server'
import { fetchMutation, fetchQuery } from 'convex/nextjs'
import { blogSchema, TBlogSchema } from '@/validations/blogSchema/blogSchema'
import { api } from '@/convex/_generated/api'
import { redirect } from 'next/navigation'
import { authComponent } from '@/convex/auth'
import { fetchAuthMutation, getToken } from '@/lib/auth-server'

export async function createBlogAction(formDate: TBlogSchema) {
  // we need to get JWT token to send it to convex server
  const token = await getToken()
  // validate data
  const parsed = blogSchema.safeParse(formDate)

  if (!parsed.success) {
    throw new Error('something went wrong!')
  }

  await fetchMutation(
    api.functions.blogs.createBlog,
    {
      title: parsed.data.title,
      content: parsed.data.content,
    },
    { token }
  )

  // => we can use this it get the token directly
  // await fetchAuthMutation(api.functions.blogs.createBlog, {
  //   title: parsed.data.title,
  //   content: parsed.data.content,
  // })

  // redirect('/')
}

export async function getAllBlogs() {
  await fetchQuery(api.functions.blogs.getBlogs)
}
