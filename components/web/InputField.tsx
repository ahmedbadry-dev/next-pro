'use client'
import { Control, Controller, FieldValues, Path } from "react-hook-form"
import { Input } from "@/components/ui/input"
import {
    Field,
    FieldLabel,
    FieldError,
} from '@/components/ui/field'
import { InputGroup, InputGroupAddon, InputGroupInput, InputGroupText } from "../ui/input-group"

type InputFiledProps<TFieldValues extends FieldValues> = {
    id: string,
    name: Path<TFieldValues>,
    control: Control<TFieldValues>,
    label: string,
    placeholder: string,
    type?: string
    displayLength?: boolean
}

export const InputField = <TFieldValues extends FieldValues>({
    id,
    name,
    control,
    label,
    placeholder,
    type = "text",
    displayLength = false
}: InputFiledProps<TFieldValues>) => {
    return (
        <Controller
            name={name}
            control={control}
            render={({ field, fieldState }) => (
                <Field>
                    {label && <FieldLabel htmlFor={id}>{label}</FieldLabel>}

                    <InputGroup>
                        <InputGroupInput
                            {...field}
                            type={type}
                            placeholder={placeholder}
                            aria-invalid={fieldState.invalid}
                            id={id}
                        />
                        {
                            displayLength &&
                            <InputGroupAddon align={'inline-end'}>
                                <InputGroupText>{field.value.length}/50</InputGroupText>
                            </InputGroupAddon>
                        }
                    </InputGroup>

                    {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                </Field>
            )}
        />
    )
}
