import { useState, useEffect } from 'react'
import coastImg from '../assets/imagem_home.jpg'
import natalImg from '../assets/img-mar-forte-reis.jpg'
import potiMapLogo from '../assets/PotiMap-logo-real.png'
import './Style.css'

// Dados simulados que, no futuro, virão do seu banco de dados via API Node.js
const mockApiData = {
  profile: {
    name: 'Mariana Costa',
    initials: 'MC',
    location: 'São Paulo, SP',
    memberSince: 'Mar 2023',
    rank: 'Ouro', // Novo: Sistema de gamificação
    xpProgress: 75, // Novo: Progresso para o próximo nível
    stats: {
      favorites: 18,
      trips: 6,
      reviews: 12,
      placesVisited: 24
    }
  },
  savedTrips: [
    {
      id: 1,
      title: 'Aventura nas Dunas',
      status: 'Em breve',
      description: 'Roteiro de 4 dias explorando lagoas, dunas e experiencias pelo litoral norte.',
      date: '12 - 16 Nov',
      image: coastImg,
      imageClass: 'trip-image--dunes',
      people: '+2',
    },
    {
      id: 2,
      title: 'Fim de Semana em Natal',
      status: 'Rascunho',
      description: 'Passeios pela Via Costeira, Forte dos Reis Magos e gastronomia perto do mar.',
      date: 'A definir',
      image: natalImg,
      imageClass: 'trip-image--natal',
      action: 'Continuar editando',
    },
  ],
  favoritePlaces: [
    {
      id: 1,
      title: 'Mergulho em Maracajau',
      type: 'Experiencia',
      rating: '4.9 (120 avaliacoes)',
      image: natalImg,
      className: 'favorite-card--wide',
    },
    {
      id: 2,
      title: 'Maior Cajueiro do Mundo',
      type: 'Atracao',
      rating: 'Parnamirim, RN',
      image: coastImg,
      className: 'favorite-card--small',
    },
  ],
  visitHistory: [
    { id: 1, place: 'Forte dos Reis Magos', city: 'Natal', meta: 'Visitado em Jun 2026' },
    { id: 2, place: 'Praia de Pipa', city: 'Tibau do Sul', meta: 'Favoritado para revisitar' },
    { id: 3, place: 'Parrachos de Maracajau', city: 'Maxaranguape', meta: 'Roteiro concluido' },
  ]
}

const menuItems = [
  ['heart', 'Favoritos'],
  ['map', 'Meus Roteiros'],
  ['clock', 'Historico'],
  ['star', 'Avaliacoes'],
  ['settings', 'Configuracoes'],
]

const accountSettings = ['Preferencias de viagem', 'Notificacoes', 'Privacidade', 'Integrações de IA']

function Icon({ name }) {
  const icons = {
    search: (
      <><circle cx="11" cy="11" r="7" /><path d="m20 20-3.5-3.5" /></>
    ),
    heart: (
      <path d="M20.8 5.8a5.4 5.4 0 0 0-7.7 0L12 6.9l-1.1-1.1a5.4 5.4 0 1 0-7.7 7.7L12 22l8.8-8.5a5.4 5.4 0 0 0 0-7.7Z" />
    ),
    map: (
      <><path d="m3 6 6-3 6 3 6-3v15l-6 3-6-3-6 3V6Z" /><path d="M9 3v15" /><path d="M15 6v15" /></>
    ),
    clock: (
      <><path d="M3 12a9 9 0 1 0 3-6.7" /><path d="M3 4v5h5" /><path d="M12 7v5l3 2" /></>
    ),
    star: (
      <path d="m12 3 2.7 5.5 6.1.9-4.4 4.3 1 6.1L12 17l-5.4 2.8 1-6.1-4.4-4.3 6.1-.9L12 3Z" />
    ),
    settings: (
      <><path d="M12 15.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7Z" /><path d="M19.4 15a1.8 1.8 0 0 0 .4 2l.1.1a2.1 2.1 0 0 1-3 3l-.1-.1a1.8 1.8 0 0 0-2-.4 1.8 1.8 0 0 0-1.1 1.7V22a2.1 2.1 0 0 1-4.2 0v-.2a1.8 1.8 0 0 0-1.2-1.7 1.8 1.8 0 0 0-2 .4l-.1.1a2.1 2.1 0 0 1-3-3l.1-.1a1.8 1.8 0 0 0 .4-2 1.8 1.8 0 0 0-1.7-1.1H2a2.1 2.1 0 0 1 0-4.2h.2a1.8 1.8 0 0 0 1.7-1.2 1.8 1.8 0 0 0-.4-2l-.1-.1a2.1 2.1 0 0 1 3-3l.1.1a1.8 1.8 0 0 0 2 .4 1.8 1.8 0 0 0 1.1-1.7V2a2.1 2.1 0 0 1 4.2 0v.2a1.8 1.8 0 0 0 1.2 1.7 1.8 1.8 0 0 0 2-.4l.1-.1a2.1 2.1 0 0 1 3 3l-.1.1a1.8 1.8 0 0 0-.4 2 1.8 1.8 0 0 0 1.7 1.1h.2a2.1 2.1 0 0 1 0 4.2h-.2a1.8 1.8 0 0 0-1.9 1.2Z" /></>
    ),
    share: (
      <><circle cx="18" cy="5" r="3" /><circle cx="6" cy="12" r="3" /><circle cx="18" cy="19" r="3" /><path d="m8.6 10.5 6.8-4" /><path d="m8.6 13.5 6.8 4" /></>
    ),
    edit: (
      <><path d="M12 20h9" /><path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4 12.5-12.5Z" /></>
    ),
    pin: (
      <><path d="M20 10c0 5-8 11-8 11S4 15 4 10a8 8 0 1 1 16 0Z" /><circle cx="12" cy="10" r="3" /></>
    ),
    calendar: (
      <><rect x="3" y="5" width="18" height="16" rx="2" /><path d="M16 3v4" /><path d="M8 3v4" /><path d="M3 11h18" /></>
    ),
    arrow: <path d="M5 12h14m-6-6 6 6-6 6" />,
    sparkles: ( // Ícone para a dica inteligente
      <><path d="m12 3-1.9 5.8a2 2 0 0 1-1.3 1.3L3 12l5.8 1.9a2 2 0 0 1 1.3 1.3l1.9 5.8 1.9-5.8a2 2 0 0 1 1.3-1.3l5.8-1.9-5.8-1.9a2 2 0 0 1-1.3-1.3Z"/><path d="M19 3v4"/><path d="M21 5h-4"/></>
    )
  }

  return (
    <svg className="user-icon" viewBox="0 0 24 24" aria-hidden="true">
      {icons[name]}
    </svg>
  )
}

