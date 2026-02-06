'use client'
import { Control, Controller, FieldValues, Path } from "react-hook-form"
import { Input } from "@/components/ui/input"
import {
    Field,
    FieldLabel,
    FieldError,
} from '@/components/ui/field'

type InputFiledProps<TFieldValues extends FieldValues> = {
    id: string,
    name: Path<TFieldValues>,
    control: Control<TFieldValues>,
    label: string,
    placeholder: string,
    type?: string
}

export const InputField = <TFieldValues extends FieldValues>({
    id,
    name,
    control,
    label,
    placeholder,
    type = "text",
}: InputFiledProps<TFieldValues>) => {
    return (
        <Controller
            name={name}
            control={control}
            render={({ field, fieldState }) => (
                <Field>
                    {label && <FieldLabel htmlFor={id}>{label}</FieldLabel>}

                    <Input
                        {...field}
                        type={type}
                        placeholder={placeholder}
                        aria-invalid={fieldState.invalid}
                        id={id}
                    />

                    {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                </Field>
            )}
        />
    )
}
