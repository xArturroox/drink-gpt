import { useState } from "react";

export default function useConfirmationDialog() {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [targetId, setTargetId] = useState<string | null>(null);

  function open(id: string) {
    setTargetId(id);
    setIsOpen(true);
  }

  function close() {
    setIsOpen(false);
    setTargetId(null);
  }

  return { isOpen, targetId, open, close };
}
