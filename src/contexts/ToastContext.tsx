import {createContext, type ReactNode, useState, useCallback} from "react";
import ToastContainer from "../components/ToastContainer.tsx";

export type ToastMessageType = {
  id: string;
  message: string;
  bg?: string;
}

export type ToastContextType = {
  toast: (message: string, bg?: string) => void;
}

const ToastContext = createContext<ToastContextType | null>(null)

export {ToastContext}

export function ToastProvider({children}: { children: ReactNode }) {
  const [items, setItems] = useState<ToastMessageType[]>([]);

  const hide = useCallback((id: string) => {
    setItems((t) => t.filter((x) => x.id !== id));
  }, []);

  const toast = useCallback((message: string, bg?: string) => {
    const id = crypto.randomUUID();
    setItems((t) => [...t, {id, message, bg}]);
    setTimeout(() => hide(id), 4000)
  }, [hide]);
  return (
    <ToastContext.Provider value={{toast}}>
      {children}
      <ToastContainer items={items} hide={hide}/>
    </ToastContext.Provider>
  );
}