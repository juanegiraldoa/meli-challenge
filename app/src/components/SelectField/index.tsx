import { Label } from "flowbite-react";
import { Select, type SelectProps } from "../Select";

export interface SelectFieldProps extends SelectProps {
  label?: string;
}

export function SelectField({ id, label, ...rest }: SelectFieldProps) {
  return (
    <div className="flex w-full flex-col">
      <Label>{label}</Label>
      <Select id={id} {...rest} />
    </div>
  );
}
