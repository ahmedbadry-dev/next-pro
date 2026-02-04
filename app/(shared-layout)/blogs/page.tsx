
import { BlogsList } from "@/components/web/BlogsList"
import { BlogsSkeleton } from "@/components/web/skeleton"
import { Suspense } from "react"


export const dynamic = 'force-static'
// export const revalidate = 30
// 'auto' | 'force-dynamic' | 'error' | 'force-static'
const BlogsPage = () => {

    return (
        <div className="py-12">
            <div className="text-center pb-12">
                <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">Our Blogs</h1>
                <p className="pt-4 max-w-2xl mx-auto text-xl text-muted-foreground">Insights, thoughts, and trends from our team.</p>
            </div>
            <Suspense fallback={<BlogsSkeleton />}>
                <BlogsList />
            </Suspense>
        </div>
    )
}

export default BlogsPage