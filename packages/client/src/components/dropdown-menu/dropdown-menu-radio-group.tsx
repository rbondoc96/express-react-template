import { RadioGroup } from '@radix-ui/react-dropdown-menu';
import { type ComponentPropsWithoutRef, type ReactNode } from 'react';

type DropdownMenuRadioGroupProps = ComponentPropsWithoutRef<typeof RadioGroup>;

export function DropdownMenuRadioGroup(props: DropdownMenuRadioGroupProps): ReactNode {
    return <RadioGroup {...props} />;
}
