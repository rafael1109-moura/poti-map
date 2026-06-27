import potiMapLogo from '../assets/PotiMap-logo-real.png'
import './Footer.css'

function Footer({ onNavigate }) {
  return (
    <footer id="contato" className="site-footer">
      <div className="footer-brand">
        <img src={potiMapLogo} alt="" aria-hidden="true" />
        <div>
          <strong>Tatour</strong>
          <p>Explore o Rio Grande do Norte com mapas, roteiros e favoritos em um so lugar.</p>
        </div>
      </div>

      <nav className="footer-links" aria-label="Links do rodape">
        <button type="button" onClick={() => onNavigate?.('home', 'mapa')}>
          Mapa
        </button>
      </nav>

      <p className="footer-copy">(c) 2026 Tatour. Turismo potiguar feito com carinho.</p>
    </footer>
  )
}

export default Footer
