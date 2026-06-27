import './Style.css'
import Navbar from './Navbar'
import Hero from './Hero'
import Mapa from '../Mapa/Mapa'
import Footer from '../components/Footer'

function Index({ onNavigate }) {
  return (
    <div className="home-page">
      <Navbar onNavigate={onNavigate} />
      <Hero onNavigate={onNavigate} />
      <section id="mapa" className="mapa-section">
        <Mapa />
      </section>
      <Footer onNavigate={onNavigate} />
    </div>
  )
}

export default Index
