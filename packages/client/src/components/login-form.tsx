import { zodResolver } from '@hookform/resolvers/zod';
import { HTTPError } from 'ky';
import { type ReactNode, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { object, type output, string } from 'zod';
import { client } from '@/api/client';
import { AlertFromError } from '@/components/alert-from-error';
import { SolidButton } from '@/components/buttons/solid-button';
import { FormPassword } from '@/components/form-fields/form-password';
import { FormText } from '@/components/form-fields/form-text';

const loginFormSchema = object({
    email: string(),
    password: string(),
});

type LoginFormData = output<typeof loginFormSchema>;

export function LoginForm(): ReactNode {
    const [error, setError] = useState<HTTPError>();

    const form = useForm<LoginFormData>({
        defaultValues: {
            email: '',
            password: '',
        },
        resolver: zodResolver(loginFormSchema),
    });

    const onLogin = form.handleSubmit(async (values: LoginFormData) => {
        const payload = {
            email: values.email,
            password: values.password,
        };

        const api = client();

        try {
            const responseData = await api
                .post('api/auth/login', {
                    json: payload,
                })
                .json();

            console.log(responseData);
        } catch (err) {
            if (err instanceof HTTPError) {
                setError(err);
                return;
            }

            console.log(err);
        }
    });

    return (
        <div className="flex flex-col gap-4">
            {error && <AlertFromError error={error} />}
            <FormProvider {...form}>
                <form noValidate onSubmit={onLogin} className="flex flex-col gap-4">
                    <FormText type="email" control={form.control} label="Email" name="email" placeholder="Email" />
                    <FormPassword control={form.control} label="Password" name="password" placeholder="Password" />
                    <SolidButton type="submit">Login</SolidButton>
                </form>
            </FormProvider>
        </div>
    );
}
