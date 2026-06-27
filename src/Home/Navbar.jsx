import { useEffect, useState } from 'react'
import potiMapLogo from '../assets/PotiMap-logo-real.png'
import './Style.css'

function Navbar({ onNavigate, contactView = 'home' }) {
  const [isVisible, setIsVisible] = useState(true)
  const navItems = [
    { label: 'Mapa', view: 'home', targetId: 'mapa' },
    { label: 'Perfil', view: 'user' },
    { label: 'Contato', view: contactView, targetId: 'contato' },
  ]

  useEffect(() => {
    let lastScrollY = window.scrollY

    const handleScroll = () => {
      const currentScrollY = window.scrollY
      const shouldShow = currentScrollY < lastScrollY || currentScrollY < 80

      setIsVisible(shouldShow)
      lastScrollY = currentScrollY
    }

    window.addEventListener('scroll', handleScroll, { passive: true })

    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <header className={`site-header ${isVisible ? 'visible' : 'hidden'}`}>
      <div className="brand-block">
        <img className="brand-logo" src={potiMapLogo} alt="" aria-hidden="true" />
        <div>
          <h2>PotiMap</h2>
          <p>Se aventure no Rio Grande do Norte</p>
        </div>
      </div>

      <nav className="navbar" aria-label="Navegação principal">
        {navItems.map((item) => (
          <button
            key={item.label}
            className="nav-button"
            type="button"
            onClick={() => onNavigate?.(item.view, item.targetId)}
          >
            {item.label}
          </button>
        ))}
      </nav>

      <div className="navbar-login">
        <button
          className="nav-button login-button"
          type="button"
          onClick={() => onNavigate?.('signin')}
        >
          Login
        </button>
      </div>
    </header>
  )
}

export default Navbar
