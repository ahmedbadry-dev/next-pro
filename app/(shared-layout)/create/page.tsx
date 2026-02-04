'use client'

import { useForm, SubmitHandler, Controller } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useTransition } from "react"
import { Button } from "@/components/ui/button"
import { Loader2 } from "lucide-react"
import { blogSchema, type TBlogSchema } from "@/validations/blogSchema/blogSchema"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Field, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field"
import { Textarea } from "@/components/ui/textarea"
import { InputField } from "@/components/web/input"
import { toast } from "sonner"
import { createBlogAction } from "@/app/actions"
import { getErrorMessage } from "@/utils/getErrorMessage"
import { useRouter } from "next/navigation"
import { Input } from "@/components/ui/input"

const CreatePage = () => {
    const route = useRouter()
    const [isPending, startTransition] = useTransition()
    const { control, handleSubmit, reset } = useForm<TBlogSchema>({
        resolver: zodResolver(blogSchema),
        defaultValues: {
            title: '',
            content: '',
            image: undefined
        },
        mode: 'onBlur'
    })

    const onSubmit: SubmitHandler<TBlogSchema> = (formData) => {
        startTransition(async () => {
            try {
                // mutateBlogs(formData)  => mutation from convex
                // createBlogAction()     => server action "use server"
                // fetch()                => route api handler
                // const res = await fetch('/api/create-blog', {
                //     method: 'POST',
                // })
                // console.log(await res.json());

                await createBlogAction(formData)
                console.log('hello from client');

                // toasted
                toast.success('Blog created successfully')
                // clear form inputs
                route.push('/')
                reset()
            } catch (error) {
                toast.error(getErrorMessage(error))
            }
        })
    }

    return (
        <div className="py-12">
            <div className="text-center mb-12">
                <h1 className="text-xl font-medium tracking-tight sm:text-4xl">Create Post</h1>
                <p className="text-xl text-muted-foreground pt-4">Share your thoughts with the big world</p>
            </div>

            <Card className="w-full max-w-xl m-auto">
                <CardHeader>
                    <CardTitle>Create Blog Article</CardTitle>
                    <CardDescription>Create a new blog article</CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <FieldGroup className="gap-y-4">
                            {/*title input field*/}
                            <InputField
                                id="form-title"
                                label="Title"
                                name="title"
                                control={control}
                                placeholder="title"
                            />
                            {/*content input field*/}
                            <Controller
                                name='content'
                                control={control}
                                render={({ field, fieldState }) => (
                                    <Field>
                                        <FieldLabel htmlFor='form-content'>Content</FieldLabel>
                                        <Textarea
                                            {...field}
                                            placeholder='Super cool blog content..'
                                            aria-invalid={fieldState.invalid}
                                            id='form-content'
                                        />
                                        {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                                    </Field>
                                )}
                            />
                            {/*image input field*/}
                            <Controller
                                name='image'
                                control={control}
                                render={({ field, fieldState }) => (
                                    <Field>
                                        <FieldLabel htmlFor='form-image'>Image</FieldLabel>
                                        <Input
                                            type="file"
                                            id="form-image"
                                            aria-invalid={fieldState.invalid}
                                            accept="image/*"
                                            onChange={(event) => {
                                                const file = event.target.files?.[0]
                                                field.onChange(file)
                                            }}
                                        />
                                        {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                                    </Field>
                                )}
                            />
                            {/*submit btn*/}
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
                                            <span>Create Blog</span>
                                        )
                                    }
                                </Button>
                            </Field>
                        </FieldGroup>
                    </form>
                </CardContent>
            </Card>
        </div>
    )
}

export default CreatePage
