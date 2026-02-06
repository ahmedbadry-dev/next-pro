import { Skeleton } from '@/components/ui/skeleton'
export function loading() {
    return (
        <div className="max-w-3xl mx-auto py-8 px-4 space-y-10">

            {/* Back button */}
            <Skeleton className="h-9 w-36 rounded-md" />

            {/* Image */}
            <Skeleton className="h-80 w-full rounded-xl" />

            {/* Presence + date */}
            <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                    <Skeleton className="h-4 w-20" />
                    <Skeleton className="h-6 w-6 rounded-full" />
                </div>
                <Skeleton className="h-4 w-32" />
            </div>

            {/* Title */}
            <div className="space-y-3">
                <Skeleton className="h-10 w-2/3" />
                <Skeleton className="h-6 w-1/2" />
            </div>

            {/* Content */}
            <div className="space-y-3">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-5/6" />
                <Skeleton className="h-4 w-4/6" />
            </div>

            {/* Divider */}
            <Skeleton className="h-px w-full" />

            {/* Comments card */}
            <div className="rounded-xl border bg-card p-6 space-y-6">

                {/* Comments header */}
                <div className="flex justify-between items-center">
                    <Skeleton className="h-6 w-32" />
                    <Skeleton className="h-5 w-10" />
                </div>

                {/* Textarea */}
                <Skeleton className="h-24 w-full rounded-md" />

                {/* Submit button */}
                <Skeleton className="h-10 w-full rounded-md" />

                {/* Comment item */}
                <div className="flex gap-4 pt-4">
                    <Skeleton className="h-10 w-10 rounded-full" />
                    <div className="flex-1 space-y-2">
                        <Skeleton className="h-4 w-40" />
                        <Skeleton className="h-3 w-24" />
                        <Skeleton className="h-4 w-full" />
                        <Skeleton className="h-4 w-5/6" />
                    </div>
                </div>
            </div>
        </div>
    )
}


export default loading
