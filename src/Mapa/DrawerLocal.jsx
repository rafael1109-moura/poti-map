import AvaliacaoForm from './AvaliacaoForm';
import ListaAvaliacoes from './ListaAvaliacoes';
import './DrawerLocal.css';

/**
 * DrawerLocal
 * -----------
 * Painel inferior que desliza por cima do mapa ao clicar em um marcador.
 * Comportamento idêntico ao Google Maps mobile:
 *   - Fechado: mostra só o cabeçalho com nome e nota do local
 *   - Aberto:  exibe formulário de avaliação + lista de avaliações
 *
 * Props:
 *   local    {object|null}  Dados do local selecionado. null = drawer fechado.
 *                           Formato esperado:
 *                           { id, nome, endereco, nota, totalAvaliacoes, avaliacoes[] }
 *   onFechar {function}     Callback chamado quando o usuário fecha o drawer.
 */
function DrawerLocal({ local, onFechar }) {

  /* Se não há local selecionado, não renderiza nada */
  if (!local) return null;

  return (
    /*
     * Overlay escurecido atrás do drawer.
     * Clicar nele fecha o painel (igual ao comportamento do Google Maps).
     */
    <div className="drawer-overlay" onClick={onFechar}>

      {/*
       * Painel principal do drawer.
       * stopPropagation impede que cliques dentro do drawer
       * disparem o fechamento do overlay.
       */}
      <div
        className="drawer-painel"
        onClick={(e) => e.stopPropagation()}
      >

        {/* ── Alça visual ─────────────────────────────────────────────
            Barra cinza no topo que indica que o painel é arrastável.
            Por ora é apenas decorativa; a interação de arrastar
            pode ser adicionada futuramente com bibliotecas como
            react-spring ou framer-motion.
        ────────────────────────────────────────────────────────────── */}
        <div className="drawer-alca-wrapper">
          <span className="drawer-alca" />
        </div>

        {/* ── Cabeçalho do local ───────────────────────────────────────
            Sempre visível. Mostra nome, endereço, nota e botão fechar.
        ────────────────────────────────────────────────────────────── */}
        <div className="drawer-cabecalho">
          <div className="drawer-cabecalho-info">
            <h2 className="drawer-nome">{local.nome}</h2>
            <p className="drawer-endereco">{local.endereco}</p>

            {/* Nota média com ícone de estrela */}
            <div className="drawer-nota">
              <span className="drawer-estrela-icone">★</span>
              <span className="drawer-nota-valor">{local.nota}</span>
              <span className="drawer-nota-total">
                ({local.totalAvaliacoes} avaliações)
              </span>
            </div>
          </div>

          {/* Botão X para fechar o drawer */}
          <button
            className="drawer-btn-fechar"
            onClick={onFechar}
            aria-label="Fechar painel"
          >
            ✕
          </button>
        </div>

        {/* ── Corpo com scroll ────────────────────────────────────────
            Área rolável que contém o formulário e as avaliações.
            O overflow-y: auto permite rolar sem mover o mapa.
        ────────────────────────────────────────────────────────────── */}
        <div className="drawer-corpo">

          {/* Formulário de avaliação (estrelas + comentário + foto) */}
          <AvaliacaoForm localId={local.id} />

          {/* Divisor visual entre formulário e lista */}
          <hr className="drawer-divisor" />

          {/* Lista de avaliações de outros usuários */}
          <ListaAvaliacoes avaliacoes={local.avaliacoes} />

        </div>
      </div>
    </div>
  );
}

export default DrawerLocal;
