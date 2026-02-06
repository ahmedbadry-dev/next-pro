'use client'

import { Id } from "@/convex/_generated/dataModel"
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar"


type CommentsListProps = {
    comments: {
        _id: Id<"comments">;
        _creationTime: number;
        blogId: Id<"blogs">;
        body: string;
        authorName: string;
        authorId: string;
    }[] | undefined
}

export const CommentsList = ({ comments }: CommentsListProps) => {
    return (
        <section className="space-y-6 mt-5">
            {
                comments && comments.map(comment => (
                    <div key={comment._id} className="flex gap-4 ">
                        <Avatar className="size-10 shrink-0">
                            <AvatarImage
                                src={`https://avatar.vercel.sh/${comment.authorName}`}
                                alt={comment.authorName}
                            />
                            <AvatarFallback >
                                {comment.authorName
                                    .split(" ")
                                    .map(n => n[0])
                                    .slice(0, 2)
                                    .join(" ")
                                    .toUpperCase()}
                            </AvatarFallback>
                        </Avatar>
                        <div className="flex-1 space-y-1 ">
                            <div className="flex justify-between items-center">
                                <div>
                                    <p className="font-semibold text-sm">{comment.authorName}</p>
                                    <p className="text-muted-foreground text-xs">{new Date(comment._creationTime).toLocaleTimeString([], {
                                        hour: '2-digit',
                                        minute: '2-digit',
                                        hour12: true
                                    })}</p>
                                </div>
                                <div>
                                    <p className="text-muted-foreground text-xs">{new Date(comment._creationTime).toLocaleDateString("en-US")}</p>
                                </div>
                            </div>
                            <p className="text-sm text-foreground/90 whitespace-pre-wrap leading-relaxed">{comment.body}</p>
                        </div>
                    </div>
                ))
            }
        </section>
    )
}
