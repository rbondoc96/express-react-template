import { zodResolver } from '@hookform/resolvers/zod';
import { HTTPError } from 'ky';
import { type ReactNode, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { FormPassword } from '@/components/form-fields/form-password';
import { FormText } from '@/components/form-fields/form-text';
import { AlertFromError } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Link } from '@/components/ui/link';
import { ValidationHttpError } from '@/errors/validation-http-error';
import {
    type RegisterPayload,
    registerPayloadSchema,
    useRegisterMutation,
} from '@/hooks/mutations/use-register-mutation';

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
        resolver: zodResolver(registerPayloadSchema),
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
        <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-2 items-center">
                <h1 className="text-4xl font-bold">Create an account</h1>
                <p>Please enter your details</p>
            </div>
            <div className="flex flex-col gap-4">
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
                            <FormText
                                control={form.control}
                                label="Last Name"
                                name="last_name"
                                placeholder="Last name"
                            />
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
            </div>
            <div>
                <p className="text-sm text-center">
                    Already have an account?{' '}
                    <Link to="/login" className="font-medium">
                        Sign In
                    </Link>
                </p>
            </div>
        </div>
    );
}
