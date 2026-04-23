"use client";

import { createContext, useContext, useState, useCallback, ReactNode } from "react";

interface ContactModalCtx {
  open:  (apartmentLabel?: string) => void;
  close: () => void;
  isOpen: boolean;
  preselected: string;
}

const ContactModalContext = createContext<ContactModalCtx | null>(null);

export function ContactModalProvider({ children }: { children: ReactNode }) {
  const [isOpen,      setIsOpen]      = useState(false);
  const [preselected, setPreselected] = useState("");

  const open  = useCallback((label = "") => { setPreselected(label); setIsOpen(true);  }, []);
  const close = useCallback(()           => { setIsOpen(false);                        }, []);

  return (
    <ContactModalContext.Provider value={{ open, close, isOpen, preselected }}>
      {children}
    </ContactModalContext.Provider>
  );
}

export function useContactModal() {
  const ctx = useContext(ContactModalContext);
  if (!ctx) throw new Error("useContactModal must be used within ContactModalProvider");
  return ctx;
}
