import { HTTPError } from 'ky';
import * as React from 'react';
import { FormProvider } from 'react-hook-form';
import { User } from '@/api/validators/user-validator';
import { useFormControls } from '@/components/hooks/use-form-controls';
import { AlertFromError } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { FormText } from '@/components/ui/form';
import { Modal, ModalFooter, ModalHeader } from '@/components/ui/modal';
import { ValidationHttpError } from '@/errors/validation-http-error';
import { type UserUpdatePayload, useUserUpdateMutation } from '@/hooks/mutations/use-user-update-mutation';

type EditUserModalProps = {
    open: boolean;
    user: User;
    onOpenChange: (value: boolean) => void;
};

export function EditUserModal({ open, user, onOpenChange }: EditUserModalProps): React.ReactNode {
    const { mutateAsync: updateUser, isPending } = useUserUpdateMutation();
    const [formError, setFormError] = React.useState<HTTPError>();

    const { form, setFormErrors } = useFormControls<UserUpdatePayload>({
        defaultValues: {
            first_name: user.first_name,
            last_name: user.last_name,
            role: user.role,
            username: user.username,
        },
    });

    const onUpdate = form.handleSubmit(async (values) => {
        try {
            await updateUser({
                route: {
                    userId: user.id,
                },
                payload: values,
            });

            onOpenChange(false);
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
        <Modal open={open} onOpenChange={onOpenChange}>
            <ModalHeader title="Edit User" />
            <div className="mt-2">
                {formError && <AlertFromError error={formError} />}
                <FormProvider {...form}>
                    <form className="flex flex-col gap-4" onSubmit={onUpdate}>
                        <div className="flex flex-col gap-4">
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
                            <FormText control={form.control} label="Username" name="username" placeholder="Username" />
                        </div>
                        <ModalFooter>
                            <Button loading={isPending} type="submit">
                                Submit
                            </Button>
                        </ModalFooter>
                    </form>
                </FormProvider>
            </div>
        </Modal>
    );
}
