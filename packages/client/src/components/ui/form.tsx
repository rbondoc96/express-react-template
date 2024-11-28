import { Label, type LabelProps } from '@radix-ui/react-label';
import { Slot, type SlotProps } from '@radix-ui/react-slot';
import * as React from 'react';
import {
    Controller,
    type ControllerProps,
    type FieldError,
    type FieldPath,
    type FieldValues,
    useFormContext,
} from 'react-hook-form';
import { HtmlProps } from '@/components/types';
import { Checkbox } from '@/components/ui/checkbox';
import { cn } from '@/utilities/cn';

type FormFieldContextState<
    TValues extends FieldValues = FieldValues,
    TName extends FieldPath<TValues> = FieldPath<TValues>,
> = {
    id: string;
    name: TName;
};

const FormFieldContext = React.createContext<FormFieldContextState | null>(null);

type FormFieldState = {
    error?: FieldError;
    /** Attached to a form field's description. */
    formDescriptionId: string;
    /** Attached to a form field's label. */
    formItemId: string;
    /** Attached to a form field's error message. */
    formMessageId: string;
    id: string;
    invalid: boolean;
    isDirty: boolean;
    isTouched: boolean;
    isValidating: boolean;
    name: string;
};
function useFormField(): FormFieldState {
    const context = React.useContext(FormFieldContext);

    if (!context) {
        throw new Error('useFormField must be used within a FormFieldProvider.');
    }

    const formContext = useFormContext();

    if (!formContext) {
        throw new Error('useFormField must be used within a FormFieldProvider');
    }

    const fieldState = formContext.getFieldState(context.name, formContext.formState);

    return {
        id: context.id,
        name: context.name,
        formItemId: `${context.id}-form-item`,
        formDescriptionId: `${context.id}-form-item-description`,
        formMessageId: `${context.id}-form-item-message`,
        ...fieldState,
    };
}

function FormFieldProvider<
    TFieldValues extends FieldValues,
    TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>(props: ControllerProps<TFieldValues, TName>): React.ReactNode {
    const id = React.useId();

    return (
        <FormFieldContext.Provider value={{ id, name: props.name }}>
            <Controller {...props} />
        </FormFieldContext.Provider>
    );
}

const FormFieldControl = React.forwardRef<React.ElementRef<typeof Slot>, SlotProps>(({ children, ...props }, ref) => {
    const { error, formDescriptionId, formItemId, formMessageId } = useFormField();

    return (
        <Slot
            aria-describedby={!error ? `${formDescriptionId}` : `${formDescriptionId} ${formMessageId}`}
            aria-invalid={!!error}
            id={formItemId}
            ref={ref}
            {...props}
        >
            {children}
        </Slot>
    );
});
FormFieldControl.displayName = 'FormFieldControl';

const FormFieldDescription = React.forwardRef<HTMLParagraphElement, HtmlProps<'p'>>(
    ({ children, className, ...props }, ref) => {
        const { formDescriptionId } = useFormField();

        return (
            <p
                className={cn('text-[0.8rem] text-muted-foreground', className)}
                id={formDescriptionId}
                ref={ref}
                {...props}
            >
                {children}
            </p>
        );
    },
);
FormFieldDescription.displayName = 'FormFieldDescription';

const FormFieldError = React.forwardRef<HTMLParagraphElement, Omit<HtmlProps<'p'>, 'children'>>(
    ({ className, ...props }, ref) => {
        const { error, formMessageId } = useFormField();
        const body = error ? String(error.message) : null;

        if (!body) {
            return null;
        }

        return (
            <p
                className={cn('text-[0.8rem] font-medium text-danger', className)}
                id={formMessageId}
                ref={ref}
                {...props}
            >
                {body}
            </p>
        );
    },
);
FormFieldError.displayName = 'FormFieldError';

const FormFieldLabel = React.forwardRef<React.ElementRef<typeof Label>, LabelProps>(
    ({ children, className, ...props }, ref) => {
        const { error, formItemId } = useFormField();

        return (
            <Label
                className={cn(
                    'text-sm font-medium leading-none',
                    'peer-disabled:cursor-not-allowed peer-disabled:opacity-70',
                    error && 'text-destructive',
                    className,
                )}
                htmlFor={formItemId}
                ref={ref}
                {...props}
            >
                {children}
            </Label>
        );
    },
);
FormFieldLabel.displayName = 'FormFieldLabel';

type FormFieldProps<
    TFieldValues extends FieldValues = FieldValues,
    TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> = {
    children: (field: Parameters<ControllerProps<TFieldValues, TName>['render']>[0]['field']) => React.ReactNode;
    control: ControllerProps<TFieldValues, TName>['control'];
    description?: string;
    name: ControllerProps<TFieldValues, TName>['name'];
    label?: string;
};
function FormField<
    TFieldValues extends FieldValues = FieldValues,
    TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({ children, control, description, label, name }: FormFieldProps<TFieldValues, TName>): React.ReactNode {
    return (
        <FormFieldProvider
            control={control}
            name={name}
            render={({ field }) => (
                <div className="flex flex-col gap-1.5 self-stretch">
                    {label && <FormFieldLabel>{label}</FormFieldLabel>}
                    <div className="text-black">
                        <FormFieldControl>{children(field)}</FormFieldControl>
                    </div>
                    <div className="flex flex-col gap-y-px">
                        {description && <FormFieldDescription>{description}</FormFieldDescription>}
                        <FormFieldError />
                    </div>
                </div>
            )}
        />
    );
}

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
>({ control, description, label, name, placeholder }: FormPasswordProps<TFieldValues, TName>): React.ReactNode {
    const [revealPassword, setRevealPassword] = React.useState(false);
    const id = React.useId();

    return (
        <div className="flex flex-col gap-y-2">
            <FormField control={control} description={description} label={label} name={name}>
                {(field) => (
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
                )}
            </FormField>
            <Checkbox
                checked={revealPassword}
                label="Reveal Password"
                name={`password-${id}`}
                tabIndex={-1}
                onChange={(checked) => setRevealPassword(checked === true)}
            />
        </div>
    );
}

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
>({
    control,
    description,
    label,
    name,
    placeholder,
    type = 'text',
}: FormTextProps<TFieldValues, TName>): React.ReactNode {
    return (
        <FormField control={control} description={description} label={label} name={name}>
            {(field) => (
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
            )}
        </FormField>
    );
}
