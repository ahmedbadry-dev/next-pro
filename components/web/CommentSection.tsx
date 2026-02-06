'use client'

import { Loader2, MessageSquare } from "lucide-react"
import { Card, CardContent, CardHeader } from "../ui/card"
import { useTransition } from "react"
import { useForm, SubmitHandler } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { commentSchema, TCommentSchema } from "@/validations/commentSchema/commentSchema"
import { useParams } from "next/navigation"
import { Id } from "@/convex/_generated/dataModel"
import { api } from "@/convex/_generated/api"
import { Preloaded, useMutation, usePreloadedQuery, useQueries, useQuery } from "convex/react"
import { TextareaField } from "./TextareaField"
import { toast } from "sonner"
import { getErrorMessage } from "@/utils/getErrorMessage"
import { Button } from "../ui/button"
import { Field } from "../ui/field"
import { CommentsList } from "./CommentsList"



export const CommentSection = ({ preLoadedComments }: { preLoadedComments: Preloaded<typeof api.functions.comments.getCommentsByBlogId>; }) => {
    const params = useParams<{ blogId: Id<'blogs'> }>()

    const [isPending, startTransition] = useTransition()

    const createComment = useMutation(api.functions.comments.createComment)

    const preloadComments = usePreloadedQuery(preLoadedComments)

    const { control, handleSubmit, reset } = useForm<TCommentSchema>({
        resolver: zodResolver(commentSchema),
        defaultValues: {
            blogId: params.blogId,
            body: ''
        }
    })

    // const comments = useQuery(api.functions.comments.getCommentsByBlogId, {
    //     blogId: params.blogId
    // })

    const onSubmit: SubmitHandler<TCommentSchema> = (formDate) => {
        startTransition(async () => {
            try {
                // using mutation 
                await createComment(formDate)
                // using server action 
                // await createCommentAction(formDate)
                toast.success('comment posted')
                reset()
            } catch (error) {
                toast.error(getErrorMessage(error))
            }
        })
    }



    return (
        <Card>
            <CardHeader className="flex flex-row items-center justify-between gap-2 border-b">
                <div >
                    <h2 className="text-xl font-bold">Comments</h2>
                </div>
                {/* comment number */}
                <div className="flex flex-row items-center gap-2">
                    <MessageSquare className="size-4" />
                    <h3 className="text-md font-bold">{preloadComments?.length}</h3>
                </div>
            </CardHeader>
            <CardContent>
                <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
                    <TextareaField
                        control={control}
                        placeholder="comment..."
                        name="body"
                    />
                    <Field>
                        <Button
                            type="submit"
                            disabled={isPending}
                        >
                            {
                                isPending ? (
                                    <>
                                        <Loader2 className="size-4 animate-spin" />
                                        <span>loading...</span>
                                    </>
                                ) : (
                                    <span>Submit</span>
                                )
                            }
                        </Button>
                    </Field>
                </form>
                <CommentsList comments={preloadComments} />
            </CardContent>
        </Card>
    )
}
