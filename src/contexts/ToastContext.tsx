import {createContext, type ReactNode, useState} from "react";
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

  const toast = (message: string, bg?: string) => {
    const id = crypto.randomUUID();
    setItems((t) => [...t, {id, message, bg}]);
    setTimeout(() => hide(id), 4000)
  }

  const hide = (id: string) =>
    setItems((t) => t.filter((x) => x.id !== id));
  return (
    <ToastContext.Provider value={{toast}}>
      {children}
      <ToastContainer items={items} hide={hide}/>
    </ToastContext.Provider>
  );
}