import { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Users, Award, ClipboardList, Network, Handshake, Target, CircleDollarSign, Receipt, PhoneCall } from 'lucide-react'

// Hook for scroll animation
function useScrollReveal() {
  const [isVisible, setIsVisible] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.unobserve(entry.target)
        }
      },
      { threshold: 0.1 }
    )

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => {
      // eslint-disable-next-line react-hooks/exhaustive-deps
      if (ref.current) observer.unobserve(ref.current)
    }
  }, [])

  return { ref, isVisible }
}

const InfoCard = ({ title, description, reverse }: { title: string, description: string, reverse?: boolean }) => {
  const { ref, isVisible } = useScrollReveal()
  const content = (
    <div className={`p-8 border-4 border-[#a5ce3b] rounded-3xl transition-all duration-700 ease-in-out transform hover:scale-[1.02] hover:shadow-2xl hover:shadow-[#a5ce3b]/20 bg-[#3f3e3f] h-full ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
      <h3 className="text-[#a5ce3b] text-2xl font-bold mb-4">{title}</h3>
      <p className="text-white text-lg leading-relaxed">{description}</p>
    </div>
  )
  const emptySpace = <div className="hidden outline-1 outline-white rounded-3xl lg:block w-full"></div>

  return (
    <div ref={ref} className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch w-full">
      {reverse ? (
        <>
          {emptySpace}
          {content}
        </>
      ) : (
        <>
          {content}
          {emptySpace}
        </>
      )}
    </div>
  )
}

export function HomePage () {
  const navigate = useNavigate()

  return (
    <main className='font-montserrat flex flex-col items-center justify-start min-h-screen w-full bg-white overflow-x-hidden'>
      {/* SECTION 1: Primera Imagen */}
      <section className='w-full flex justify-center bg-[#3f3e3f] shadow-lg relative max-h-40 z-20'>
        <div className='w-11/12 max-w-7xl flex flex-col md:flex-row justify-between items-center gap-6'>
          <img src="/ecosystem-logo-light.svg" alt="EcoSystem Logo" className="h-50 object-contain drop-shadow-md" />
          <div className="flex flex-col items-end gap-2">
            <span className="text-xs text-[#a5ce3b] font-bold tracking-widest pl-2 uppercase">Un proyecto de:</span>
             <img src="/Logo-fmo.svg" alt="Fundacion Marina Orth" className="h-16 object-contain" />
          </div>
        </div>
      </section>

      {/* Franja Verde */}
      <div className="w-full bg-[#a5ce3b] py-6 px-4 text-center text-white font-bold text-xl md:text-3xl shadow-inner relative z-10 flex items-center justify-center">
        <span className="max-w-5xl uppercase drop-shadow-sm">
          Un sistema que alerta posibles derrumbes y otros desastres ocasionados por fenómenos naturales
        </span>
      </div>

      {/* 3x3 Grid de Iconos */}
      <section className='w-full max-w-5xl mx-auto py-20 px-8 flex justify-center bg-white shrink-0 relative'>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-16 gap-y-20">
           {/* Items del grid */}
           {[
             { title: "SOCIOS CLAVE", icon: Users },
             { title: "PROPUESTA DE VALOR", icon: Award },
             { title: "ACTIVIDADES CLAVE", icon: ClipboardList },
             { title: "RECURSOS CLAVE", icon: Network },
             { title: "RELACIÓN CON CLIENTES", icon: Handshake },
             { title: "SEGMENTO CLIENTES", icon: Target },
             { title: "FUENTES DE INGRESO", icon: CircleDollarSign },
             { title: "COSTOS", icon: Receipt },
             { title: "CANALES", icon: PhoneCall }
           ].map((item, index) => (
             <div key={index} className="flex items-center gap-5 group cursor-pointer transition-transform duration-300 hover:-translate-y-2">
               <div className="bg-[#3f3e3f] p-5 shrink-0 rounded-full flex items-center justify-center transition-colors duration-300 group-hover:bg-[#a5ce3b] shadow-lg group-hover:shadow-[0_0_20px_rgba(165,206,59,0.5)] relative">
                 <item.icon size={44} className="text-[#a5ce3b] group-hover:text-white transition-colors duration-300 relative z-10" strokeWidth={2.5} />
                 {/* Decorative dot */}
                 <div className="absolute top-0 right-1 w-3.5 h-3.5 bg-white rounded-full transition-colors border-2 border-[#a5ce3b] shadow-sm"></div>
               </div>
               <span className="font-extrabold text-[#3f3e3f] text-[17px] leading-[1.1] uppercase transition-colors duration-300 group-hover:text-[#a5ce3b] tracking-wide break-words">{item.title}</span>
             </div>
           ))}
        </div>
      </section>

      {/* SECTION 2: Segunda Imagen */}
      <section className='w-full bg-[#3f3e3f] relative flex flex-col items-center pt-24 pb-32 px-4 md:px-12 lg:px-24'>
        {/* Cabecera sección 2 (sobrepuesta visualmente arriba de las tarjetas, borde verde) */}
        <div className="top-0 left-0 w-full bg-white shadow-xl border-b-[6px] border-[#a5ce3b] flex justify-center z-10 p-6 md:p-8 shrink-0 relative drop-shadow-[0_10px_10px_rgba(0,0,0,0.15)] rounded-lg">
           <div className="w-full max-w-7xl flex flex-col lg:flex-row items-center justify-between gap-6 px-8">
              <img src="/Ecosystem-logo.svg" alt="EcoSystem Logo" className="h-[4.5rem] object-contain drop-shadow-md" />
              <div className="text-[#a5ce3b] font-extrabold text-xl md:text-2xl pt-2 lg:max-w-2xl text-center lg:text-right uppercase tracking-wide leading-tight drop-shadow-sm">
                 UN SISTEMA QUE ALERTA POSIBLES DERRUMBES Y OTROS DESASTRES OCASIONADOS POR FENÓMENOS NATURALES
              </div>
           </div>
        </div>

        {/* Tarjetas de información */}
        <div className="w-full max-w-[85rem] flex flex-col gap-16 mt-20 z-0 relative px-4 sm:px-8">
          <InfoCard
            title="¿Qué es ECOSystem?"
            description="Eco System es un sistema de monitoreo y alerta temprana para detectar posibles derrumbes en tiempo real. Utiliza sensores avanzados para medir la estabilidad del terreno y enviar alertas a los usuarios."
            reverse={false}
          />
          <InfoCard
            title="¿Cómo funciona?"
            description="ECO System utiliza una red de sensores distribuidos en áreas propensas a derrumbes. Estos sensores monitorean continuamente las condiciones del terreno, como la humedad, la inclinación y otros factores críticos. Cuando se detectan condiciones que podrían indicar un posible deslizamiento de tierra, el sistema envía alertas a los usuarios y a las autoridades locales."
            reverse={true}
          />
          <InfoCard
            title="¿Por qué es importante?"
            description="La detección temprana de derrumbes puede salvar vidas y prevenir daños materiales. EcoSystem proporciona una herramienta eficaz para monitorear áreas propensas a deslizamientos de tierra y alertar a las autoridades y a la comunidad en caso de emergencia."
            reverse={false}
          />
          <InfoCard
            title="¿A quién va dirigido?"
            description="ECO System está dirigido a comunidades en áreas propensas a derrumbes, autoridades locales, organizaciones de emergencia y cualquier organización interesada en la seguridad y prevención de desastres ocasionados por fenómenos naturales."
            reverse={true}
          />
        </div>

        

        {/* Logo fundación abjao derecha en info section */}
        <div className="w-full max-w-[85rem] flex justify-end mt-24 px-4 sm:px-8">
             <div className="flex flex-col items-end gap-1.5 opacity-80 hover:opacity-100 transition-opacity">
               <span className="text-xs text-white/80 font-bold uppercase tracking-widest pl-2">UN PROYECTO DE:</span>
               <div className="bg-white/95 px-5 py-3 rounded-2xl shadow-xl hover:-translate-y-1 transition-transform">
                 <img src="/Logo-fmo.svg" alt="Fundacion Marina Orth" className="h-12 object-contain" />
               </div>
             </div>
        </div>
      </section>

      {/* Footer y botón */}
      <footer className="w-full -mt-30 relative z-20 flex flex-col items-center justify-center py-20 px-4 bg-linear-to-b from-[#3f3e3f] to-[#a5ce3b]">
          <button 
             onClick={() => navigate('/dashboard')}
             className="group relative overflow-hidden bg-[#a5ce3b] text-white font-extrabold text-xl md:text-2xl py-5 px-14 rounded-full shadow-[0_10px_40px_-10px_rgba(165,206,59,0.8)] hover:shadow-[0_15px_50px_-5px_rgba(165,206,59,1)] hover:scale-105 transition-all duration-300 ease-out flex items-center gap-4"
          >
             <span className="relative z-10 transition-transform duration-300 group-hover:-translate-x-1 tracking-wider uppercase">Ir al Dashboard</span>
             <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 relative z-10 transform transition-transform duration-300 group-hover:translate-x-1 group-hover:scale-110" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
               <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
             </svg>
             <div className="absolute inset-0 bg-white/25 translate-y-[110%] group-hover:translate-y-0 transition-transform duration-500 ease-[cubic-bezier(0.2,0.8,0.2,1)] rounded-full"></div>
          </button>
      </footer>
    </main>
  )
}