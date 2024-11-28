import { zodResolver } from '@hookform/resolvers/zod';
import { HTTPError } from 'ky';
import { type ReactNode, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { AlertFromError } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { FormPassword, FormText } from '@/components/ui/form';
import { Link } from '@/components/ui/link';
import { type LoginPayload, loginPayloadSchema, useLoginMutation } from '@/hooks/mutations/use-login-mutation';

export function Login(): ReactNode {
    const { mutateAsync: login } = useLoginMutation();
    const [formError, setFormError] = useState<HTTPError>();

    const form = useForm<LoginPayload>({
        defaultValues: {
            username: '',
            password: '',
        },
        resolver: zodResolver(loginPayloadSchema),
    });

    const onLogin = form.handleSubmit(async (values) => {
        try {
            await login(values);
        } catch (error) {
            if (error instanceof HTTPError) {
                setFormError(error);
                return;
            }

            console.error(error);
        }
    });

    return (
        <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-2 items-center">
                <h1 className="text-4xl font-bold">Welcome back!</h1>
                <p>Please enter your details</p>
            </div>
            <div className="flex flex-col gap-4">
                {formError && <AlertFromError error={formError} />}
                <FormProvider {...form}>
                    <form onSubmit={onLogin} className="flex flex-col gap-4">
                        <FormText control={form.control} label="Username" name="username" placeholder="Username" />
                        <FormPassword control={form.control} label="Password" name="password" placeholder="Password" />
                        <Button type="submit">Sign In</Button>
                    </form>
                </FormProvider>
            </div>
            <div>
                <p className="text-sm text-center">
                    Don&apos;t have an account?{' '}
                    <Link to="/register" className="font-medium">
                        Sign Up
                    </Link>
                </p>
            </div>
        </div>
    );
}
