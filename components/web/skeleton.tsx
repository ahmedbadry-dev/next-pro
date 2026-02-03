import { Card } from "../ui/card"
import { Skeleton } from "../ui/skeleton"

export const BlogsSkeleton = () => {
    return (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {
                [...Array(3).fill(0).map((_, idx) => (
                    <div key={idx} className="flex flex-col py-6 space-y-3">
                        <Skeleton className="h-48 w-full rounded-xl" />
                        <div className="space-y-2 flex flex-col">
                            <Skeleton className="h-6 w-1/4" />
                            <Skeleton className="h-3 w-full" />
                            <Skeleton className="h-3 w-2/3" />
                        </div>
                        <div className="space-y-4 flex flex-col">
                            <Skeleton className="h-6 w-full" />
                        </div>
                    </div>
                ))]
            }
        </div>
    )
}
