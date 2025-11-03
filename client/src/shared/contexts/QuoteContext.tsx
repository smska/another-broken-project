import { createContext, useContext, useState, type ReactNode, type JSX } from "react";

interface QuoteContextType {
  quote: string;
  setQuote: (quote: string) => void;
}

const QuoteContext = createContext<QuoteContextType | undefined>(undefined);

export function QuoteProvider({ children }: { children: ReactNode }): JSX.Element {
  const [quote, setQuote] = useState<string>();

  return (
    <QuoteContext.Provider value={{ quote, setQuote }}>
      {children}
    </QuoteContext.Provider>
  );
}

export function useQuote(): QuoteContextType {
  const context = useContext(QuoteContext);
  if (!context) {
    throw new Error("useQuote must be used within QuoteProvider");
  }
  return context;
}

