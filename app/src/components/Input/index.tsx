import { FloatingLabel, type FloatingLabelProps } from "flowbite-react";

export interface InputProps
  extends Omit<Omit<FloatingLabelProps, "variant">, "label"> {
  variant?: FloatingLabelProps["variant"];
  label?: FloatingLabelProps["label"];
}

export function Input({ label = "", variant = "filled", ...rest }: InputProps) {
  return <FloatingLabel label={label} variant={variant} {...rest} />;
}
