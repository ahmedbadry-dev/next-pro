'use client'

import { api } from "@/convex/_generated/api"
import { useQuery } from "convex/react"

const BlogsPage = () => {
    const blogs = useQuery(api.functions.blogs.getBlogs)
    return (
        <div>
            <h1>blogs</h1>
            {blogs && blogs.map((blog) => (
                <div key={blog._id}>
                    <h1>{blog.title}</h1>
                    <p>{blog.content}</p>
                </div>
            ))}
        </div>
    )
}

export default BlogsPage