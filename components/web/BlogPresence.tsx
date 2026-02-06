'use client'

import usePresence from "@convex-dev/presence/react"
import FacePile from "@convex-dev/presence/facepile"
import { api } from "@/convex/_generated/api"
import { Id } from "@/convex/_generated/dataModel"
import { Loader2 } from "lucide-react"

type BlogPresenceProps = {
    roomId: Id<'blogs'>
    userId: string
}

export function BlogPresence({ roomId, userId }: BlogPresenceProps) {
    const presenceState = usePresence(api.presence, roomId, userId)

    // 1️⃣ Loading
    if (presenceState === undefined) {
        return (
            <div className="flex items-center gap-2 text-muted-foreground">
                <Loader2 className="size-4 animate-spin" />
                <span className="text-xs uppercase tracking-wide">
                    loading viewers
                </span>
            </div>
        )
    }

    // 2️⃣ Loaded but no one is viewing
    if (presenceState.length === 0) {
        return (
            <p className="text-xs uppercase tracking-wide text-muted-foreground">
                no viewers now
            </p>
        )
    }

    // 3️⃣ Loaded with viewers
    return (
        <div className="flex items-center gap-2">
            <p className="text-xs uppercase tracking-wide text-muted-foreground">
                viewing now
            </p>
            <div className="text-zinc-950">
                <FacePile presenceState={presenceState} />
            </div>
        </div>
    )
}
