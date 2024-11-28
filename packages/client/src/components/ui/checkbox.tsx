import * as CheckboxPrimitive from '@radix-ui/react-checkbox';
import { CheckIcon, SlashIcon } from '@radix-ui/react-icons';
import { type ElementRef, forwardRef } from 'react';
import { cn } from '@/utilities/cn';

type CheckboxProps = {
    checked?: CheckboxPrimitive.CheckedState;
    disabled?: boolean;
    label: string;
    name?: string;
    tabIndex?: number;
    value?: string;
    onChange: (checked: CheckboxPrimitive.CheckedState) => void;
};
export const Checkbox = forwardRef<ElementRef<typeof CheckboxPrimitive.Root>, CheckboxProps>(
    ({ checked, disabled = false, label, name, tabIndex, value, onChange }, ref) => {
        return (
            <div className={cn('flex items-center gap-x-2')}>
                <CheckboxPrimitive.Root
                    defaultChecked="indeterminate"
                    checked={checked}
                    className={cn('flex justify-center items-center', 'h-4 w-4', 'rounded-md', 'bg-white', 'border')}
                    disabled={disabled}
                    id={name}
                    name={name}
                    ref={ref}
                    tabIndex={tabIndex}
                    value={value}
                    onCheckedChange={onChange}
                >
                    <CheckboxPrimitive.Indicator className="flex">
                        {checked === undefined || checked === 'indeterminate' ? (
                            <SlashIcon className="h-3 w-3" />
                        ) : (
                            <CheckIcon className="h-3 w-3" />
                        )}
                    </CheckboxPrimitive.Indicator>
                </CheckboxPrimitive.Root>

                <label className={cn('text-sm', name && 'cursor-pointer')} htmlFor={name}>
                    {label}
                </label>
            </div>
        );
    },
);
Checkbox.displayName = 'Checkbox';
