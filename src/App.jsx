import React, { useState } from 'react'
import Home from './Home/Index'
import User from './User/Index'
import Register from './Register/Index'
import './index.css'

export default function App() {
  const [view, setView] = useState('home')

  return (
    <div className="app-root">
      <header className="app-switcher">
        <button type="button" onClick={() => setView('home')} aria-pressed={view === 'home'}>
          Home
        </button>
        <button type="button" onClick={() => setView('user')} aria-pressed={view === 'user'}>
          User
        </button>
        <button type="button" onClick={() => setView('register')} aria-pressed={view === 'register'}>
          Registre-se
        </button>
        <button type="button" onClick={() => setView('signin')} aria-pressed={view === 'signin'}>
          Login
        </button>
      </header>

      <main>
        {view === 'home' && <Home onNavigate={setView} />}
        {view === 'user' && <User />}
        {view === 'register' && <Register initialMode="signup" onNavigate={setView} />}
        {view === 'signin' && <Register initialMode="signin" onNavigate={setView} />}
      </main>
    </div>
  )
}
