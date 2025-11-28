import React, { useState, useRef, useEffect } from 'react'

export default function EmotionalSupportChat() {
  const [activeTab, setActiveTab] = useState('chat')
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: 'ai',
      text: "👋 Hello! I'm SafeVoice AI, your compassionate companion. I'm here to listen and support you whenever you need to talk. Remember, this is a safe, judgment-free space just for you. How are you feeling today?",
      timestamp: new Date()
    }
  ])
  const [inputValue, setInputValue] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const messagesEndRef = useRef(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSendMessage = async (e) => {
    e.preventDefault()
    
    if (!inputValue.trim()) return

    // Add user message
    const userMessage = {
      id: messages.length + 1,
      type: 'user',
      text: inputValue,
      timestamp: new Date()
    }

    setMessages(prev => [...prev, userMessage])
    setInputValue('')
    setIsLoading(true)

    // Simulate AI response (replace with actual API call)
    setTimeout(() => {
      const responses = [
        "I hear you. Thank you for sharing that with me. How long have you been feeling this way?",
        "That sounds really difficult. You're being very brave by talking about this. What do you think would help you feel better right now?",
        "I understand. These feelings are valid. Would you like to explore what's causing them?",
        "It's okay to feel overwhelmed sometimes. Remember, you're not alone. What do you need most right now?",
        "That takes courage to express. I'm here to listen without judgment. What matters most to you?",
        "Your feelings are important. Let's talk through this together. What's on your mind?"
      ]
      
      const randomResponse = responses[Math.floor(Math.random() * responses.length)]
      
      const aiMessage = {
        id: messages.length + 2,
        type: 'ai',
        text: randomResponse,
        timestamp: new Date()
      }

      setMessages(prev => [...prev, aiMessage])
      setIsLoading(false)
    }, 1000)
  }

  const quickResponses = [
    "I'm feeling overwhelmed",
    "I need to talk",
    "I'm not okay",
    "I need support",
    "Can you listen?"
  ]

  const handleQuickResponse = (response) => {
    setInputValue(response)
  }

  return (
    <div className="flex flex-col h-screen sm:h-[600px] bg-gradient-to-b from-blue-50 to-white rounded-xl overflow-hidden border border-blue-200">
      {/* Chat Header */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-4 flex items-center gap-3 shadow-md">
        <div className="text-2xl">💜</div>
        <div>
          <h3 className="font-bold text-lg">SafeVoice AI Support</h3>
          <p className="text-blue-100 text-sm">Available 24/7 • Always confidential</p>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="flex border-b border-gray-200 bg-white">
        <button
          onClick={() => setActiveTab('chat')}
          className={`flex-1 px-4 py-3 font-medium text-center transition-colors ${
            activeTab === 'chat'
              ? 'border-b-2 border-purple-600 text-purple-600'
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          💬 Chat
        </button>
        <button
          onClick={() => setActiveTab('about')}
          className={`flex-1 px-4 py-3 font-medium text-center transition-colors ${
            activeTab === 'about'
              ? 'border-b-2 border-purple-600 text-purple-600'
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          ℹ️ About
        </button>
      </div>

      {/* CHAT TAB */}
      {activeTab === 'chat' && (
        <>
          {/* Messages Container */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-xs sm:max-w-md lg:max-w-lg px-4 py-3 rounded-2xl ${
                    message.type === 'user'
                      ? 'bg-purple-600 text-white rounded-br-none'
                      : 'bg-gray-200 text-gray-800 rounded-bl-none'
                  } shadow-sm`}
                >
                  <p className="text-sm sm:text-base leading-relaxed">{message.text}</p>
                  <p className={`text-xs mt-1 ${message.type === 'user' ? 'text-purple-200' : 'text-gray-500'}`}>
                    {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </p>
                </div>
              </div>
            ))}

            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-gray-200 text-gray-800 px-4 py-3 rounded-2xl rounded-bl-none">
                  <div className="flex gap-1">
                    <div className="w-2 h-2 bg-gray-600 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-gray-600 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    <div className="w-2 h-2 bg-gray-600 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
                  </div>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Quick Responses */}
          {messages.length <= 2 && (
            <div className="px-4 sm:px-6 py-3 bg-blue-50 border-t border-blue-200">
              <p className="text-xs sm:text-sm text-gray-600 font-medium mb-2">Quick responses:</p>
              <div className="flex flex-wrap gap-2">
                {quickResponses.map((response, index) => (
                  <button
                    key={index}
                    onClick={() => handleQuickResponse(response)}
                    className="px-3 py-1.5 text-xs sm:text-sm bg-white border border-blue-300 text-blue-600 rounded-full hover:bg-blue-100 transition-colors"
                  >
                    {response}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Input Area */}
          <form onSubmit={handleSendMessage} className="border-t border-blue-200 bg-white px-4 sm:px-6 py-4">
            <div className="flex gap-2">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Share what's on your mind..."
                disabled={isLoading}
                className="flex-1 px-4 py-2 sm:py-3 border border-gray-300 rounded-full focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition disabled:bg-gray-100"
              />
              <button
                type="submit"
                disabled={isLoading || !inputValue.trim()}
                className="px-4 sm:px-6 py-2 sm:py-3 bg-purple-600 text-white rounded-full font-medium hover:bg-purple-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
              >
                <span className="hidden sm:inline">Send</span>
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5.951-1.429 5.951 1.429a1 1 0 001.169-1.409l-7-14z" />
                </svg>
              </button>
            </div>
            <p className="text-xs text-gray-500 mt-2">💭 Everything you share is completely confidential and not stored</p>
          </form>
        </>
      )}

      {/* ABOUT TAB */}
      {activeTab === 'about' && (
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4">
          {/* Welcome Message */}
          <div className="bg-gradient-to-br from-purple-50 to-blue-50 rounded-2xl p-6 border-2 border-purple-200">
            <h2 className="text-2xl font-bold text-gray-900 mb-3">👋 Welcome to SafeVoice AI</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              I'm here to provide compassionate, judgment-free emotional support whenever you need it. Whether you're feeling overwhelmed, confused, scared, or just need someone to listen, I'm available 24/7.
            </p>
            <p className="text-gray-700 leading-relaxed">
              This is your safe space. There's no pressure, no judgment, and no wrong things to say. You can share as much or as little as you'd like, and move at your own pace.
            </p>
          </div>

          {/* What I Can Help With */}
          <div className="bg-white rounded-2xl p-6 border border-gray-200">
            <h3 className="text-lg font-bold text-gray-900 mb-4">💬 How I Can Help</h3>
            <ul className="space-y-3">
              <li className="flex gap-3">
                <span className="text-xl flex-shrink-0">👂</span>
                <span className="text-gray-700"><strong>Listen:</strong> Share your feelings, experiences, or concerns</span>
              </li>
              <li className="flex gap-3">
                <span className="text-xl flex-shrink-0">💭</span>
                <span className="text-gray-700"><strong>Understand:</strong> Help you process difficult emotions</span>
              </li>
              <li className="flex gap-3">
                <span className="text-xl flex-shrink-0">🌱</span>
                <span className="text-gray-700"><strong>Support:</strong> Offer compassionate guidance and perspective</span>
              </li>
              <li className="flex gap-3">
                <span className="text-xl flex-shrink-0">🔗</span>
                <span className="text-gray-700"><strong>Connect:</strong> Point you toward resources and professional help if needed</span>
              </li>
            </ul>
          </div>

          {/* Important to Know */}
          <div className="bg-blue-50 rounded-2xl p-6 border border-blue-200">
            <h3 className="text-lg font-bold text-gray-900 mb-4">⚡ Important to Know</h3>
            <ul className="space-y-2 text-sm text-gray-700">
              <li>✓ <strong>No records kept:</strong> Your conversations aren't stored or monitored</li>
              <li>✓ <strong>Completely confidential:</strong> What you share stays between us</li>
              <li>✓ <strong>24/7 availability:</strong> I'm here whenever you need support</li>
              <li>✓ <strong>No judgment:</strong> There's nothing wrong with what you feel</li>
              <li>✓ <strong>Not a replacement:</strong> If you need professional help, I'll encourage you to reach out</li>
            </ul>
          </div>

          {/* When to Seek Professional Help */}
          <div className="bg-yellow-50 rounded-2xl p-6 border border-yellow-300">
            <h3 className="text-lg font-bold text-gray-900 mb-3">🆘 Professional Help</h3>
            <p className="text-sm text-gray-700 mb-3">
              If you're experiencing:
            </p>
            <ul className="text-sm text-gray-700 space-y-1 mb-3">
              <li>• Thoughts of self-harm or suicide</li>
              <li>• Severe trauma or abuse</li>
              <li>• Mental health crises</li>
              <li>• Persistent depression or anxiety</li>
            </ul>
            <p className="text-sm text-yellow-900 font-bold">
              Please reach out to a mental health professional or crisis line immediately. You deserve real professional support.
            </p>
          </div>

          {/* Getting Started */}
          <div className="bg-green-50 rounded-2xl p-6 border border-green-200">
            <h3 className="text-lg font-bold text-gray-900 mb-3">🚀 Getting Started</h3>
            <p className="text-gray-700 mb-4">Here are some things you might want to talk about:</p>
            <ul className="space-y-2 text-sm text-gray-700">
              <li>• How you're feeling right now</li>
              <li>• Something that's been bothering you</li>
              <li>• Your experiences and how they've affected you</li>
              <li>• What you need support with</li>
              <li>• Or anything else on your mind</li>
            </ul>
          </div>
        </div>
      )}

      {/* Information Banner */}
      <div className="bg-yellow-50 border-t border-yellow-200 px-4 sm:px-6 py-3 text-xs sm:text-sm text-yellow-800">
        <p className="font-medium">⚠️ Important:</p>
        <p>If you're in immediate danger, please contact emergency services at 911 or your local emergency number.</p>
      </div>
    </div>
  )
}
