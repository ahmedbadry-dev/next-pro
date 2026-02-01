'use client'

import { loginSchema, TLogin } from "@/validations/loginSchema/loginSchema"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm, SubmitHandler } from "react-hook-form"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Field, FieldGroup } from "@/components/ui/field"
import { InputField } from "@/components/web/input"
import { Button } from "@/components/ui/button"
import { authClient } from "@/lib/auth-client"
import { toast } from "sonner"
import { useRouter } from "next/navigation"
import { useTransition } from "react"
import { Loader2 } from "lucide-react"


const LoginPage = () => {
    const [isPending, startTransition] = useTransition()
    const router = useRouter()


    const { handleSubmit, control } = useForm<TLogin>({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            email: '',
            password: ''
        },
        mode: 'onBlur'
    })

    const onSubmit: SubmitHandler<TLogin> = (formData) => {
        startTransition(async () => {
            await authClient.signIn.email(
                {
                    email: formData.email,
                    password: formData.password,
                },
                {
                    onSuccess: (res) => {
                        toast.success(`Welcome, ${res?.data?.user?.name}`)
                        router.push("/")
                    },
                    onError: (res) => {
                        toast.error(res.error.message)
                    },
                }
            )
        })
    }

    return (
        <Card>
            <CardHeader>
                <CardTitle>Login</CardTitle>
                <CardDescription>Enter your account to get started</CardDescription>
            </CardHeader>
            <CardContent>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <FieldGroup>
                        <InputField
                            id="form-email"
                            name="email"
                            control={control}
                            label="Email"
                            placeholder="john@example.com"
                            type="email"
                        />
                        <InputField
                            id="form-password"
                            name="password"
                            control={control}
                            label="Password"
                            placeholder="********"
                            type="password"
                        />
                        <Field orientation={"responsive"}>
                            <Button
                                type="submit"
                                disabled={isPending}
                                className="cursor-pointer"
                            >
                                {
                                    isPending ? (
                                        <>
                                            <Loader2 className="size-4 animate-spin" />
                                            <span>Loading...</span>
                                        </>
                                    ) : (
                                        <span>Login</span>
                                    )
                                }
                            </Button>
                        </Field>
                    </FieldGroup>
                </form>
            </CardContent>
        </Card>
    )
}

export default LoginPage