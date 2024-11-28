import { HomeIcon } from '@radix-ui/react-icons';
import { HTTPError } from 'ky';
import { type ReactNode, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { AlertFromError } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { FormPassword, FormText } from '@/components/ui/form';
import { Link } from '@/components/ui/link';
import { ValidationHttpError } from '@/errors/validation-http-error';
import { type RegisterPayload, useRegisterMutation } from '@/hooks/mutations/use-register-mutation';

export function Register(): ReactNode {
    const { mutateAsync: register } = useRegisterMutation();
    const [formError, setFormError] = useState<HTTPError>();

    const form = useForm<RegisterPayload>({
        defaultValues: {
            username: '',
            first_name: '',
            last_name: '',
            password: '',
        },
    });

    const onRegister = form.handleSubmit(async (values) => {
        try {
            await register(values);
        } catch (error) {
            if (error instanceof ValidationHttpError) {
                Object.entries(error.messages).forEach(([name, message]) => {
                    form.setError(name as keyof RegisterPayload, { type: 'custom', message });
                });
            } else if (error instanceof HTTPError) {
                setFormError(error);
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
                    <h1 className="text-4xl font-bold">Create an account</h1>
                    <p>Please enter your details</p>
                </div>
            </header>
            {formError && <AlertFromError error={formError} />}
            <FormProvider {...form}>
                <form onSubmit={onRegister} className="flex flex-col gap-4">
                    <div className="flex gap-1 *:flex-1">
                        <FormText
                            control={form.control}
                            label="First Name"
                            name="first_name"
                            placeholder="First name"
                        />
                        <FormText control={form.control} label="Last Name" name="last_name" placeholder="Last name" />
                    </div>
                    <FormText
                        type="email"
                        control={form.control}
                        label="Username"
                        name="username"
                        placeholder="Username"
                    />
                    <FormPassword control={form.control} label="Password" name="password" placeholder="Password" />
                    <Button type="submit">Sign Up</Button>
                </form>
            </FormProvider>
            <div>
                <p className="text-sm text-center">
                    Already have an account?{' '}
                    <Link to="/login" className="font-medium">
                        Sign In
                    </Link>
                </p>
            </div>
        </main>
    );
}
