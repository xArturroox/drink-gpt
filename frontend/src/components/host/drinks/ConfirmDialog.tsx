import React, { useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";

interface ConfirmDialogProps {
  isOpen: boolean;
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
}

const ConfirmDialog: React.FC<ConfirmDialogProps> = ({ isOpen, message, onConfirm, onCancel }) => {
  const dialogRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onCancel();
    };
    document.addEventListener("keydown", handleKeyDown);
    dialogRef.current?.focus();
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onCancel]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div
        ref={dialogRef}
        tabIndex={-1}
        role="dialog"
        aria-modal="true"
        className="bg-white dark:bg-gray-800 p-6 rounded-md shadow-lg max-w-sm w-full"
      >
        <p className="mb-4">{message}</p>
        <div className="flex justify-end space-x-2">
          <Button variant="outline" onClick={onCancel}>
            Anuluj
          </Button>
          <Button variant="destructive" onClick={onConfirm}>
            Usuń
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmDialog;
