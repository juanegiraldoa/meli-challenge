import {
  Button,
  Modal as ModalFlow,
  ModalBody,
  ModalFooter,
  ModalHeader,
  type ModalProps as ModalPropsFlow,
} from "flowbite-react";
import type { ReactNode } from "react";

export interface ModalProps extends ModalPropsFlow {
  title: string;
  children?: ReactNode;
  open?: boolean;
}

export function Modal({
  title,
  children,
  open = false,
  onClose,
  ...rest
}: ModalProps) {
  return (
    <ModalFlow show={open} onClose={onClose} {...rest}>
      <ModalHeader>{title}</ModalHeader>
      <ModalBody>{children}</ModalBody>
      <ModalFooter>
        <Button onClick={onClose}>Accept</Button>
      </ModalFooter>
    </ModalFlow>
  );
}
