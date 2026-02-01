'use client'

import { useForm, SubmitHandler } from "react-hook-form"
import { registerSchema, TRegister } from "@/validations/registerSchema/registerSchema"
import { zodResolver } from "@hookform/resolvers/zod"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Field, FieldGroup, } from "@/components/ui/field"
import { Button } from "@/components/ui/button"

import { InputField } from "@/components/web/input"
import { authClient } from "@/lib/auth-client"
import { useRouter } from "next/navigation"
import { toast } from "sonner"
import { useTransition } from "react"
import { Loader2 } from "lucide-react"



const SignUpPage = () => {
    const router = useRouter()
    const [isPending, startTransition] = useTransition()
    const { handleSubmit, control } = useForm<TRegister>({
        resolver: zodResolver(registerSchema),
        defaultValues: {
            userName: '',
            email: '',
            password: '',
            confirmPassword: ''
        },
        mode: "onBlur"
    })
    const onSubmit: SubmitHandler<TRegister> = (data) => {
        startTransition(async () => {
            await authClient.signUp.email({
                email: data.email,
                password: data.password,
                name: data.userName,
            }, {
                onSuccess: () => {
                    toast.success('Account created 🎉')
                    router.push('/')
                },
                onError: (res) => {
                    toast.error(res.error.message)
                }
            })
        })
    }
    return (
        <div className="pt-10">
            <Card>
                <CardHeader>
                    <CardTitle>Sign Up</CardTitle>
                    <CardDescription>Create an account to get started</CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <FieldGroup className="gap-y-4">
                            <InputField
                                id="form-userName"
                                name="userName"
                                control={control}
                                label="User Name"
                                placeholder="Ahmed Badry"
                            />
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
                            <InputField
                                id="form-confirmPassword"
                                name="confirmPassword"
                                control={control}
                                label="Confirm Password"
                                placeholder="********"
                                type="password"
                            />
                            <Field orientation="responsive">
                                <Button
                                    type="submit"
                                    className="cursor-pointer"
                                    disabled={isPending}
                                >{
                                        isPending ? (
                                            <>
                                                <Loader2 className="size-4 animate-spin" />
                                                <span>Creating a new account...</span>
                                            </>
                                        ) : (
                                            <span>Sign Up</span>
                                        )
                                    }</Button>
                            </Field>
                        </FieldGroup>
                    </form>
                </CardContent>
            </Card>
        </div>
    )
}

export default SignUpPage