import {Toast, ToastContainer as BSToastContainer} from "react-bootstrap";
import type {ToastMessageType} from "../contexts/ToastContext";

export default function ToastContainer({items, hide}: {items: ToastMessageType[], hide: (id: string) => void}) {
  const getToastTitle = (bg?: string) => {
    switch(bg) {
      case 'success': return 'Success';
      case 'danger': return 'Error';
      case 'warning': return 'Warning';
      case 'info': return 'Info';
      default: return 'Notification';
    }
  };

  const needsWhiteText = (bg?: string) => {
    return ['primary', 'secondary', 'success', 'danger', 'dark'].includes(bg || 'dark');
  };

  return (
    <BSToastContainer position="top-end" className="p-3">
      {items.map((t) => (
        <Toast
          key={t.id}
          bg={t.bg || 'light'}
          onClose={() => hide(t.id)}
          show
          autohide
          delay={4000}
        >
          <Toast.Header>
            <strong className="me-auto">{getToastTitle(t.bg)}</strong>
            <small>just now</small>
          </Toast.Header>
          <Toast.Body className={needsWhiteText(t.bg) ? 'text-white' : ''}>
            {t.message}
          </Toast.Body>
        </Toast>
      ))}
    </BSToastContainer>
  )
}