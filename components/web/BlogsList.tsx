import Link from "next/link"
import { api } from "@/convex/_generated/api"
import { fetchQuery } from "convex/nextjs"
import Image from "next/image"
import { Card, CardContent, CardDescription, CardFooter, CardTitle } from "../ui/card"
import { buttonVariants } from "../ui/button"

export const BlogsList = async () => {
    const blogs = await fetchQuery(api.functions.blogs.getBlogs)
    return (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {blogs?.map(blog => (
                <Card key={blog._id} className="pt-0">
                    <div className="relative h-48 w-full overflow-hidden">
                        <Image
                            src={blog.imageUrl ?? "https://cdn.dribbble.com/userupload/21207141/file/original-af25d78fac8dc71b312d8b0bef78c93b.jpg"}
                            alt={blog.title}
                            fill
                            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                            className="rounded-t-lg object-cover"
                        />
                    </div>

                    <CardContent >
                        <Link href={`/blogs/${blog._id}`}>
                            <CardTitle className="text-2xl font-light hover:text-primary">{blog.title}</CardTitle>
                        </Link>
                        <CardDescription className="text-muted-foreground line-clamp-3">{blog.content}</CardDescription>
                    </CardContent>
                    <CardFooter className="mt-auto">
                        <Link href={`/blogs/${blog._id}`} className={buttonVariants({ className: 'w-full ' })}>
                            Read more
                        </Link>
                    </CardFooter>
                </Card>
            ))}
        </div>
    )
}
