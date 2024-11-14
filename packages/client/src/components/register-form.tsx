import { zodResolver } from '@hookform/resolvers/zod';
import { type ReactNode } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { object, type output, string } from 'zod';
import { client } from '@/api/client';
import { SolidButton } from '@/components/buttons/solid-button';
import { FormPassword } from '@/components/form-fields/form-password';
import { FormText } from '@/components/form-fields/form-text';
import { ValidationHttpError } from '@/errors/validation-http-error';

const registerFormSchema = object({
    username: string(),
    first_name: string(),
    last_name: string(),
    password: string(),
});

export function RegisterForm(): ReactNode {
    const form = useForm<output<typeof registerFormSchema>>({
        defaultValues: {
            username: '',
            first_name: '',
            last_name: '',
            password: '',
        },
        resolver: zodResolver(registerFormSchema),
    });

    const onRegister = form.handleSubmit(async (values: output<typeof registerFormSchema>) => {
        const data = {
            username: values.username,
            first_name: values.first_name,
            last_name: values.last_name,
            password: values.password,
        };

        const api = client();

        try {
            await api
                .post('api/auth/register', {
                    json: data,
                })
                .json();
        } catch (error) {
            if (error instanceof ValidationHttpError) {
                Object.entries(error.messages).forEach(([name, message]) => {
                    form.setError(name as keyof output<typeof registerFormSchema>, { type: 'custom', message });
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
