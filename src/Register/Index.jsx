import { useState } from 'react'
import heroImg from '../assets/img-mar-forte-reis.jpg'
import potiMapLogo from '../assets/PotiMap-logo-real.png'
import './Style.css'

function Register({ initialMode = 'signup', onNavigate }) {
  const [mode, setMode] = useState(initialMode)
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [errorMsg, setErrorMsg] = useState('')

  // 1. Estado unificado para enviar para a API Node.js
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    favoriteDestination: '',
    password: '',
    confirmPassword: '',
    acceptTerms: false
  })

  const isSignup = mode === 'signup'

  // 2. Função para atualizar os dados em tempo real
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }))
    setErrorMsg('') // Limpa o erro ao digitar
  }

  // 3. Submissão e preparação para a API
  const handleSubmit = async (e) => {
    e.preventDefault() // Impede a página de recarregar
    setErrorMsg('')

    // Validações do front-end antes de bater na API
    if (isSignup) {
      if (formData.password !== formData.confirmPassword) {
        return setErrorMsg('As senhas não coincidem.')
      }
      if (!formData.acceptTerms) {
        return setErrorMsg('Você precisa aceitar os termos para continuar.')
      }
    }

    setIsLoading(true)

    try {
      /* // === CÓDIGO FUTURO PARA A API NODE/EXPRESS ===
      const endpoint = isSignup ? '/api/auth/register' : '/api/auth/login'
      const response = await fetch(`http://localhost:3000${endpoint}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
          // Envia nome e destino apenas se for cadastro
          ...(isSignup && {
            name: formData.name,
            favoriteDestination: formData.favoriteDestination
          })
        })
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.message || 'Erro na requisição')
      }
      
      const data = await response.json()
      console.log('Token recebido:', data.token)
      // Aqui você salvaria o token no localStorage/Context e redirecionaria o usuário
      */

      // Simulação visual de carregamento (Remova quando plugar a API real)
      await new Promise((resolve) => setTimeout(resolve, 1500))
      console.log('Dados prontos para o Express:', formData)
      alert(isSignup ? 'Simulação: Conta criada!' : 'Simulação: Login efetuado!')

    } catch (err) {
      setErrorMsg(err.message || 'Erro ao conectar com o servidor.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <main className="register-page">
      <section className="register-visual" aria-label="Vista do litoral do Rio Grande do Norte">
        <img src={heroImg} alt="Vista aerea do litoral do Rio Grande do Norte" />
        <div className="register-visual__shade" />
        <div className="register-visual__copy">
          <p className="register-kicker">Turismo inteligente no RN</p>
          <h1>Descubra o melhor do litoral potiguar.</h1>
          <p>
            Crie roteiros, salve experiencias e receba recomendacoes para viajar
            pelo Rio Grande do Norte com mais confianca.
          </p>
        </div>
      </section>

      <section className="register-panel" aria-label="Cadastro de usuario">
        <header className="register-header">
          <button className="register-brand" type="button" onClick={() => onNavigate?.('home')} aria-label="Voltar para a pagina inicial">
            <img src={potiMapLogo} alt="" aria-hidden="true" />
            <span>Tatour</span>
          </button>
          <button className="register-back" type="button" onClick={() => onNavigate?.('home')}>
            Voltar para explorar
            <span aria-hidden="true">-&gt;</span>
          </button>
        </header>

        <div className="register-card">
          <div className="register-toggle" aria-label="Escolha entre entrar ou criar conta">
            <button
              className={!isSignup ? 'active' : ''}
              type="button"
              onClick={() => {
                setMode('signin')
                setErrorMsg('')
              }}
            >
              Entrar
            </button>
            <button
              className={isSignup ? 'active' : ''}
              type="button"
              onClick={() => {
                setMode('signup')
                setErrorMsg('')
              }}
            >
              Criar conta
            </button>
          </div>

          <div className="register-title">
            <h2>{isSignup ? 'Crie sua conta' : 'Bem-vindo de volta'}</h2>
            <p>
              {isSignup
                ? 'Comece a salvar destinos, montar roteiros e personalizar sua viagem.'
                : 'Acesse seus roteiros salvos, favoritos e reservas.'}
            </p>
          </div>

          {/* Adição do onSubmit no Form */}
          <form className="register-form" onSubmit={handleSubmit}>

            {/* Exibição de Erros */}
            {errorMsg && <div className="register-error">{errorMsg}</div>}

            {isSignup && (
              <label className="register-field" htmlFor="name">
                <span>Nome completo</span>
                <div className="register-control">
                  <span className="register-icon" aria-hidden="true">
                    <svg viewBox="0 0 24 24">
                      <path d="M20 21a8 8 0 0 0-16 0" />
                      <circle cx="12" cy="7" r="4" />
                    </svg>
                  </span>
                  <input
                    id="name"
                    type="text"
                    name="name"
                    placeholder="Mariana Costa"
                    value={formData.name}
                    onChange={handleChange}
                    required={isSignup}
                  />
                </div>
              </label>
            )}

            <label className="register-field" htmlFor="email">
              <span>Email</span>
              <div className="register-control">
                <span className="register-icon" aria-hidden="true">
                  <svg viewBox="0 0 24 24">
                    <rect x="3" y="5" width="18" height="14" rx="2" />
                    <path d="m3 7 9 6 9-6" />
                  </svg>
                </span>
                <input
                  id="email"
                  type="email"
                  name="email"
                  placeholder="nome@email.com"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>
            </label>

            {isSignup && (
              <label className="register-field" htmlFor="favoriteDestination">
                <span>Destino favorito</span>
                <div className="register-control">
                  <span className="register-icon" aria-hidden="true">
                    <svg viewBox="0 0 24 24">
                      <path d="M20 10c0 5-8 11-8 11S4 15 4 10a8 8 0 1 1 16 0Z" />
                      <circle cx="12" cy="10" r="3" />
                    </svg>
                  </span>
                  <select
                    id="favoriteDestination"
                    name="favoriteDestination"
                    value={formData.favoriteDestination}
                    onChange={handleChange}
                    required={isSignup}
                  >
                    <option value="" disabled>Escolha um destino</option>
                    <option value="Natal">Natal e Via Costeira</option>
                    <option value="Pipa">Pipa e Tibau do Sul</option>
                    <option value="Genipabu">Genipabu e litoral norte</option>
                    <option value="Maracajau">Maracajau e Parrachos</option>
                  </select>
                </div>
              </label>
            )}

            <label className="register-field" htmlFor="password">
              <span className="register-row">
                Senha
                {!isSignup && <a href="/">Esqueci minha senha</a>}
              </span>
              <div className="register-control">
                <span className="register-icon" aria-hidden="true">
                  <svg viewBox="0 0 24 24">
                    <rect x="5" y="11" width="14" height="10" rx="2" />
                    <path d="M8 11V7a4 4 0 0 1 8 0v4" />
                  </svg>
                </span>
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  placeholder={isSignup ? 'Crie uma senha segura' : 'Digite sua senha'}
                  value={formData.password}
                  onChange={handleChange}
                  required
                  minLength="6"
                />
                <button
                  className="register-icon-button"
                  type="button"
                  onClick={() => setShowPassword((current) => !current)}
                  aria-label={showPassword ? 'Ocultar senha' : 'Mostrar senha'}
                  title={showPassword ? 'Ocultar senha' : 'Mostrar senha'}
                >
                  <svg viewBox="0 0 24 24" aria-hidden="true">
                    {showPassword ? (
                      <>
                        <path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12Z" />
                        <circle cx="12" cy="12" r="3" />
                      </>
                    ) : (
                      <>
                        <path d="m3 3 18 18" />
                        <path d="M10.6 10.6a2 2 0 0 0 2.8 2.8" />
                        <path d="M9.9 5.3A9.7 9.7 0 0 1 12 5c6.5 0 10 7 10 7a17.7 17.7 0 0 1-2.1 3.1" />
                        <path d="M6.6 6.6C3.6 8.6 2 12 2 12s3.5 7 10 7a9.9 9.9 0 0 0 4.4-1" />
                      </>
                    )}
                  </svg>
                </button>
              </div>
            </label>

            {/* Novo campo: Confirmação de Senha */}
            {isSignup && (
              <label className="register-field" htmlFor="confirmPassword">
                <span>Confirmar Senha</span>
                <div className="register-control">
                  <span className="register-icon" aria-hidden="true">
                    <svg viewBox="0 0 24 24">
                      <path d="M20 6 9 17l-5-5" />
                    </svg>
                  </span>
                  <input
                    id="confirmPassword"
                    type={showPassword ? 'text' : 'password'}
                    name="confirmPassword"
                    placeholder="Repita sua senha"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    required={isSignup}
                  />
                </div>
              </label>
            )}

            {isSignup && (
              <label className="register-terms" htmlFor="acceptTerms">
                <input
                  id="acceptTerms"
                  type="checkbox"
                  name="acceptTerms"
                  checked={formData.acceptTerms}
                  onChange={handleChange}
                />
                <span>
                  Aceito receber sugestoes de roteiros, ofertas e informacoes
                  sobre experiencias no RN.
                </span>
              </label>
            )}

            <button
              className="register-primary"
              type="submit"
              disabled={isLoading}
            >
              {isLoading ? 'Processando...' : (isSignup ? 'Criar minha conta' : 'Entrar')}
            </button>
          </form>

          <div className="register-divider">
            <span />
            <p>ou continue com</p>
            <span />
          </div>

          <div className="register-social">
            <button type="button">
              <span className="register-google" aria-hidden="true">G</span> Google
            </button>
            <button type="button">
              <span className="register-facebook" aria-hidden="true">f</span> Facebook
            </button>
          </div>

          <p className="register-switch">
            {isSignup ? 'Ja tem uma conta?' : 'Ainda nao tem conta?'}
            <button
              type="button"
              onClick={() => {
                setMode(isSignup ? 'signin' : 'signup')
                setErrorMsg('')
              }}
            >
              {isSignup ? 'Entrar' : 'Criar conta'}
            </button>
          </p>
        </div>
      </section>
    </main>
  )
}

export default Register
