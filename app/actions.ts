'use server'
import { fetchMutation, fetchQuery } from 'convex/nextjs'
import { blogSchema, TBlogSchema } from '@/validations/blogSchema/blogSchema'
import { api } from '@/convex/_generated/api'
import { redirect } from 'next/navigation'
import { authComponent } from '@/convex/auth'
import { fetchAuthMutation, getToken } from '@/lib/auth-server'
import { revalidatePath } from 'next/cache'

export async function createBlogAction(formDate: TBlogSchema) {
  try {
    // we need to get JWT token to send it to convex server
    const token = await getToken()
    // validate data
    const parsed = blogSchema.safeParse(formDate)

    if (!parsed.success) {
      throw new Error('something went wrong!')
    }

    // send image file to upload URL and receive the imageStorageId
    // first we generate the url that will upload file on it
    // this url is like a endpoint api will upload file on it
    const imageUploadUrl = await fetchMutation(
      api.functions.blogs.generateUploadUrl,
      {},
      { token }
    )

    // second we will make a post request with file to upload url then receive a storage ID.
    const res = await fetch(imageUploadUrl, {
      method: 'POST',
      headers: {
        'Content-Type': parsed.data.image.type,
      },
      body: parsed.data.image,
    })

    if (!res.ok) {
      return {
        error: 'Failed to upload image',
      }
    }

    // her we destructure the id
    const { storageId } = await res.json()

    // save this image id and other blog data into db
    await fetchMutation(
      api.functions.blogs.createBlog,
      {
        title: parsed.data.title,
        content: parsed.data.content,
        imageStorageId: storageId,
      },
      { token }
    )
  } catch (error) {
    return {
      error: 'Failed to create poste',
    }
  }

  revalidatePath('/blogs')

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
