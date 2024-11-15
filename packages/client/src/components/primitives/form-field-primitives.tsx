import { Label } from '@radix-ui/react-label';
import { Slot } from '@radix-ui/react-slot';
import {
    type ComponentPropsWithoutRef,
    createContext,
    type ElementRef,
    forwardRef,
    type JSX,
    type ReactNode,
    useContext,
    useId,
} from 'react';
import { Controller, type ControllerProps, type FieldPath, type FieldValues, useFormContext } from 'react-hook-form';
import { cn } from '@/utilities/cn';

type FormFieldPrimitiveProviderContextState<
    TValues extends FieldValues = FieldValues,
    TName extends FieldPath<TValues> = FieldPath<TValues>,
> = {
    id: string;
    name: TName;
};

const FormFieldPrimitiveProviderContext = createContext<FormFieldPrimitiveProviderContextState | null>(null);

function useFormFieldPrimitiveContext() {
    const context = useContext(FormFieldPrimitiveProviderContext);

    if (!context) {
        throw new Error('useFormField must be used within a FormFieldPrimitiveProvider');
    }

    const formContext = useFormContext();

    if (!formContext) {
        throw new Error('useFormField must be used within a FormFieldPrimitive');
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

export function FormFieldPrimitiveProvider<
    TFieldValues extends FieldValues = FieldValues,
    TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>(props: ControllerProps<TFieldValues, TName>): ReactNode {
    const id = useId();

    return (
        <FormFieldPrimitiveProviderContext.Provider
            value={{
                id,
                name: props.name,
            }}
        >
            <Controller {...props} />
        </FormFieldPrimitiveProviderContext.Provider>
    );
}

export const FormFieldPrimitiveDescription = forwardRef<HTMLParagraphElement, JSX.IntrinsicElements['p']>(
    ({ children, className, ...props }, ref) => {
        const { formDescriptionId } = useFormFieldPrimitiveContext();

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
FormFieldPrimitiveDescription.displayName = 'FormFieldPrimitiveDescription';

export const FormFieldPrimitiveError = forwardRef<
    HTMLParagraphElement,
    Omit<JSX.IntrinsicElements['p'], 'children' | 'ref'>
>(({ className, ...props }, ref) => {
    const { error, formMessageId } = useFormFieldPrimitiveContext();
    const body = error ? String(error?.message) : null;

    if (!body) {
        return null;
    }

    return (
        <p className={cn('text-[0.8rem] font-medium text-danger', className)} id={formMessageId} ref={ref} {...props}>
            {body}
        </p>
    );
});
FormFieldPrimitiveError.displayName = 'FormFieldPrimitiveError';

export const FormFieldPrimitiveLabel = forwardRef<ElementRef<typeof Label>, ComponentPropsWithoutRef<typeof Label>>(
    ({ children, className, ...props }, ref) => {
        const { error, formItemId } = useFormFieldPrimitiveContext();

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
FormFieldPrimitiveLabel.displayName = 'FormFieldPrimitiveLabel';

export const FormFieldPrimitiveControl = forwardRef<ElementRef<typeof Slot>, ComponentPropsWithoutRef<typeof Slot>>(
    ({ children, ...props }, ref) => {
        const { error, formItemId, formDescriptionId, formMessageId } = useFormFieldPrimitiveContext();

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
    },
);
FormFieldPrimitiveControl.displayName = 'FormFieldPrimitiveControl';

type FormFieldPrimitiveRootProps<
    TFieldValues extends FieldValues = FieldValues,
    TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> = {
    children: (field: Parameters<ControllerProps<TFieldValues, TName>['render']>[0]['field']) => ReactNode;
    control: ControllerProps<TFieldValues, TName>['control'];
    description?: string;
    name: ControllerProps<TFieldValues, TName>['name'];
    label?: string;
};

export function FormFieldPrimitiveRoot<
    TFieldValues extends FieldValues = FieldValues,
    TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({ children, control, description, label, name }: FormFieldPrimitiveRootProps<TFieldValues, TName>): ReactNode {
    return (
        <FormFieldPrimitiveProvider
            control={control}
            name={name}
            render={({ field }) => (
                <div className="flex flex-col gap-1.5 self-stretch">
                    {label && <FormFieldPrimitiveLabel>{label}</FormFieldPrimitiveLabel>}
                    <div className="text-black">{children(field)}</div>
                    <div className="flex flex-col gap-y-px">
                        {description && <FormFieldPrimitiveDescription>{description}</FormFieldPrimitiveDescription>}
                        <FormFieldPrimitiveError />
                    </div>
                </div>
            )}
        />
    );
}
