import { useCallback } from 'react';
import { type FieldValues, type Path, useForm, type UseFormProps, type UseFormReturn } from 'react-hook-form';
import { type ValidationHttpError } from '@/errors/validation-http-error';

type FormControls<
    TFieldValues extends FieldValues = FieldValues,
    TContext = any,
    TTransformedValues extends FieldValues | undefined = undefined,
> = {
    form: UseFormReturn<TFieldValues, TContext, TTransformedValues>;
    setFormErrors: (error: ValidationHttpError) => void;
};

export function useFormControls<
    TFieldValues extends FieldValues = FieldValues,
    TContext = any,
    TTransformedValues extends FieldValues | undefined = undefined,
>(props?: UseFormProps<TFieldValues, TContext>): FormControls<TFieldValues, TContext, TTransformedValues> {
    const form = useForm<TFieldValues, TContext, TTransformedValues>(props);

    const setFormErrors = useCallback(
        (error: ValidationHttpError) => {
            for (const [name, message] of Object.entries(error.messages)) {
                form.setError(name as Path<TFieldValues>, { type: 'custom', message });
            }
        },
        [form],
    );

    return {
        form,
        setFormErrors,
    };
}
