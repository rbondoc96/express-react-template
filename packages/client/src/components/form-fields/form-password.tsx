import { type ReactNode, useId, useState } from 'react';
import { type ControllerProps, type FieldPath, type FieldValues } from 'react-hook-form';
import { FormFieldPrimitiveControl, FormFieldPrimitiveRoot } from '@/components/primitives/form-field-primitives';
import { Checkbox } from '@/components/ui/checkbox';
import { cn } from '@/utilities/cn';

type FormPasswordProps<
    TFieldValues extends FieldValues = FieldValues,
    TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> = {
    control: ControllerProps<TFieldValues, TName>['control'];
    description?: string;
    label?: string;
    name: ControllerProps<TFieldValues, TName>['name'];
    placeholder?: string;
    revealPasswordLabel?: string;
};

export function FormPassword<
    TFieldValues extends FieldValues = FieldValues,
    TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({
    control,
    description,
    label,
    name,
    placeholder,
    revealPasswordLabel = 'Reveal Password',
}: FormPasswordProps<TFieldValues, TName>): ReactNode {
    const [revealPassword, setRevealPassword] = useState(false);
    const id = useId();

    return (
        <div className="flex flex-col gap-y-2">
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
                            type={revealPassword ? 'text' : 'password'}
                            {...field}
                        />
                    </FormFieldPrimitiveControl>
                )}
            </FormFieldPrimitiveRoot>
            <Checkbox
                checked={revealPassword}
                label={revealPasswordLabel}
                name={`password-${id}`}
                tabIndex={-1}
                onChange={(checked) => setRevealPassword(checked === true)}
            />
        </div>
    );
}
