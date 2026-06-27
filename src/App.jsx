import { useEffect, useState } from 'react'
import Home from './Home/Index'
import User from './User/Index'
import Register from './Register/Index'
import './index.css'

export default function App() {
  const [view, setView] = useState('home')
  const [scrollTarget, setScrollTarget] = useState('')

  const handleNavigate = (nextView, targetId = '') => {
    setView(nextView)
    setScrollTarget(targetId)
  }

  useEffect(() => {
    if (!scrollTarget) {
      return
    }

    const scrollToTarget = () => {
      document.getElementById(scrollTarget)?.scrollIntoView({ behavior: 'smooth' })
      setScrollTarget('')
    }

    const timeoutId = window.setTimeout(scrollToTarget, 80)

    return () => window.clearTimeout(timeoutId)
  }, [view, scrollTarget])

  return (
    <div className="app-root">
      <header className="app-switcher">
        <button type="button" onClick={() => handleNavigate('home')} aria-pressed={view === 'home'}>
          Home
        </button>
        <button type="button" onClick={() => handleNavigate('user')} aria-pressed={view === 'user'}>
          User
        </button>
        <button type="button" onClick={() => handleNavigate('register')} aria-pressed={view === 'register'}>
          Registre-se
        </button>
        <button type="button" onClick={() => handleNavigate('signin')} aria-pressed={view === 'signin'}>
          Login
        </button>
      </header>

      <main>
        {view === 'home' && <Home onNavigate={handleNavigate} />}
        {view === 'user' && <User onNavigate={handleNavigate} />}
        {view === 'register' && <Register initialMode="signup" onNavigate={handleNavigate} />}
        {view === 'signin' && <Register initialMode="signin" onNavigate={handleNavigate} />}
      </main>
    </div>
  )
}
