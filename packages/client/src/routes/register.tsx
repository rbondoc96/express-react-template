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
import { useRegisterMutation } from '@/hooks/mutations/use-register-mutation';

export function Register(): ReactNode {
    const { mutateAsync: register, isPending } = useRegisterMutation();
    const [formError, setFormError] = useState<HTTPError>();

    const { form, setFormErrors } = useFormControls({
        defaultValues: {
            email: '',
            first_name: '',
            last_name: '',
            password: '',
            password_confirmation: '',
        },
    });

    const onRegister = form.handleSubmit(async (values) => {
        setFormError(undefined);

        try {
            await register(values);
        } catch (error) {
            if (error instanceof ValidationHttpError) {
                setFormErrors(error);
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
                    <h1 className="text-3xl font-bold">Create an account</h1>
                    <p className="text-gray-500">Enter your information below to create an account.</p>
                </div>
            </header>
            {formError && <AlertFromError error={formError} />}
            <FormProvider {...form}>
                <form onSubmit={onRegister} className="flex flex-col gap-4">
                    <div className="flex gap-2 *:flex-1">
                        <FormText
                            control={form.control}
                            label="First Name"
                            name="first_name"
                            placeholder="First name"
                        />
                        <FormText control={form.control} label="Last Name" name="last_name" placeholder="Last name" />
                    </div>
                    <FormText control={form.control} label="Email" name="email" placeholder="Enter your email" />
                    <FormPassword control={form.control} label="Password" name="password" placeholder="********" />
                    <FormPassword
                        control={form.control}
                        label="Confirm Password"
                        name="password_confirmation"
                        placeholder="********"
                    />
                    <Button type="submit" loading={isPending}>
                        Sign Up
                    </Button>
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
