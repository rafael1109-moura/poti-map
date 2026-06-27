import potiMapLogo from '../assets/PotiMap-logo-real.png'
import './Footer.css'

function Footer({ onNavigate }) {
  return (
    <footer id="contato" className="site-footer">
      <button
        className="footer-brand"
        type="button"
        onClick={() => onNavigate?.('home', 'home')}
        aria-label="Voltar para a hero da pagina inicial"
      >
        <img src={potiMapLogo} alt="" aria-hidden="true" />
        <div>
          <strong>Tatour</strong>
          <p>Explore o Rio Grande do Norte com mapas, roteiros e favoritos em um so lugar.</p>
        </div>
      </button>

      <p className="footer-copy">(c) 2026 Tatour. Turismo potiguar feito com carinho.</p>
    </footer>
  )
}

export default Footer
