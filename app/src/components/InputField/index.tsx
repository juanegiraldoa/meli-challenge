import { Input, type InputProps } from "../Input";

export interface InputFieldProps extends InputProps {
  helperText?: string;
}

export function InputField({ helperText, value, ...rest }: InputFieldProps) {
  return (
    <div className="flex w-full flex-col">
      <Input value={value ?? ""} {...rest} />
    </div>
  );
}
