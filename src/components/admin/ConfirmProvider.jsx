"use client";

import { createContext, useContext, useState, useCallback } from "react";
import ConfirmDialog from "@/components/admin/ConfirmDialog";

const ConfirmContext = createContext(null);

export function ConfirmProvider({ children }) {
  const [state, setState] = useState(null);

  const confirm = useCallback((options) => {
    return new Promise((resolve) => {
      setState({
        title: options?.title ?? "Are you sure?",
        message: options?.message ?? "This action cannot be undone.",
        confirmLabel: options?.confirmLabel ?? "Confirm",
        cancelLabel: options?.cancelLabel ?? "Cancel",
        variant: options?.variant ?? "danger",
        resolve,
      });
    });
  }, []);

  function handleClose(result) {
    state?.resolve(result);
    setState(null);
  }

  return (
    <ConfirmContext.Provider value={confirm}>
      {children}
      {state && (
        <ConfirmDialog
          title={state.title}
          message={state.message}
          confirmLabel={state.confirmLabel}
          cancelLabel={state.cancelLabel}
          variant={state.variant}
          onConfirm={() => handleClose(true)}
          onCancel={() => handleClose(false)}
        />
      )}
    </ConfirmContext.Provider>
  );
}

export function useConfirm() {
  const ctx = useContext(ConfirmContext);
  if (!ctx) throw new Error("useConfirm must be used within a ConfirmProvider");
  return ctx;
}