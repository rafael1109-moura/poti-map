import React, { useState, useEffect, useRef } from 'react';
import './BarraPesquisa.css';

/**
 * BarraPesquisa
 * -------------
 * Barra de pesquisa flutuante no topo do mapa.
 * Busca locais no back-end conforme o usuário digita (debounce de 400ms)
 * e exibe uma lista de sugestões logo abaixo.
 *
 * Props:
 *   onSelecionarLocal {function}  Callback chamado quando o usuário
 *                                 clica num resultado. Recebe o objeto
 *                                 completo do local como argumento.
 *                                 O Mapa.jsx usa isso para voar até
 *                                 o local e abrir o drawer.
 */
function BarraPesquisa({ onSelecionarLocal }) {

  /* Texto digitado pelo usuário no campo de busca */
  const [texto, setTexto] = useState('');

  /* Lista de resultados retornada pelo back-end */
  const [resultados, setResultados] = useState([]);

  /* Controla se o dropdown de sugestões está visível */
  const [mostrarSugestoes, setMostrarSugestoes] = useState(false);

  /* Indica que uma requisição está em andamento (para o spinner) */
  const [carregando, setCarregando] = useState(false);

  /* Guarda o ID do timeout do debounce para poder cancelá-lo */
  const debounceRef = useRef(null);

  /* Referência ao container inteiro para detectar clique fora */
  const containerRef = useRef(null);

  /* ── Fechar sugestões ao clicar fora da barra ─────────────────
     Se o clique foi fora do container, esconde o dropdown.
  ─────────────────────────────────────────────────────────── */
  useEffect(() => {
    function handleClickFora(e) {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setMostrarSugestoes(false);
      }
    }
    document.addEventListener('mousedown', handleClickFora);
    return () => document.removeEventListener('mousedown', handleClickFora);
  }, []);

  /* ── Debounce da busca ────────────────────────────────────────
     Espera 400ms após o usuário parar de digitar antes de
     chamar a API. Evita uma requisição a cada tecla pressionada.
  ─────────────────────────────────────────────────────────── */
  useEffect(() => {
    /* Limpa a busca se o campo estiver vazio */
    if (texto.trim().length < 2) {
      setResultados([]);
      setMostrarSugestoes(false);
      return;
    }

    /* Cancela o timeout anterior antes de criar um novo */
    clearTimeout(debounceRef.current);

    debounceRef.current = setTimeout(() => {
      buscarLocais(texto.trim());
    }, 400);

    /* Cleanup: cancela o timeout se o componente for desmontado */
    return () => clearTimeout(debounceRef.current);
  }, [texto]);

  /**
   * buscarLocais
   * ------------
   * Faz a requisição ao back-end com o termo pesquisado.
   *
   * TODO: ajuste a URL abaixo para o endpoint real da sua API.
   * Exemplo de resposta esperada (array de locais):
   * [
   *   {
   *     id: 1,
   *     nome: "Ponta Negra",
   *     endereco: "Natal - RN",
   *     nota: 4.8,
   *     totalAvaliacoes: 312,
   *     latitude: -5.8837056,
   *     longitude: -35.1644988,
   *     avaliacoes: []
   *   }
   * ]
   */
  async function buscarLocais(termo) {
    setCarregando(true);
    try {
      /* TODO: substitua pela URL real do seu back-end */
      const resposta = await fetch(
        `/api/locais?busca=${encodeURIComponent(termo)}`
      );

      if (!resposta.ok) throw new Error('Erro na busca');

      const dados = await resposta.json();
      setResultados(dados);
      setMostrarSugestoes(true);

    } catch (erro) {
      console.error('Erro ao buscar locais:', erro);
      setResultados([]);
    } finally {
      setCarregando(false);
    }
  }

  /**
   * handleSelecionarResultado
   * -------------------------
   * Chamado quando o usuário clica em um item da lista.
   * Preenche o campo com o nome do local, fecha o dropdown
   * e avisa o Mapa.jsx via callback para voar + abrir drawer.
   */
  function handleSelecionarResultado(local) {
    setTexto(local.nome);
    setMostrarSugestoes(false);
    setResultados([]);
    onSelecionarLocal(local);
  }

  /**
   * handleLimpar
   * ------------
   * Botão X: limpa o campo e reseta o estado.
   */
  function handleLimpar() {
    setTexto('');
    setResultados([]);
    setMostrarSugestoes(false);
  }

  return (
    /* Container posicionado no topo do mapa via CSS */
    <div className="barra-pesquisa-container" ref={containerRef}>

      {/* ── Campo de busca ──────────────────────────────────────── */}
      <div className="barra-pesquisa-input-wrapper">

        {/* Ícone de lupa (SVG inline, sem dependência externa) */}
        <svg
          className="barra-pesquisa-icone-lupa"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <circle cx="11" cy="11" r="7" />
          <line x1="16.5" y1="16.5" x2="22" y2="22" />
        </svg>

        <input
          className="barra-pesquisa-input"
          type="search"
          placeholder="Pesquisar pontos turísticos..."
          value={texto}
          onChange={(e) => setTexto(e.target.value)}
          /* Ao focar, mostra sugestões se já houver resultados */
          onFocus={() => resultados.length > 0 && setMostrarSugestoes(true)}
          aria-label="Pesquisar locais"
          aria-autocomplete="list"
          aria-expanded={mostrarSugestoes}
          autoComplete="off"
        />

        {/* Spinner de carregamento (visível só durante a requisição) */}
        {carregando && (
          <span className="barra-pesquisa-spinner" aria-label="Buscando..." />
        )}

        {/* Botão X para limpar (visível só quando há texto) */}
        {texto && !carregando && (
          <button
            className="barra-pesquisa-btn-limpar"
            onClick={handleLimpar}
            aria-label="Limpar pesquisa"
          >
            ✕
          </button>
        )}
      </div>

      {/* ── Dropdown de sugestões ───────────────────────────────────
          Aparece abaixo do campo quando há resultados.
          Cada item mostra nome e endereço do local.
      ─────────────────────────────────────────────────────────── */}
      {mostrarSugestoes && (
        <ul className="barra-pesquisa-sugestoes" role="listbox">

          {resultados.length === 0 && !carregando ? (
            /* Mensagem quando a busca não retornou nada */
            <li className="barra-pesquisa-sem-resultado">
              Nenhum local encontrado para "{texto}"
            </li>
          ) : (
            resultados.map((local) => (
              <li
                key={local.id}
                className="barra-pesquisa-item"
                onClick={() => handleSelecionarResultado(local)}
                role="option"
                tabIndex={0}
                /* Acessibilidade: seleciona com teclado também */
                onKeyDown={(e) => {
                  if (e.key === 'Enter') handleSelecionarResultado(local);
                }}
              >
                {/* Ícone de localização */}
                <svg
                  className="barra-pesquisa-icone-pin"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75
                           7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38
                           0-2.5-1.12-2.5-2.5S10.62 6.5 12
                           6.5s2.5 1.12 2.5 2.5S13.38 11.5 12 11.5z"/>
                </svg>

                <div className="barra-pesquisa-item-texto">
                  <span className="barra-pesquisa-item-nome">{local.nome}</span>
                  <span className="barra-pesquisa-item-endereco">
                    {local.endereco}
                  </span>
                </div>

                {/* Nota do local à direita */}
                {local.nota && (
                  <span className="barra-pesquisa-item-nota">
                    ★ {local.nota}
                  </span>
                )}
              </li>
            ))
          )}
        </ul>
      )}
    </div>
  );
}

export default BarraPesquisa;
