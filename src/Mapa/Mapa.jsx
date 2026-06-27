import { useEffect, useRef, useState } from 'react';
import DrawerLocal from './DrawerLocal';
import './Mapa.css';

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
        comentario: 'Vista incrivel ao por do sol. Morro do Careca imperdivel!',
        data: 'jun. 2025',
        fotoUrl: null,
      },
      {
        id: 102,
        nomeUsuario: 'Mariana Lima',
        nota: 4,
        comentario: 'Otima praia, mar agitado mas muito bonito.',
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
  const [erroMapa, setErroMapa] = useState(() => {
    if (!window.mapboxgl) {
      return 'Mapbox GL JS nao foi carregado. Verifique sua conexao e o index.html.';
    }

    if (!import.meta.env.VITE_MAPBOX_TOKEN) {
      return 'Configure VITE_MAPBOX_TOKEN no arquivo .env para carregar o mapa.';
    }

    return '';
  });

  useEffect(() => {
    if (erroMapa) {
      return undefined;
    }

    const tokenMapbox = import.meta.env.VITE_MAPBOX_TOKEN;
    window.mapboxgl.accessToken = tokenMapbox;

    try {
      mapRef.current = new window.mapboxgl.Map({
        container: mapContainerRef.current,
        style: 'mapbox://styles/mapbox/streets-v11',
        center: [-35.1644988, -5.8837056],
        zoom: 12,
      });
    } catch (error) {
      console.error('Erro ao inicializar o Mapbox:', error);
      window.setTimeout(() => {
        setErroMapa('Nao foi possivel inicializar o mapa.');
      }, 0);
      return undefined;
    }

    LOCAIS_EXEMPLO.forEach((local) => {
      const elementoMarcador = document.createElement('div');
      elementoMarcador.className = 'marcador-turismo';
      elementoMarcador.setAttribute('aria-label', `Ver detalhes: ${local.nome}`);
      elementoMarcador.setAttribute('role', 'button');
      elementoMarcador.setAttribute('tabindex', '0');

      new window.mapboxgl.Marker({ element: elementoMarcador })
        .setLngLat([local.longitude, local.latitude])
        .addTo(mapRef.current);

      elementoMarcador.addEventListener('click', () => {
        setLocalSelecionado(local);
      });

      elementoMarcador.addEventListener('keydown', (event) => {
        if (event.key === 'Enter' || event.key === ' ') {
          event.preventDefault();
          setLocalSelecionado(local);
        }
      });
    });

    return () => {
      mapRef.current?.remove();
      mapRef.current = null;
    };
  }, [erroMapa]);

  return (
    <div className="mapa-wrapper">
      <div ref={mapContainerRef} className="mapa-container" />

      {erroMapa && (
        <div className="mapa-erro" role="alert">
          {erroMapa}
        </div>
      )}

      <DrawerLocal
        local={localSelecionado}
        onFechar={() => setLocalSelecionado(null)}
      />
    </div>
  );
}

export default Mapa;
