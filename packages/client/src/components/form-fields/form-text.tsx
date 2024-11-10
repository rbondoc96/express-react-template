import { type ReactNode } from 'react';
import { type ControllerProps, type FieldPath, type FieldValues } from 'react-hook-form';
import { FormFieldPrimitiveControl, FormFieldPrimitiveRoot } from '@/components/primitives/form-field-primitives';
import { cn } from '@/utilities/cn';

type FormTextProps<
    TFieldValues extends FieldValues = FieldValues,
    TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> = {
    control: ControllerProps<TFieldValues, TName>['control'];
    description?: string;
    label?: string;
    name: ControllerProps<TFieldValues, TName>['name'];
    placeholder?: string;
    type?: 'email' | 'text';
};

export function FormText<
    TFieldValues extends FieldValues = FieldValues,
    TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({ control, description, label, name, placeholder, type = 'text' }: FormTextProps<TFieldValues, TName>): ReactNode {
    return (
        <FormFieldPrimitiveRoot control={control} description={description} label={label} name={name}>
            {(field) => (
                <FormFieldPrimitiveControl>
                    <input
                        className={cn(
                            'flex h-9 w-full px-3 py-1 shadow-sm transition-colors',
                            'border border-input rounded-md file:border-0 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring',
                            'text-sm file:text-sm file:font-medium placeholder:text-muted-foreground',
                            'disabled:cursor-not-allowed disabled:opacity-50',
                        )}
                        placeholder={placeholder}
                        type={type}
                        {...field}
                    />
                </FormFieldPrimitiveControl>
            )}
        </FormFieldPrimitiveRoot>
    );
}
