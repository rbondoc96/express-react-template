import { HomeIcon } from '@radix-ui/react-icons';
import { HTTPError } from 'ky';
import { type ReactNode, useState } from 'react';
import { FormProvider } from 'react-hook-form';
import { useFormControls } from '@/components/hooks/use-form-controls';
import { AlertFromError } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { FormPassword, FormText } from '@/components/ui/form';
import { Link } from '@/components/ui/link';
import { ValidationHttpError } from '@/errors/validation-http-error';
import { useLoginMutation } from '@/hooks/mutations/use-login-mutation';

export function Login(): ReactNode {
    const { mutateAsync: login } = useLoginMutation();
    const [formError, setFormError] = useState<HTTPError>();

    const { form, setFormErrors } = useFormControls({
        defaultValues: {
            email: '',
            password: '',
        },
    });

    const onLogin = form.handleSubmit(async (values) => {
        try {
            await login(values);
        } catch (error) {
            if (error instanceof ValidationHttpError) {
                setFormErrors(error);
            } else if (error instanceof HTTPError) {
                setFormError(error);
                return;
            }

            console.error(error);
        }
    });

    return (
        <main className="flex-1 flex flex-col justify-center gap-6 p-8">
            <header className="flex flex-col items-center gap-4">
                <Link to="/">
                    <HomeIcon className="size-8" />
                </Link>
                <div className="flex flex-col gap-2 items-center">
                    <h1 className="text-3xl font-bold">Welcome back!</h1>
                    <p className="text-gray-500">Please enter your details to login to your account.</p>
                </div>
            </header>
            {formError && <AlertFromError error={formError} />}
            <FormProvider {...form}>
                <form onSubmit={onLogin} className="flex flex-col gap-4">
                    <FormText control={form.control} label="Email" name="email" placeholder="Enter your email" />
                    <FormPassword
                        control={form.control}
                        label="Password"
                        name="password"
                        placeholder="Enter your password"
                    />
                    <Button type="submit">Sign In</Button>
                </form>
            </FormProvider>
            <div>
                <p className="text-sm text-center">
                    Don&apos;t have an account?{' '}
                    <Link to="/register" className="font-medium">
                        Sign Up
                    </Link>
                </p>
            </div>
        </main>
    );
}
