import { useState, useRef, useEffect } from 'react'
import './App.css'
import { BOTS, routeQuestion, getBotResponse, getBotsByCategory } from './bots'

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

  const bot = msg.botId ? BOTS[msg.botId] : null
  const avatarStyle = bot ? { backgroundColor: bot.color + '22', color: bot.color } : {}

  return (
    <div className="msg msg--bot">
      <div className="msg__avatar msg__avatar--bot" style={avatarStyle}>
        {bot ? bot.emoji : '🤖'}
      </div>
      <div>
        <div className="msg__label">{bot ? bot.name : 'Nutrition Copilot'}</div>
        {msg.typing
          ? <TypingIndicator />
          : <div className="msg__bubble msg__bubble--bot">{msg.text}</div>
        }
      </div>
    </div>
  )
}

function BotCard({ bot }) {
  return (
    <div className="bot-card" style={{ borderLeftColor: bot.color }}>
      <span className="bot-card__emoji">{bot.emoji}</span>
      <div>
        <div className="bot-card__name">{bot.name}</div>
        <div className="bot-card__desc">{bot.description}</div>
      </div>
    </div>
  )
}

export default function App() {
  const [messages, setMessages] = useState([
    {
      id: 0,
      role: 'bot',
      botId: null,
      text: "👋 Welcome to the Nutrition Center! Ask me a nutrition question and I'll route it to the right specialist department for you.",
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

    const botIds = routeQuestion(question)

    // Show a typing indicator for each responding bot
    const typingEntries = botIds.map(botId => ({ id: nextId(), role: 'bot', botId, typing: true }))
    setMessages(prev => [...prev, ...typingEntries])

    // Stagger each bot's response slightly
    for (let i = 0; i < typingEntries.length; i++) {
      await delay(600 + i * 400)
      const entry = typingEntries[i]
      const response = getBotResponse(entry.botId, question)
      setMessages(prev =>
        prev.map(m => m.id === entry.id
          ? { ...m, typing: false, text: response }
          : m
        )
      )
    }

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

        <div className="sidebar__section-title">Library Bots</div>
        <div className="sidebar__bots">
          {getBotsByCategory('library').map(bot => (
            <BotCard key={bot.id} bot={bot} />
          ))}
        </div>

        <div className="sidebar__section-title">Departments</div>
        <div className="sidebar__bots">
          {getBotsByCategory('department').map(bot => (
            <BotCard key={bot.id} bot={bot} />
          ))}
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

