import { type CheckedState, Indicator as RadixIndicator, Root as RadixRoot } from '@radix-ui/react-checkbox';
import { CheckIcon, SlashIcon } from '@radix-ui/react-icons';
import { type FunctionComponent } from 'react';
import { cn } from '@/utilities/cn';

type CheckboxProps = {
    checked?: CheckedState;
    disabled?: boolean;
    label: string;
    name?: string;
    tabIndex?: number;
    value?: string;
    onChange: (checked: CheckedState) => void;
};
export const Checkbox: FunctionComponent<CheckboxProps> = ({
    checked,
    disabled = false,
    label,
    name,
    tabIndex,
    value,
    onChange,
}) => {
    return (
        <div className={cn('flex items-center gap-x-2')}>
            <RadixRoot
                defaultChecked="indeterminate"
                checked={checked}
                className={cn('flex justify-center items-center', 'h-4 w-4', 'rounded-md', 'bg-white', 'border')}
                disabled={disabled}
                id={name}
                name={name}
                tabIndex={tabIndex}
                value={value}
                onCheckedChange={onChange}
            >
                <RadixIndicator className="flex">
                    {checked === undefined || checked === 'indeterminate' ? (
                        <SlashIcon className="h-3 w-3" />
                    ) : (
                        <CheckIcon className="h-3 w-3" />
                    )}
                </RadixIndicator>
            </RadixRoot>

            <label className={cn('text-sm', name && 'cursor-pointer')} htmlFor={name}>
                {label}
            </label>
        </div>
    );
};

Checkbox.displayName = 'Checkbox';
