import './ListaAvaliacoes.css';

/**
 * ListaAvaliacoes
 * ---------------
 * Exibe as avaliações de outros usuários para o local selecionado.
 *
 * Props:
 *   avaliacoes {Array}  Lista de avaliações recebida do back-end.
 *                       Formato esperado de cada item:
 *                       {
 *                         id:          string | number,
 *                         nomeUsuario: string,
 *                         nota:        number (1-5),
 *                         comentario:  string,
 *                         data:        string (ISO ou formatada),
 *                         fotoUrl:     string | null  (URL da foto do usuário)
 *                       }
 */
function ListaAvaliacoes({ avaliacoes }) {

  /* Se não houver avaliações, exibe mensagem encorajadora */
  if (!avaliacoes || avaliacoes.length === 0) {
    return (
      <div className="lista-vazia">
        <p className="lista-vazia-texto">
          Seja o primeiro a avaliar este local! 🌴
        </p>
      </div>
    );
  }

  return (
    <section className="lista-avaliacoes">

      {/* Título da seção */}
      <h3 className="lista-titulo">
        O que outros dizem ({avaliacoes.length})
      </h3>

      {/* Lista de cards de avaliação */}
      <ul className="lista-itens">
        {avaliacoes.map((avaliacao) => (
          <li key={avaliacao.id} className="avaliacao-card">

            {/* ── Linha do topo: avatar + nome + data ───────────────── */}
            <div className="avaliacao-card-topo">

              {/*
               * Avatar do usuário.
               * Se houver fotoUrl, exibe a imagem; caso contrário,
               * mostra as iniciais do nome sobre fundo azul-mar.
               */}
              <div className="avaliacao-avatar">
                {avaliacao.fotoUrl ? (
                  <img
                    src={avaliacao.fotoUrl}
                    alt={`Foto de ${avaliacao.nomeUsuario}`}
                    className="avaliacao-avatar-img"
                  />
                ) : (
                  <span className="avaliacao-avatar-iniciais">
                    {/* Pega as iniciais: "João Silva" → "JS" */}
                    {avaliacao.nomeUsuario
                      .split(' ')
                      .slice(0, 2)
                      .map((n) => n[0])
                      .join('')
                      .toUpperCase()}
                  </span>
                )}
              </div>

              {/* Nome do usuário e data da avaliação */}
              <div className="avaliacao-card-info">
                <span className="avaliacao-usuario">{avaliacao.nomeUsuario}</span>
                <span className="avaliacao-data">{avaliacao.data}</span>
              </div>
            </div>

            {/* ── Estrelas da nota ──────────────────────────────────── */}
            <div className="avaliacao-estrelas-leitura" aria-label={`Nota: ${avaliacao.nota} de 5`}>
              {[1, 2, 3, 4, 5].map((pos) => (
                <span
                  key={pos}
                  className={pos <= avaliacao.nota
                    ? 'estrela-leitura--ativa'
                    : 'estrela-leitura--inativa'}
                  aria-hidden="true"
                >
                  ★
                </span>
              ))}
            </div>

            {/* ── Comentário do usuário ─────────────────────────────── */}
            {avaliacao.comentario && (
              <p className="avaliacao-card-comentario">
                {avaliacao.comentario}
              </p>
            )}

          </li>
        ))}
      </ul>

    </section>
  );
}

export default ListaAvaliacoes;
