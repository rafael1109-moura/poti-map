import { useEffect, useRef, useState } from 'react';
import DrawerLocal from './DrawerLocal';
import BarraPesquisa from './BarraPesquisa';
import './Mapa.css';

/**
 * Mapa
 * ----
 * Layout em flex-column:
 *
 *  ┌─────────────────────────────┐  ← .mapa-wrapper (100dvh, flex-column)
 *  │  Título                     │  ← .mapa-titulo  (flex-shrink: 0)
 *  ├─────────────────────────────┤
 *  │  ┌─ Barra de pesquisa ────┐ │  ← position: absolute dentro de .mapa-container
 *  │  └───────────────────────┘ │
 *  │                             │  ← .mapa-container (flex: 1, position: relative)
 *  │         [mapa Mapbox]       │
 *  │                             │
 *  │  ┌─ Drawer ───────────────┐ │  ← position: fixed, sobe do fundo
 *  │  └───────────────────────┘ │
 *  └─────────────────────────────┘
 *
 * A BarraPesquisa fica DENTRO do mapa-container para que seu
 * position: absolute se ancore ao topo do mapa, não ao título.
 */

const LOCAIS_EXEMPLO = [
  {
    id: 1,
    nome: 'Ponta Negra',
    endereco: 'Praia de Ponta Negra, Natal - RN',
    nota: 4.8,
    totalAvaliacoes: 312,
    longitude: -35.1644988,
    latitude: -5.8837056,
    avaliacoes: [
      {
        id: 101,
        nomeUsuario: 'Carlos Souza',
        nota: 5,
        comentario: 'Vista incrível ao pôr do sol. Morro do Careca imperdível!',
        data: 'jun. 2025',
        fotoUrl: null,
      },
      {
        id: 102,
        nomeUsuario: 'Mariana Lima',
        nota: 4,
        comentario: 'Ótima praia, mar agitado mas muito bonito.',
        data: 'mai. 2025',
        fotoUrl: null,
      },
    ],
  },
];

function Mapa() {
  const mapContainerRef = useRef(null);
  const mapRef = useRef(null);
  const [localSelecionado, setLocalSelecionado] = useState(null);

  /* Valida token e disponibilidade do Mapbox antes de tentar renderizar */
  const [erroMapa, setErroMapa] = useState(() => {
    if (!window.mapboxgl) {
      return 'Mapbox GL JS não foi carregado. Verifique o index.html.';
    }
    if (!import.meta.env.VITE_MAPBOX_TOKEN) {
      return 'Configure VITE_MAPBOX_TOKEN no arquivo .env para carregar o mapa.';
    }
    return '';
  });

  useEffect(() => {
    if (erroMapa) return undefined;

    window.mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_TOKEN;

    try {
      mapRef.current = new window.mapboxgl.Map({
        container: mapContainerRef.current,
        style: 'mapbox://styles/mapbox/streets-v11',
        center: [-35.1644988, -5.8837056],
        zoom: 12,
      });
    } catch (error) {
      console.error('Erro ao inicializar o Mapbox:', error);
      window.setTimeout(() => setErroMapa('Não foi possível inicializar o mapa.'), 0);
      return undefined;
    }

    /* Adiciona um marcador para cada local */
    LOCAIS_EXEMPLO.forEach((local) => {
      const el = document.createElement('div');
      el.className = 'marcador-turismo';
      el.setAttribute('aria-label', `Ver detalhes: ${local.nome}`);
      el.setAttribute('role', 'button');
      el.setAttribute('tabindex', '0');

      new window.mapboxgl.Marker({ element: el })
        .setLngLat([local.longitude, local.latitude])
        .addTo(mapRef.current);

      el.addEventListener('click', () => setLocalSelecionado(local));
      el.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          setLocalSelecionado(local);
        }
      });
    });

    /* Destrói o mapa ao desmontar o componente (evita memory leak) */
    return () => {
      mapRef.current?.remove();
      mapRef.current = null;
    };
  }, [erroMapa]);

  /**
   * handleSelecionarLocal
   * Chamado pela BarraPesquisa. Voa até o local e abre o drawer.
   * flyTo é a animação nativa do Mapbox: zoom-out → desloca → zoom-in.
   */
  function handleSelecionarLocal(local) {
    mapRef.current?.flyTo({
      center: [local.longitude, local.latitude],
      zoom: 15,
      speed: 1.4,
      curve: 1.8,
      essential: true,   /* respeita prefers-reduced-motion do sistema */
    });
    setLocalSelecionado(local);
  }

  return (
    /* Wrapper em flex-column: título fixo em cima, mapa ocupa o resto */
    <div className="mapa-wrapper">

      {/* Título fora do mapa para não interferir no posicionamento da barra */}
      <h2 className="mapa-titulo">Descubra sua próxima aventura</h2>

      {/*
       * mapa-container: position relative + flex:1
       * Todos os elementos flutuantes (barra, erro) ficam DENTRO
       * deste div para que position:absolute referencie o topo do mapa,
       * não o topo da página inteira.
       */}
      <div ref={mapContainerRef} className="mapa-container">

        {/* Barra de pesquisa flutuante ancorada ao topo do mapa */}
        {!erroMapa && (
          <BarraPesquisa onSelecionarLocal={handleSelecionarLocal} />
        )}

        {/* Mensagem de erro sobreposta ao canvas quando o mapa falha */}
        {erroMapa && (
          <div className="mapa-erro" role="alert">
            {erroMapa}
          </div>
        )}

      </div>

      {/*
       * DrawerLocal fora do mapa-container pois usa position:fixed
       * e não precisa de um pai com position:relative específico.
       */}
      <DrawerLocal
        local={localSelecionado}
        onFechar={() => setLocalSelecionado(null)}
      />

    </div>
  );
}

export default Mapa;
