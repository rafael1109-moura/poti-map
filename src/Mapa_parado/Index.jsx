import { useEffect, useRef } from 'react';

function Mapa() {
    const mapContainerRef = useRef(null);
    const mapRef = useRef(null);

    useEffect(() => {
        if (!window.mapboxgl) return;

        const LAT = -5.8837056;
        const LNG = -35.1644988;

        window.mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_TOKEN;

        // Salva a instância do mapa na ref
        mapRef.current = new window.mapboxgl.Map({
            container: mapContainerRef.current,
            style: 'mapbox://styles/mapbox/streets-v11',
            center: [LNG, LAT],
            zoom: 12,
        });

        // Marcador de teste
        new window.mapboxgl.Marker()
            .setLngLat([LNG, LAT])
            .addTo(mapRef.current);

        // Cleanup: destrói o mapa ao desmontar o componente
        return () => {
            mapRef.current?.remove();
        };
    }, []);

    return (
        <>
            <h2  style={{ textAlign: "center", width: "100%" }} id="map-title">Encontre suas próximas missões e explore o Rio Grande do Norte</h2>
            <div
                ref={mapContainerRef}
                style={{ width: '80%', height: '600px', alignContent: 'center', margin: '0 auto' }}
            />
        </>
    );
}

export default Mapa;
