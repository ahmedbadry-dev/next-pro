'use client'

import { loginSchema, TLogin } from "@/validations/loginSchema/loginSchema"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm, SubmitHandler } from "react-hook-form"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Field, FieldGroup } from "@/components/ui/field"
import { InputField } from "@/components/web/input"
import { Button } from "@/components/ui/button"


const LoginPage = () => {
    const { handleSubmit, control, formState, reset } = useForm<TLogin>({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            email: '',
            password: ''
        },
        mode: 'onBlur'
    })

    const onSubmit: SubmitHandler<TLogin> = (data) => {
        console.log(data);

        reset()
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
                                disabled={!formState.isValid}
                                className="cursor-pointer"
                            >Login</Button>
                        </Field>
                    </FieldGroup>
                </form>
            </CardContent>
        </Card>
    )
}

export default LoginPage