
import { Controller, FieldValues, Path, Control } from "react-hook-form"
import { Field, FieldError, FieldLabel } from "../ui/field"
import { Textarea } from "../ui/textarea"


type TextareaFieldProps<TFieldValues extends FieldValues> = {
    id?: string,
    name: Path<TFieldValues>,
    control: Control<TFieldValues>,
    label?: string,
    placeholder: string
}

export const TextareaField = <TFieldValues extends FieldValues>(
    {
        id,
        name,
        control,
        label,
        placeholder
    }: TextareaFieldProps<TFieldValues>) => {
    return (
        <Controller
            name={name}
            control={control}
            render={({ field, fieldState }) => (
                <Field>
                    {label && <FieldLabel htmlFor={id}></FieldLabel>}
                    <Textarea
                        {...field}
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
