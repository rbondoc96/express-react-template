import { type ReactNode } from 'react';
import { Link } from '@/components/link';
import { RegisterForm } from '@/components/register-form';

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
