import { zodResolver } from '@hookform/resolvers/zod';
import { type ReactNode } from 'react';
import { type Control, type DefaultValues, type FieldErrors, FormProvider, useForm } from 'react-hook-form';
import { type output, type ZodType } from 'zod';

type FormRootProps<TSchema extends ZodType> = {
    children: (control: Control<output<TSchema>>) => ReactNode;
    className?: string;
    errors?: FieldErrors<output<TSchema>>;
    initialValues: DefaultValues<output<TSchema>>;
    schema: TSchema;
    onSubmit: (values: output<TSchema>) => void | Promise<void>;
};

export function Form<TSchema extends ZodType>({
    children,
    className,
    errors,
    initialValues,
    schema,
    onSubmit,
}: FormRootProps<TSchema>): ReactNode {
    const formMethods = useForm<output<typeof schema>>({
        defaultValues: initialValues,
        errors,
        resolver: zodResolver(schema),
    });

    return (
        <FormProvider {...formMethods}>
            <form noValidate className={className} onSubmit={formMethods.handleSubmit(onSubmit)}>
                {children(formMethods.control)}
            </form>
        </FormProvider>
    );
}
