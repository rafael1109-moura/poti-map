import heroImg from '../assets/imagem_home.jpg'

function Hero() {
  return (
    <section className="hero-section" id="home">
      <div className="hero-overlay">
        <div className="hero-copy">
          <span className="eyebrow">Turismo de alto impacto</span>
          <h1 id="hero-title">Viva o melhor do Rio Grande do Norte com experiências únicas</h1>
          <p id="hero-description">
            Explore praias paradisíacas, trilhas inesquecíveis e cultura local em uma viagem que combina descanso, aventura e autenticidade.
          </p>

          <div className="hero-actions">
            <a className="btn btn-primary" href="#destinos">
              Explorar destinos
            </a>
            <a className="btn btn-secondary" href="#contato">
              Fale conosco
            </a>
          </div>
        </div>
      </div>

      <div className="hero-media">
        <img src={heroImg} alt="Paisagem turística do Rio Grande do Norte" />
      </div>
    </section>
  )
}

export default Hero
