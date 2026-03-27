import { useState, useRef, useEffect } from 'react'
import { BOTS, routeQuestion, getBotResponse } from './bots'
import './App.css'

const COPILOT_DELAY = 600   // ms before copilot "thinks"
const BOT_DELAY_BASE = 900  // ms base delay before each bot replies

function TypingIndicator({ color }) {
  return (
    <div className="typing-indicator">
      <span style={{ background: color }} />
      <span style={{ background: color }} />
      <span style={{ background: color }} />
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

  if (msg.role === 'copilot') {
    return (
      <div className="msg msg--copilot">
        <div className="msg__avatar msg__avatar--copilot">🤖</div>
        <div>
          <div className="msg__label">Nutrition Copilot</div>
          {msg.typing ? (
            <TypingIndicator color="#6366f1" />
          ) : (
            <div className="msg__bubble msg__bubble--copilot">{msg.text}</div>
          )}
        </div>
      </div>
    )
  }

  if (msg.role === 'bot') {
    const bot = BOTS[msg.botId]
    return (
      <div className="msg msg--bot">
        <div className="msg__avatar msg__avatar--bot" style={{ background: bot.color + '22', border: `2px solid ${bot.color}` }}>
          {bot.emoji}
        </div>
        <div>
          <div className="msg__label" style={{ color: bot.color }}>{bot.name}</div>
          {msg.typing ? (
            <TypingIndicator color={bot.color} />
          ) : (
            <div className="msg__bubble msg__bubble--bot" style={{ borderLeft: `3px solid ${bot.color}` }}>
              {msg.text}
            </div>
          )}
        </div>
      </div>
    )
  }

  return null
}

function BotBadge({ bot, active }) {
  return (
    <div className={`bot-badge ${active ? 'bot-badge--active' : ''}`} style={{ '--bot-color': bot.color }}>
      <span className="bot-badge__emoji">{bot.emoji}</span>
      <div>
        <div className="bot-badge__name">{bot.name}</div>
        <div className="bot-badge__desc">{bot.description}</div>
      </div>
      {active && <span className="bot-badge__dot" />}
    </div>
  )
}

export default function App() {
  const [messages, setMessages] = useState([
    {
      id: 0,
      role: 'copilot',
      text: "👋 Welcome to the Nutrition Center! I'm your Nutrition Copilot. Ask me anything about calories, meal planning, vitamins, hydration, or dietary needs — and I'll connect you with the right specialist bot.",
    },
  ])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [activeBots, setActiveBots] = useState([])
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

    // Add user message
    const userMsg = { id: nextId(), role: 'user', text: question }
    setMessages(prev => [...prev, userMsg])

    // Copilot typing indicator
    const copilotTypingId = nextId()
    setMessages(prev => [...prev, { id: copilotTypingId, role: 'copilot', typing: true }])

    await delay(COPILOT_DELAY)

    // Route question to bots
    const botIds = routeQuestion(question)
    setActiveBots(botIds)

    // Replace copilot typing with actual copilot message
    const botNames = botIds.map(id => BOTS[id].name).join(', ')
    const copilotText = botIds.length === 1
      ? `I'm routing your question to the **${botNames}** for a specialist answer.`
      : `Great question! I'm routing this to ${botIds.length} specialist bots: **${botNames}**.`

    setMessages(prev =>
      prev.map(m => m.id === copilotTypingId
        ? { ...m, typing: false, text: copilotText }
        : m
      )
    )

    // Each bot responds in sequence with a small delay
    for (let i = 0; i < botIds.length; i++) {
      const botId = botIds[i]
      const botTypingId = nextId()

      // Add bot typing indicator
      setMessages(prev => [...prev, { id: botTypingId, role: 'bot', botId, typing: true }])
      await delay(BOT_DELAY_BASE + i * 300)

      // Replace typing with actual bot response
      const response = getBotResponse(botId, question)
      setMessages(prev =>
        prev.map(m => m.id === botTypingId
          ? { ...m, typing: false, text: response }
          : m
        )
      )
    }

    setLoading(false)
    setActiveBots([])
    inputRef.current?.focus()
  }

  function handleKeyDown(e) {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  const suggestions = [
    'How many calories should I eat per day?',
    'What should I eat for breakfast?',
    'What vitamins am I likely missing?',
    'How much water should I drink?',
    'What foods should I avoid if I\'m gluten-free?',
  ]

  return (
    <div className="app">
      {/* Sidebar */}
      <aside className="sidebar">
        <div className="sidebar__logo">
          <span className="sidebar__logo-icon">🥦</span>
          <div>
            <div className="sidebar__logo-title">Nutrition Center</div>
            <div className="sidebar__logo-sub">Powered by Copilot</div>
          </div>
        </div>

        <div className="sidebar__section-title">Specialist Bots</div>
        <div className="sidebar__bots">
          {Object.values(BOTS).map(bot => (
            <BotBadge key={bot.id} bot={bot} active={activeBots.includes(bot.id)} />
          ))}
        </div>

        <div className="sidebar__section-title sidebar__section-title--suggestions">Quick Questions</div>
        <ul className="sidebar__suggestions">
          {suggestions.map((s, i) => (
            <li key={i}>
              <button
                className="sidebar__suggestion-btn"
                onClick={() => { if (!loading) { setInput(s) } }}
                disabled={loading}
              >
                {s}
              </button>
            </li>
          ))}
        </ul>
      </aside>

      {/* Main chat area */}
      <main className="chat">
        <header className="chat__header">
          <div className="chat__header-info">
            <span className="chat__header-icon">🤖</span>
            <div>
              <div className="chat__header-title">Nutrition Copilot</div>
              <div className="chat__header-status">
                {loading
                  ? `Consulting ${activeBots.map(id => BOTS[id]?.name).join(', ')}…`
                  : 'Online — ask me anything about nutrition'}
              </div>
            </div>
          </div>
        </header>

        <div className="chat__messages">
          {messages.map(msg => (
            <Message key={msg.id} msg={msg} />
          ))}
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

