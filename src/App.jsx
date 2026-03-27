import { useState, useRef, useEffect } from 'react'
import './App.css'

function TypingIndicator() {
  return (
    <div className="typing-indicator">
      <span /><span /><span />
    </div>
  )
}

function Message({ msg }) {
  if (msg.role === 'user') {
    return (
      <div className="msg msg--user">
        <div className="msg__bubble">{msg.text}</div>
        <div className="msg__avatar msg__avatar--user">You</div>
      </div>
    )
  }

  return (
    <div className="msg msg--copilot">
      <div className="msg__avatar msg__avatar--copilot">🤖</div>
      <div>
        <div className="msg__label">Nutrition Copilot</div>
        {msg.typing
          ? <TypingIndicator />
          : <div className="msg__bubble msg__bubble--copilot">{msg.text}</div>
        }
      </div>
    </div>
  )
}

export default function App() {
  const [messages, setMessages] = useState([
    {
      id: 0,
      role: 'copilot',
      text: "👋 Welcome to the Nutrition Center! I'm your Nutrition Copilot. Ask me a nutrition question and I'll find the right answer for you.",
    },
  ])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const bottomRef = useRef(null)
  const inputRef = useRef(null)
  const msgIdRef = useRef(1)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  function nextId() {
    return msgIdRef.current++
  }

  async function handleSend() {
    const question = input.trim()
    if (!question || loading) return

    setInput('')
    setLoading(true)

    setMessages(prev => [...prev, { id: nextId(), role: 'user', text: question }])

    // Show typing indicator while "thinking"
    const typingId = nextId()
    setMessages(prev => [...prev, { id: typingId, role: 'copilot', typing: true }])

    await delay(800)

    setMessages(prev =>
      prev.map(m => m.id === typingId
        ? { ...m, typing: false, text: "I've received your question. Once the specialist bots are connected, I'll route it to the right one and bring back the answer for you." }
        : m
      )
    )

    setLoading(false)
    inputRef.current?.focus()
  }

  function handleKeyDown(e) {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  return (
    <div className="app">
      <aside className="sidebar">
        <div className="sidebar__logo">
          <span className="sidebar__logo-icon">🥦</span>
          <div>
            <div className="sidebar__logo-title">Nutrition Center</div>
            <div className="sidebar__logo-sub">Powered by Copilot</div>
          </div>
        </div>

        <div className="sidebar__section-title">Coming Soon</div>
        <div className="sidebar__coming-soon">
          <p>🔥 Calorie Bot</p>
          <p>🥗 Meal Planner Bot</p>
          <p>💊 Vitamins &amp; Minerals Bot</p>
          <p>💧 Hydration Bot</p>
          <p>🚫 Dietary Needs Bot</p>
        </div>
      </aside>

      <main className="chat">
        <header className="chat__header">
          <span className="chat__header-icon">🤖</span>
          <div>
            <div className="chat__header-title">Nutrition Copilot</div>
            <div className="chat__header-status">
              {loading ? 'Thinking…' : 'Online — ask me anything about nutrition'}
            </div>
          </div>
        </header>

        <div className="chat__messages">
          {messages.map(msg => <Message key={msg.id} msg={msg} />)}
          <div ref={bottomRef} />
        </div>

        <div className="chat__input-area">
          <textarea
            ref={inputRef}
            className="chat__textarea"
            placeholder="Ask a nutrition question…"
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            rows={1}
            disabled={loading}
          />
          <button
            className="chat__send-btn"
            onClick={handleSend}
            disabled={!input.trim() || loading}
            aria-label="Send message"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="22" y1="2" x2="11" y2="13" />
              <polygon points="22 2 15 22 11 13 2 9 22 2" />
            </svg>
          </button>
        </div>
      </main>
    </div>
  )
}

function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms))
}

