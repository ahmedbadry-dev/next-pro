import Link from "next/link"
import { api } from "@/convex/_generated/api"
import { fetchQuery } from "convex/nextjs"
import Image from "next/image"
import { Card, CardContent, CardDescription, CardFooter, CardTitle } from "../ui/card"
import { buttonVariants } from "../ui/button"

export const BlogsList = async () => {
    await new Promise((resolve) => setTimeout(resolve, 5000))
    const blogs = await fetchQuery(api.functions.blogs.getBlogs)
    return (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {blogs?.map(blog => (
                <Card key={blog._id} className="pt-0">
                    <div className="relative h-48 w-full overflow-hidden">
                        <Image
                            src={"https://plus.unsplash.com/premium_photo-1683121710572-7723bd2e235d?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"}
                            alt={blog.title}
                            fill
                            className="rounded-t-lg"
                        />
                    </div>

                    <CardContent >
                        <Link href={`/blog/${blog._id}`}>
                            <CardTitle className="text-2xl font-light hover:text-primary">{blog.title}</CardTitle>
                        </Link>
                        <CardDescription className="text-muted-foreground line-clamp-3">{blog.content}</CardDescription>
                    </CardContent>
                    <CardFooter className="mt-auto">
                        <Link href={`/blog/${blog._id}`} className={buttonVariants({ className: 'w-full ' })}>
                            Read more
                        </Link>
                    </CardFooter>
                </Card>
            ))}
        </div>
    )
}
