import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { askChatBot} from '../api/chatAPI';

type Msg = { role: 'user' | 'bot'; text: string };

export default function ChatBot() {
  const [open, setOpen] = useState(false);
  const [msgs, setMsgs] = useState<Msg[]>([
    { role: 'bot', text: 'Ask me anything about your clients (e.g., "names with more than 5 orders").' }
  ]);
  const [input, setInput] = useState('');
  const [busy, setBusy] = useState(false);
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => { endRef.current?.scrollIntoView({ behavior: 'smooth' }); }, [msgs, open]);

  async function send() {
    const q = input.trim();
    if (!q || busy) return;
    setInput('');
    setMsgs(m => [...m, { role: 'user', text: q }]);
    setBusy(true);
    try {
      const answer = await askChatBot(q);   // ✅ every query hits Groq via backend
      setMsgs(m => [...m, { role: 'bot', text: answer || 'No answer.' }]);
    } catch {
      setMsgs(m => [...m, { role: 'bot', text: 'Sorry—request failed.' }]);
    } finally {
      setBusy(false);
    }
  }

  return createPortal(
    <>
      {!open && (
        <button
          onClick={() => setOpen(true)}
          style={{ position: 'fixed', right: 20, bottom: 20, zIndex: 2147483647,
                   borderRadius: 9999, padding: '12px 16px', background: '#2563eb',
                   color: '#fff', border: 'none', boxShadow: '0 8px 24px rgba(0,0,0,.25)', cursor: 'pointer' }}>
          Chat
        </button>
      )}

      {open && (
        <div style={{ position: 'fixed', right: 20, bottom: 20, width: 'min(360px, calc(100vw - 24px))',
                      maxHeight: '70vh', display: 'flex', flexDirection: 'column', background: '#0b1220',
                      color: '#fff', borderRadius: 12, boxShadow: '0 16px 40px rgba(0,0,0,.35)',
                      overflow: 'hidden', zIndex: 2147483647 }}>
          <div style={{ display: 'flex', alignItems: 'center', padding: '10px 12px', background: '#1f2937' }}>
            <strong style={{ flex: 1 }}>Client Chat</strong>
            <button onClick={() => setOpen(false)} style={{ background: 'transparent', border: 'none', color: '#fff' }}>✕</button>
          </div>

          <div style={{ padding: 12, overflowY: 'auto', flex: 1 }}>
            {msgs.map((m, i) => (
              <div key={i} style={{ display: 'flex', justifyContent: m.role === 'user' ? 'flex-end' : 'flex-start', marginBottom: 8 }}>
                <div style={{ maxWidth: '85%', whiteSpace: 'pre-wrap', background: m.role==='user'?'#2563eb':'#374151',
                              color: '#fff', padding: '8px 10px', borderRadius: 8 }}>
                  {m.text}
                </div>
              </div>
            ))}
            <div ref={endRef} />
          </div>

          <div style={{ display: 'flex', gap: 8, padding: 10, background: '#111827' }}>
            <input
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && send()}
              placeholder={busy ? 'Thinking…' : 'Ask about customers…'}
              disabled={busy}
              style={{ flex: 1, borderRadius: 8, border: '1px solid #374151', padding: '8px 10px',
                       background: '#0f172a', color: '#fff' }}
            />
            <button onClick={send} disabled={busy}
                    style={{ borderRadius: 8, border: 'none', padding: '8px 12px', background: '#2563eb', color: '#fff' }}>
              Send
            </button>
          </div>
        </div>
      )}
    </>,
    document.body
  );
}