function User() {
  const [userData, setUserData] = useState(null)
  const [isLoading, setIsLoading] = useState(true)

  // Simula a busca dos dados no Express
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        // Futuro fetch: const res = await fetch('/api/user/me')
        // const data = await res.json()
        await new Promise(resolve => setTimeout(resolve, 1200)) // Simula delay de rede
        setUserData(mockApiData)
      } catch (error) {
        console.error("Erro ao buscar dados do usuário", error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchUserData()
  }, [])

  if (isLoading) {
    return (
      <main className="user-page loading-state">
        <div className="loader">Carregando seu painel inteligente...</div>
      </main>
    )
  }

  return (
    <main className="user-page">
      <header className="user-topbar">
        <div className="user-brand-block">
          <a className="user-brand" href="/">
            <img src={potiMapLogo} alt="" aria-hidden="true" />
            <span>PotiMap</span>
          </a>
          <p>Se aventure no Rio Grande do Norte</p>
        </div>

        <label className="user-search">
          <Icon name="search" />
          <input type="search" placeholder="Buscar destinos..." />
        </label>

        <nav className="user-nav" aria-label="Navegacao principal">
          <a href="/">Destinos</a>
          <a href="/">Experiencias</a>
          <a href="/">Hospedagens</a>
          <a href="/">Aventuras</a>
        </nav>

        <div className="user-actions">
          <a href="/">Sair</a>
          <a className="join-button" href="/">Novo roteiro</a>
        </div>
      </header>

      <div className="user-shell">
        <aside className="dashboard-menu" aria-label="Menu do painel">
          <div className="dashboard-menu__title">
            <h2>Meu Painel</h2>
            <p>Gerencie suas viagens</p>
          </div>

          <div className="dashboard-menu__links">
            {menuItems.map(([icon, label]) => (
              <a className={label === 'Meus Roteiros' ? 'active' : ''} href="/" key={label}>
                <Icon name={icon} />
                <span className="truncate">{label}</span>
              </a>
            ))}
          </div>
        </aside>

        <section className="dashboard-content">
          <article className="profile-card">
            <div className="avatar-wrap">
              <div className="avatar" aria-hidden="true">
                {userData.profile.initials}
              </div>
              <button className="avatar-edit" type="button" aria-label="Editar foto">
                <Icon name="edit" />
              </button>
            </div>

            <div className="profile-info">
              <h1>{userData.profile.name}</h1>
              <p>
                <Icon name="pin" />
                {userData.profile.location}
              </p>

              {/* Novo: Sistema de Gamificação (Rank) */}
              <div className="profile-gamification">
                <div className="rank-badge">
                  <Icon name="star" /> Explorador {userData.profile.rank}
                </div>
                <div className="xp-bar-container" title={`${userData.profile.xpProgress}% para o próximo nível`}>
                  <div className="xp-bar-fill" style={{ width: `${userData.profile.xpProgress}%` }}></div>
                </div>
              </div>

              <div className="profile-stats">
                <div>
                  <span>Membro desde</span>
                  <strong>{userData.profile.memberSince}</strong>
                </div>
                <div>
                  <span>Destinos Visitados</span>
                  <strong>{userData.profile.stats.placesVisited} Cidades</strong>
                </div>
                <div>
                  <span>Roteiros Concluidos</span>
                  <strong>{userData.profile.stats.trips} Viagens</strong>
                </div>
              </div>
            </div>

            <button className="share-button" type="button">
              <Icon name="share" />
              Compartilhar Perfil
            </button>
          </article>

          {/* Novo: Dica Inteligente Baseada nos Dados */}
          <div className="smart-tip-card">
            <div className="smart-tip-icon">
              <Icon name="sparkles" />
            </div>
            <div className="smart-tip-content">
              <strong>Dica Inteligente para o seu roteiro "Aventura nas Dunas"</strong>
              <p>A maré em Maracajaú atingirá o ponto ideal (0.2m) amanhã às 09:30. Sugerimos agendar os passeios de barco pela manhã!</p>
            </div>
          </div>

          <section className="stats-grid" aria-label="Resumo do perfil">
             <article className="stat-card">
                <strong>{userData.profile.stats.favorites}</strong>
                <span>Favoritos</span>
              </article>
              <article className="stat-card">
                <strong>{userData.profile.stats.trips}</strong>
                <span>Roteiros</span>
              </article>
              <article className="stat-card">
                <strong>{userData.profile.stats.reviews}</strong>
                <span>Avaliações</span>
              </article>
              <article className="stat-card">
                <strong>{userData.profile.stats.placesVisited}</strong>
                <span>Pontos visitados</span>
              </article>
          </section>

          <section className="content-section">
            <div className="section-heading">
              <div>
                <h2>Meus Roteiros Salvos</h2>
                <p>Planejamentos em andamento e viagens futuras.</p>
              </div>
              <a href="/">Ver todos <Icon name="arrow" /></a>
            </div>

            <div className="trip-grid">
              {userData.savedTrips.map((trip) => (
                <article className="trip-card" key={trip.id}>
                  <div className={`trip-image ${trip.imageClass}`}>
                    <img src={trip.image} alt="" />
                    <span className="status-pill">{trip.status}</span>
                    <button type="button" aria-label={`Favoritar ${trip.title}`}>
                      <Icon name="heart" />
                    </button>
                  </div>
                  <div className="trip-body">
                    <h3>{trip.title}</h3>
                    <p>{trip.description}</p>
                    <div className="trip-meta">
                      <span><Icon name="calendar" />{trip.date}</span>
                      {trip.people ? (
                        <span className="people-badge">{trip.people}</span>
                      ) : (
                        <a href="/">{trip.action}</a>
                      )}
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </section>

          <section className="content-section favorites-section">
            <div className="section-heading">
              <div>
                <h2>Locais Favoritos</h2>
                <p>Inspiracoes salvas para suas proximas aventuras.</p>
              </div>
            </div>

            <div className="favorites-grid">
              {userData.favoritePlaces.map((place) => (
                <article className={`favorite-card ${place.className}`} key={place.id}>
                  <img src={place.image} alt="" />
                  <div className="favorite-overlay" />
                  <button type="button" aria-label={`Remover ${place.title} dos favoritos`}>
                    <Icon name="heart" />
                  </button>
                  <div className="favorite-info">
                    <span>{place.type}</span>
                    <h3>{place.title}</h3>
                    <p>{place.rating}</p>
                  </div>
                </article>
              ))}
            </div>
          </section>

          <section className="content-section profile-side-section">
            <div className="section-heading">
              <div>
                <h2>Historico de Visitas</h2>
                <p>Ultimas atividades no seu mapa.</p>
              </div>
            </div>

            <div className="history-list">
              {userData.visitHistory.map((item) => (
                <article className="history-card" key={item.id}>
                  <span><Icon name="pin" /></span>
                  <div>
                    <h3>{item.place}</h3>
                    <p>{item.city} • {item.meta}</p>
                  </div>
                </article>
              ))}
            </div>
          </section>

          <section className="content-section profile-side-section">
            <div className="section-heading">
              <div>
                <h2>Configuracoes</h2>
                <p>Controle sua experiencia.</p>
              </div>
            </div>

            <div className="settings-list">
              {accountSettings.map((item) => (
                <button type="button" key={item} title={item}>
                  <span className="settings-text">{item}</span>
                  <Icon name="arrow" />
                </button>
              ))}
            </div>
          </section>
        </section>
      </div>

      <footer className="user-footer">
        <div>
          <a className="user-brand user-brand--footer" href="/">
            <img src={potiMapLogo} alt="" aria-hidden="true" />
            <span>PotiMap</span>
          </a>
          <p>© 2026 Rio Grande do Norte Tourism. Criado para viajantes.</p>
        </div>
        <a href="/">Explore RN</a>
        <a href="/">Dicas de seguranca</a>
        <a href="/">Sustentabilidade</a>
        <a href="/">Privacidade</a>
        <a href="/">Central de ajuda</a>
      </footer>
    </main>
  )
}

export default User
