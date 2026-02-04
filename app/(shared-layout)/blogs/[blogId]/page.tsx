import { buttonVariants } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { api } from "@/convex/_generated/api"
import { Id } from "@/convex/_generated/dataModel"
import { fetchQuery } from "convex/nextjs"
import { ArrowLeft } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

type BlogProps = {
    params: Promise<{ blogId: Id<"blogs"> }>
}

const Blog = async ({ params }: BlogProps) => {
    const { blogId } = await params
    const blog = await fetchQuery(api.functions.blogs.getBlogById, { id: blogId })

    if (!blog) {
        return (
            <div>
                <h1 className="text-6xl font-light text-red-500 py-20">No blog found</h1>
            </div>
        )
    }

    return (
        <div className="max-w-3xl mx-auto py-8 px-4 animate-in fade-in duration-500 relative">
            <Link className={buttonVariants({ variant: "outline", className: 'mb-4' })} href={'/blogs'}>
                <ArrowLeft className="size-4" />
                Back to blogs
            </Link>

            <div className="relative w-full h-[400] mb-2  rounded-xl overflow-hidden shadow-sm ">
                <Image
                    src={blog.imageUrl ?? "https://cdn.dribbble.com/userupload/21207141/file/original-af25d78fac8dc71b312d8b0bef78c93b.jpg"}
                    alt={blog.title ?? 'no image'}
                    fill
                    className="object-cover hover:scale-105 transition-transform decoration-500"
                />
            </div>

            <p className="text-sm text-muted-foreground flex justify-end mb-8">
                Posted on: {new Date(blog._creationTime).toLocaleDateString('en-US')}
            </p>

            <div className="space-y-4 flex flex-col">
                <h1 className="text-4xl h-12 leading-9 pl-3 tracking-tight text-foreground border-l-4 border-primary rounded-md ">
                    {blog.title}
                </h1>

                <p className="text-lg leading-relaxed text-foreground/90">
                    {blog.content}
                </p>
                <Separator className="my-8" />

            </div>
        </div>
    )
}

export default Blog
