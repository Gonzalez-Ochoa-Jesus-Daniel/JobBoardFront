import { useState } from 'react'
import { ArrowRight, BriefcaseBusiness, GraduationCap, MapPin, ShieldCheck } from 'lucide-react'
import { Link } from 'react-router-dom'
import campusImg from '@/assets/images/campus.png'
import logoBlanco from '@/assets/images/logoblanco.png'
import './landing.css'

type CompanyLogo = {
  name: string
  logoUrl: string
  website: string
}

const heroPhotoUrl = 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&q=80&w=1200'

const companies: CompanyLogo[] = [
  { name: 'Audi', logoUrl: 'https://cdn.simpleicons.org/audi/111827', website: 'https://www.audi.com' },
  { name: 'Volkswagen', logoUrl: 'https://cdn.simpleicons.org/volkswagen/001E50', website: 'https://www.volkswagen.com' },
  { name: 'Siemens', logoUrl: 'https://cdn.simpleicons.org/siemens/009999', website: 'https://www.siemens.com' },
  { name: 'Ford', logoUrl: 'https://cdn.simpleicons.org/ford/2563EB', website: 'https://www.ford.com.mx' },
  { name: 'Intel', logoUrl: 'https://cdn.simpleicons.org/intel/0068B5', website: 'https://www.intel.com' },
  { name: 'SAP', logoUrl: 'https://cdn.simpleicons.org/sap/0FAAFF', website: 'https://www.sap.com' },
  { name: 'Cisco', logoUrl: 'https://cdn.simpleicons.org/cisco/1BA0D7', website: 'https://www.cisco.com' },
  { name: 'NVIDIA', logoUrl: 'https://cdn.simpleicons.org/nvidia/76B900', website: 'https://www.nvidia.com' },
]

const carouselCompanies = [...companies, ...companies]

const CompanyLogoCard = ({ company }: { company: CompanyLogo }) => {
  const [hasLogo, setHasLogo] = useState(true)

  return (
    <a
      className={`landing-company${hasLogo ? '' : ' is-text-only'}`}
      href={company.website}
      target="_blank"
      rel="noreferrer"
      aria-label={`Visitar sitio de ${company.name}`}
    >
      {hasLogo ? (
        <img
          src={company.logoUrl}
          alt={company.name}
          loading="lazy"
          onError={() => setHasLogo(false)}
        />
      ) : null}
      <span className="landing-company__name">{company.name}</span>
    </a>
  )
}

export const LandingPage = () => {
  return (
    <main className="landing-shell">
      <section className="landing-hero" style={{ backgroundImage: `url(${campusImg})` }}>
        <div className="landing-hero__shade" />

        <header className="landing-nav" aria-label="Navegacion principal">
          <Link to="/" className="landing-nav__brand" aria-label="Inicio UTTECAM">
            <img src={logoBlanco} alt="UTTECAM" />
          </Link>

          <nav className="landing-nav__actions">
            <Link to="/login" className="landing-nav__link">
              Iniciar sesion
            </Link>
            <Link to="/registro" className="landing-nav__button">
              Registrarse
            </Link>
          </nav>
        </header>

        <div className="landing-hero__content">
          <div className="landing-hero__copy">
            <h1>
              <span>Bolsa de</span>
              <span>Trabajo</span>
              <span>UTTECAM</span>
            </h1>

            <p>
              Un espacio para conectar estudiantes, egresados y empresas con oportunidades reales,
              validadas y listas para dar el siguiente paso profesional.
            </p>

            <div className="landing-hero__actions">
              <Link to="/login" className="landing-primary-button">
                Entrar a la plataforma
                <ArrowRight size={18} />
              </Link>
              <Link to="/registro" className="landing-secondary-button">
                Crear cuenta
              </Link>
            </div>
          </div>

          <figure className="landing-media-card">
            <img src={heroPhotoUrl} alt="Estudiantes revisando oportunidades profesionales" />
            <div className="landing-stats-list" aria-label="Resumen de la plataforma">
              <div className="landing-stat">
                <BriefcaseBusiness size={18} />
                <span>Vacantes activas</span>
                <strong>+120</strong>
              </div>
              <div className="landing-stat">
                <GraduationCap size={18} />
                <span>Talento UTTECAM</span>
                <strong>Estudiantes y egresados</strong>
              </div>
              <div className="landing-stat">
                <ShieldCheck size={18} />
                <span>Validacion</span>
                <strong>Empresas revisadas</strong>
              </div>
            </div>
          </figure>
        </div>
      </section>

      <section className="landing-companies" aria-labelledby="landing-companies-title">
        <div className="landing-section-heading">
          <span>Empresas vinculadas</span>
          <h2 id="landing-companies-title">Oportunidades que se mueven contigo</h2>
          <p>
            Referencias de organizaciones y sectores que inspiran la vinculacion profesional de la comunidad UTTECAM.
          </p>
        </div>

        <div className="landing-marquee" aria-label="Carrusel de empresas destacadas">
          <div className="landing-marquee__track">
            {carouselCompanies.map((company, index) => (
              <CompanyLogoCard company={company} key={`${company.name}-${index}`} />
            ))}
          </div>
        </div>
      </section>

      <section className="landing-proof">
        <div>
          <span className="landing-proof__label">UTTECAM Tecamachalco</span>
          <h2>Del aula al sector productivo, en un solo flujo.</h2>
        </div>
        <p>
          Empresas publican vacantes, administracion valida la informacion y estudiantes pueden postularse
          con seguimiento claro.
        </p>
        <div className="landing-proof__location">
          <MapPin size={18} />
          Tecamachalco, Puebla
        </div>
      </section>
    </main>
  )
}
