import { zodResolver } from '@hookform/resolvers/zod';
import { type ReactNode } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { SolidButton } from '@/components/buttons/solid-button';
import { FormPassword } from '@/components/form-fields/form-password';
import { FormText } from '@/components/form-fields/form-text';
import { ValidationHttpError } from '@/errors/validation-http-error';
import {
    type RegisterPayload,
    registerPayloadSchema,
    useRegisterMutation,
} from '@/hooks/mutations/use-register-mutation';

export function RegisterForm(): ReactNode {
    const { mutateAsync: register } = useRegisterMutation();

    const form = useForm<RegisterPayload>({
        defaultValues: {
            username: '',
            first_name: '',
            last_name: '',
            password: '',
        },
        resolver: zodResolver(registerPayloadSchema),
    });

    const onRegister = form.handleSubmit(async (values: RegisterPayload) => {
        try {
            await register(values);
        } catch (error) {
            if (error instanceof ValidationHttpError) {
                Object.entries(error.messages).forEach(([name, message]) => {
                    form.setError(name as keyof RegisterPayload, { type: 'custom', message });
                });
            }
        }
    });

    return (
        <FormProvider {...form}>
            <form noValidate onSubmit={onRegister} className="flex flex-col gap-4">
                <div className="flex gap-1 *:flex-1">
                    <FormText control={form.control} label="First Name" name="first_name" placeholder="First name" />
                    <FormText control={form.control} label="Last Name" name="last_name" placeholder="Last name" />
                </div>
                <FormText type="email" control={form.control} label="Username" name="username" placeholder="Username" />
                <FormPassword control={form.control} label="Password" name="password" placeholder="Password" />
                <SolidButton type="submit">Register</SolidButton>
            </form>
        </FormProvider>
    );
}
