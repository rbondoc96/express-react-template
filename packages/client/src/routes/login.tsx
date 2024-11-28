import { type ReactNode } from 'react';
import { LoginForm } from '@/components/login-form';
import { Link } from '@/components/ui/link';

export function Login(): ReactNode {
    return (
        <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-2 items-center">
                <h1 className="text-4xl font-bold">Welcome back!</h1>
                <p>Please enter your details</p>
            </div>
            <LoginForm />
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
