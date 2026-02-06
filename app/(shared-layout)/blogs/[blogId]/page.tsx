import { buttonVariants } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { BlogPresence } from "@/components/web/BlogPresence"
import { CommentSection } from "@/components/web/CommentSection"
import { api } from "@/convex/_generated/api"
import { Id } from "@/convex/_generated/dataModel"
import { authComponent } from "@/convex/auth"
import { getToken } from "@/lib/auth-server"
import { fetchQuery, preloadQuery } from "convex/nextjs"
import { ArrowLeft } from "lucide-react"
import { Metadata, ResolvingMetadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { redirect } from "next/navigation"



type BlogProps = {
    params: Promise<{ blogId: Id<"blogs"> }>
}

export async function generateMetadata({ params }: BlogProps, parent: ResolvingMetadata): Promise<Metadata> {
    const { blogId } = await params
    const blog = await fetchQuery(api.functions.blogs.getBlogById, { id: blogId })

    if (!blog) {
        return {
            title: 'blog not found'
        }
    }
    // optionally access and extend (rather than replace) parent metadata
    const previousImages = (await parent).openGraph?.images || []

    return {
        title: blog?.title,
        description: blog?.content.slice(0, 160),
        openGraph: {
            images: [
                {
                    url: blog?.imageUrl ?? "https://cdn.dribbble.com/userupload/21207141/file/original-af25d78fac8dc71b312d8b0bef78c93b.jpg",
                    width: 1200,
                    height: 650,
                    alt: blog?.title
                },
                ...previousImages
            ]
        }
    }
}

const Blog = async ({ params }: BlogProps) => {
    const { blogId } = await params

    const token = await getToken()

    const [blog, preLoadedComments, userId] = await Promise.all([
        fetchQuery(api.functions.blogs.getBlogById, { id: blogId }),
        preloadQuery(api.functions.comments.getCommentsByBlogId, {
            blogId
        }),
        fetchQuery(api.presence.getUserId, {}, { token })
    ])

    if (!userId) {
        return redirect('/auth/login')
    }

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
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover hover:scale-105 transition-transform decoration-500"
                />
            </div>

            <div className="flex justify-between mb-10 px-2 h-10">
                {userId && <BlogPresence roomId={blog._id} userId={userId} />}
                <p className="text-sm text-muted-foreground  ">
                    Posted on: {new Date(blog._creationTime).toLocaleDateString('en-US')}
                </p>
            </div>

            <div className="space-y-4 flex flex-col">
                <h1 className="text-4xl h-12 leading-9 pl-3 tracking-tight text-foreground border-l-4 border-primary rounded-md ">
                    {blog.title}
                </h1>

                <p className="text-lg leading-relaxed text-foreground/90">
                    {blog.content}
                </p>
                <Separator className="my-8" />
                {/* comments section */}
                <CommentSection preLoadedComments={preLoadedComments} />
            </div>
        </div>
    )
}

export default Blog
