import { type ReactNode } from 'react';
import { RegisterForm } from '@/components/register-form';
import { Link } from '@/components/ui/link';

export function Register(): ReactNode {
    return (
        <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-2 items-center">
                <h1 className="text-4xl font-bold">Create an account</h1>
                <p>Please enter your details</p>
            </div>
            <RegisterForm />
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
