import { useCallback, type FormEvent, type ReactNode } from "react";

export interface FormProps {
  children?: ReactNode;
  onSubmit?: (
    data: Record<string, any>,
    event: FormEvent<HTMLFormElement>,
  ) => any;
  className?: string;
}

export function Form({ children, onSubmit, className }: FormProps) {
  const handleSubmit = useCallback(
    (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      const { currentTarget } = event;
      const formData = new FormData(currentTarget);
      const data: Record<string, any> = {};
      for (const [name, value] of formData) {
        data[name] = value;
      }
      onSubmit?.(data, event);
    },
    [onSubmit],
  );

  return (
    <form className={className} onSubmit={handleSubmit}>
      {children}
    </form>
  );
}
