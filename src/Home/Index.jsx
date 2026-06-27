import './Style.css'
import Navbar from './Navbar'
import Hero from './Hero'
import Mapa from '../Mapa/Mapa'

function Index({ onNavigate }) {
  return (
    <div className="home-page">
      <Navbar onNavigate={onNavigate} />
      <Hero onNavigate={onNavigate} />
      <Mapa />
    </div>
  )
}

export default Index
