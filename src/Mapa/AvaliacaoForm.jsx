import { useState } from 'react';
import './AvaliacaoForm.css';

/**
 * AvaliacaoForm
 * -------------
 * Formulário de avaliação de um ponto turístico.
 * Contém:
 *   1. Seletor de estrelas (1 a 5)
 *   2. Campo de comentário (textarea)
 *   3. Botão de adicionar foto (sem funcionalidade no momento)
 *   4. Botão de envio (sem funcionalidade no momento)
 *
 * Props:
 *   localId {string|number}  ID do local a ser avaliado.
 *                            Será usado futuramente na chamada ao back-end.
 */
function AvaliacaoForm({ localId }) {

  /* Nota selecionada pelo usuário (0 = nenhuma estrela marcada ainda) */
  const [notaSelecionada, setNotaSelecionada] = useState(0);

  /* Nota que o mouse está passando por cima (para o efeito hover) */
  const [notaHover, setNotaHover] = useState(0);

  /* Texto do comentário digitado pelo usuário */
  const [comentario, setComentario] = useState('');

  /**
   * handleEnviar
   * ------------
   * TODO: aqui vai a chamada ao back-end quando estiver pronto.
   * Por ora apenas loga os dados no console.
   *
   * Exemplo de payload que será enviado:
   *   { localId, nota: notaSelecionada, comentario }
   */
  function handleEnviar() {
    if (notaSelecionada === 0) {
      alert('Selecione pelo menos uma estrela antes de enviar.');
      return;
    }
    console.log('Avaliação a enviar:', {
      localId,
      nota: notaSelecionada,
      comentario,
    });
    /* TODO: substituir pelo fetch/axios para a API */
  }

  return (
    <section className="avaliacao-form">

      {/* Título da seção */}
      <h3 className="avaliacao-titulo">Avaliar este local</h3>

      {/* ── Seletor de estrelas ─────────────────────────────────────
          Cinco botões em formato de estrela.
          - notaHover: destaca até qual estrela o mouse está passando
          - notaSelecionada: fixa a nota após o clique
          O efeito laranja aplica-se a todas as estrelas até a posição
          atual do hover ou da seleção (o que for maior).
      ─────────────────────────────────────────────────────────── */}
      <div
        className="avaliacao-estrelas"
        /* Ao tirar o mouse das estrelas, volta a mostrar a nota fixa */
        onMouseLeave={() => setNotaHover(0)}
      >
        {[1, 2, 3, 4, 5].map((posicao) => (
          <button
            key={posicao}
            className={[
              'avaliacao-estrela-btn',
              /* Pinta de laranja se o mouse está sobre ou se já foi selecionada */
              (notaHover || notaSelecionada) >= posicao
                ? 'avaliacao-estrela-btn--ativa'
                : '',
            ].join(' ')}
            onClick={() => setNotaSelecionada(posicao)}
            onMouseEnter={() => setNotaHover(posicao)}
            aria-label={`Avaliar com ${posicao} estrela${posicao > 1 ? 's' : ''}`}
          >
            ★
          </button>
        ))}
      </div>

      {/* Texto descritivo da nota (ex: "Ótimo!" para 5 estrelas) */}
      {notaSelecionada > 0 && (
        <p className="avaliacao-nota-texto">
          {['', 'Ruim', 'Regular', 'Bom', 'Muito bom', 'Excelente!'][notaSelecionada]}
        </p>
      )}

      {/* ── Campo de comentário ─────────────────────────────────────
          Textarea livre para o usuário descrever a experiência.
          maxLength evita textos excessivamente longos.
      ─────────────────────────────────────────────────────────── */}
      <textarea
        className="avaliacao-comentario"
        placeholder="Conte sua experiência neste local..."
        value={comentario}
        onChange={(e) => setComentario(e.target.value)}
        maxLength={500}
        rows={3}
        aria-label="Campo de comentário"
      />

      {/* Contador de caracteres restantes */}
      <p className="avaliacao-contador">
        {comentario.length}/500 caracteres
      </p>

      {/* ── Botão de adicionar foto ──────────────────────────────────
          Sem funcionalidade no momento.
          TODO: ao clicar, abrir seletor de arquivo e fazer upload
          para o servidor (ex: presigned URL do S3 ou endpoint próprio).
      ─────────────────────────────────────────────────────────── */}
      <button
        className="avaliacao-btn-foto"
        onClick={() => console.log('TODO: abrir seletor de foto')}
        aria-label="Adicionar foto (em breve)"
      >
        {/* Ícone de câmera em SVG para não depender de lib externa */}
        <svg
          className="avaliacao-icone-camera"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8
                   a2 2 0 0 1 2-2h4l2-3h6l2 3h4
                   a2 2 0 0 1 2 2z" />
          <circle cx="12" cy="13" r="4" />
        </svg>
        Adicionar foto
      </button>

      {/* ── Botão de envio ──────────────────────────────────────────
          TODO: conectar ao back-end via fetch/axios.
          Desabilitado visualmente se nenhuma estrela foi selecionada.
      ─────────────────────────────────────────────────────────── */}
      <button
        className={[
          'avaliacao-btn-enviar',
          notaSelecionada === 0 ? 'avaliacao-btn-enviar--desabilitado' : '',
        ].join(' ')}
        onClick={handleEnviar}
      >
        Enviar avaliação
      </button>

    </section>
  );
}

export default AvaliacaoForm;
