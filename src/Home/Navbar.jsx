import React, { useEffect, useState } from 'react'

const navItems = ['Home', 'Destinos', 'Experiências', 'Contato']

function Navbar({ onNavigate }) {
  const [isVisible, setIsVisible] = useState(true)

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
        <div>
          <h2>PotiMap</h2>
          <p>Se aventure no Rio Grande do Norte</p>
        </div>
      </div>

      <nav className="navbar" aria-label="Navegação principal">
        {navItems.map((item) => (
          <a key={item} href={`#${item.toLowerCase()}`}>
            {item}
          </a>
        ))}
      </nav>

      <div className="navbar-actions">
        <button className="text-link" type="button" onClick={() => onNavigate?.('signin')}>
          Login
        </button>
        <button className="btn btn-primary" type="button" onClick={() => onNavigate?.('register')}>
          Registre-se
        </button>
      </div>
    </header>
  )
}

export default Navbar
