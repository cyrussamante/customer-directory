import { useEffect, useRef, useState } from 'react';
import { askChatBot } from '../api/chatAPI';
import "./ChatBot.css";
import ChatIcon from '@mui/icons-material/Chat';
import CloseIcon from '@mui/icons-material/Close';

type Msg = { role: 'user' | 'bot'; text: string };

export default function ChatBot() {
  const [open, setOpen] = useState(false);
  const [msgs, setMsgs] = useState<Msg[]>([
    { role: 'bot', text: 'Ask any questions about your clients 😎' }
  ]);
  const [input, setInput] = useState('');
  const [busy, setBusy] = useState(false);
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [msgs, open]);

  async function send() {
    const q = input.trim();
    if (!q || busy) return;
    setInput('');
    setMsgs(m => [...m, { role: 'user', text: q }]);
    setBusy(true);
    try {
      const answer = await askChatBot(q);
      setMsgs(m => [...m, { role: 'bot', text: answer || 'No answer.' }]);
    } catch {
      setMsgs(m => [...m, { role: 'bot', text: 'Sorry—request failed.' }]);
    } finally {
      setBusy(false);
    }
  }

  return (
    <>
      {!open && (
        <button onClick={() => setOpen(true)} className="chatbotButton">
          <ChatIcon />
        </button>
      )}

      {open && (
        <div className="chatbotContainer">
          <div className="chatbotHeader">
            <strong className="chatbotHeaderTitle">Atlas</strong>
            <button onClick={() => setOpen(false)} className="chatbotCloseButton">
              <CloseIcon />
            </button>
          </div>

          <div className="chatbotMessageContainer">
            {msgs.map((m, i) => (
              <div
                key={i}
                className={`chatbotMessage ${m.role === 'user' ? 'chatbotMessageUser' : 'chatbotMessageBot'
                  }`}
              >
                <div className="chatbotMessageContent">
                  {m.text}
                </div>
              </div>
            ))}
            <div ref={endRef} />
          </div>

          <div className="chatbotInputContainer">
            <input
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && send()}
              placeholder={busy ? 'Thinking…' : 'Ask about customers…'}
              disabled={busy}
              className="chatbotInput"
            />
            <button onClick={send} disabled={busy} className="chatbotSendButton">
              Send
            </button>
          </div>
        </div>
      )}
    </>
  );
}