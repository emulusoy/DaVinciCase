
import { useEffect } from 'react';

type Props = { open: boolean; title?: string; onClose: () => void; children: React.ReactNode };

export default function Modal({ open, title, onClose, children }: Props) {
  useEffect(() => {
    function onKey(e: KeyboardEvent) { if (e.key === 'Escape') onClose(); }
    if (open) window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, onClose]);

  if (!open) return null;
  return (
    <div className="modal-backdrop" onClick={onClose} role="dialog" aria-modal="true" aria-label={title}>
      <div className="modal" onClick={e => e.stopPropagation()}>
        <header>
          <h3 style={{ margin:0 }}>{title}</h3>
          <button className="btn" onClick={onClose} aria-label="Kapat">✕</button>
        </header>
        {children}
      </div>
    </div>
  );
}
