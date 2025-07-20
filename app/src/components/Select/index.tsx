import {
  Select as SelectFlow,
  type SelectProps as SelectPropsFlow,
} from "flowbite-react";

type Option = { label: string; value: any };

export interface SelectProps extends SelectPropsFlow {
  options: Option[];
}

export function Select({ options = [], ...rest }: SelectProps) {
  return (
    <SelectFlow {...rest}>
      <option></option>
      {options.map(({ label, value }, index) => (
        <option key={index + value} value={value}>
          {label}
        </option>
      ))}
    </SelectFlow>
  );
}
