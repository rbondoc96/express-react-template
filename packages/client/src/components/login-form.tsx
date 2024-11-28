import { zodResolver } from '@hookform/resolvers/zod';
import { HTTPError } from 'ky';
import { type ReactNode, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { SolidButton } from '@/components/buttons/solid-button';
import { FormPassword } from '@/components/form-fields/form-password';
import { FormText } from '@/components/form-fields/form-text';
import { AlertFromError } from '@/components/ui/alert';
import { LoginPayload, loginPayloadSchema, useLoginMutation } from '@/hooks/mutations/use-login-mutation';

export function LoginForm(): ReactNode {
    const { mutateAsync: login } = useLoginMutation();
    const [error, setError] = useState<HTTPError>();

    const form = useForm<LoginPayload>({
        defaultValues: {
            username: '',
            password: '',
        },
        resolver: zodResolver(loginPayloadSchema),
    });

    const onLogin = form.handleSubmit(async (values: LoginPayload) => {
        try {
            await login(values);
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
                    <FormText control={form.control} label="Username" name="username" placeholder="Username" />
                    <FormPassword control={form.control} label="Password" name="password" placeholder="Password" />
                    <SolidButton type="submit">Sign In</SolidButton>
                </form>
            </FormProvider>
        </div>
    );
}
