import { ArrowUpRightIcon } from '@heroicons/react/24/outline'
import { useNavigate } from 'react-router-dom'

export function HomePage () {
  const navigate = useNavigate()

  return (
    <main className='text-black font-montserrat flex flex-col items-center justify-center min-h-screen w-full bg-gray-200'>
      <section className='box-shadow-custom grid grid-cols-[auto_1fr] bg-white w-85/100 md:w-70/100 h-[600px] sm:h-[700px] rounded-xl'>
        <section className='font-baloo bg-[var(--primary-color)]/10 text-[var(--primary-color)] border-r-1 border-[var(--primary-color)] text-4xl md:text-5xl gap-5 flex flex-col items-center justify-center w-fit px-4 sm:px-6 md:px-0 md:w-[100px] h-full rounded-l-xl'>
          <p>E</p>
          <p>C</p>
          <p>O</p>
          <p>S</p>
          <p>Y</p>
          <p>S</p>
          <p>T</p>
          <p>E</p>
          <p>M</p>
        </section>
        <section className='hidden overflow-y-scroll scrollbar-custom flex-wrap xl:flex flex-1 h-[700px] items-center gap-15 w-full'>
          <div className="mask-gradient-bottom text-white/90 w-full bg-[url('/Zona-posible-derrumbe.PNG')] bg-black flex flex-col gap-5 text-center justify-center items-center bg-cover bg-center h-[300px]">
            <div>
              <h1 className='text-3xl font-bold'>Bienvenido a EcoSystem</h1>
              <p className='text-xl'>Un sistema que alerta posibles derrumbes y otros desastres naturales</p>
            </div>
            <button
              onClick={() => navigate('/dashboard')} className='flex cursor-pointer hover:bg-[var(--primary-color)]/90
                    transition-colors duration-150 ease-in-out gap-2 items-center px-4 py-2
                    bg-[var(--primary-color)] rounded-lg text-black'
            >
              Ver señales
              <ArrowUpRightIcon className='w-4 h-4' />
            </button>
          </div>
          <div className='flex flex-wrap overflow-x-hidden items-center justify-around w-full mt-10'>
            <img src='/9272915.png' alt='example' width={400} height={400} className='w-85 h-85' />
            <div>
              <h2 className='font-bold'>¿Qué es EcoSystem?</h2>
              <p className='w-80'>
                EcoSystem es un sistema de monitoreo y alerta temprana para detectar
                posibles derrumbes en tiempo real. Utiliza sensores avanzados para medir la
                estabilidad del terreno y enviar alertas a los usuarios.
              </p>
            </div>
          </div>
          <div className='flex flex-wrap overflow-x-hidden items-center justify-around w-full'>
            <div>
              <h2 className=' font-bold'>¿Como funciona?</h2>
              <p className='w-80 h-80'>
                EcoSystem utiliza una red de sensores distribuidos en áreas propensas a derrumbes.
                Estos sensores monitorean continuamente las condiciones del terreno, como la humedad,
                la inclinación y otros factores críticos. Cuando se detectan condiciones que podrían
                indicar un posible deslizamiento de tierra, el sistema envía alertas a los usuarios
                y a las autoridades locales.
              </p>
            </div>
            <img src='/9272915.png' alt='example' width={400} height={400} className='w-85 h-85' />
          </div>
          <div className='flex flex-wrap overflow-x-hidden items-center justify-around w-full'>
            <img src='/9272915.png' alt='example' width={400} height={400} className='w-85 h-85' />
            <div>
              <h2 className=' font-bold'>¿Porque es importante?</h2>
              <p className='w-80 h-80'>
                La detección temprana de derrumbes puede salvar vidas y prevenir daños materiales.
                EcoSystem proporciona una herramienta eficaz para monitorear áreas propensas a deslizamientos
                de tierra y alertar a las autoridades y a la comunidad en caso de emergencia.
              </p>
            </div>
          </div>
          <div className='flex flex-wrap overflow-x-hidden items-center justify-around w-full'>
            <div>
              <h2 className=' font-bold'>¿A quien va dirigido?</h2>
              <p className='w-80 h-80'>
                EcoSystem está dirigido a comunidades en áreas propensas a derrumbes,
                autoridades locales, organizaciones de emergencia y cualquier organizacion interesada
                en la seguridad y prevención de desastres naturales.
              </p>
            </div>
            <img src='/9272915.png' alt='example' width={400} height={400} className='w-85 h-85' />
          </div>
        </section>

        {/* Mobile Section */}

        <section className='xl:hidden scrollbar-custom overflow-y-auto flex-wrap flex flex-1 h-[600px] sm:h-[700px] items-center gap-15 w-full'>
          <div className="mask-gradient-bottom text-white/90 w-full bg-[url('/Zona-posible-derrumbe.PNG')] bg-black flex flex-col gap-5 text-center justify-center items-center bg-cover bg-center h-[300px]">
            <div>
              <h1 className='text-2xl font-bold'>Bienvenido a EcoSystem</h1>
              <p>Un sistema que alerta posibles derrumbes y otros desastres naturales</p>
            </div>
            <a className='flex cursor-pointer hover:bg-[var(--primary-color)]/90
                    transition-colors duration-150 ease-in-out gap-2 items-center px-4 py-2
                    bg-[var(--primary-color)] rounded-lg text-black'
            >
              Ver señales
              <ArrowUpRightIcon className='w-4 h-4' />
            </a>
          </div>
          <div className='p-4 flex flex-wrap overflow-x-hidden items-center justify-around w-full gap-15'>
            <div>
              <h2 className='font-bold'>¿Qué es EcoSystem?</h2>
              <p className='w-full sm:w-80'>
                EcoSystem es un sistema de monitoreo y alerta temprana para detectar
                posibles derrumbes en tiempo real. Utiliza sensores avanzados para medir la
                estabilidad del terreno y enviar alertas a los usuarios.
              </p>
            </div>
            <img src='/9272915.png' alt='example' width={400} height={400} className='sm:w-50 sm:h-50 w-35 h-35' />
          </div>
          <div className='p-4 flex flex-wrap overflow-x-hidden items-center justify-center w-full gap-15'>
            <div>
              <h2 className='font-bold'>¿Como funciona?</h2>
              <p className='w-full sm:w-80'>
                EcoSystem utiliza una red de sensores distribuidos en áreas propensas a derrumbes.
                Estos sensores monitorean continuamente las condiciones del terreno, como la humedad,
                la inclinación y otros factores críticos. Cuando se detectan condiciones que podrían
                indicar un posible deslizamiento de tierra, el sistema envía alertas a los usuarios
                y a las autoridades locales.
              </p>
            </div>
            <img src='/9272915.png' alt='example' width={400} height={400} className='sm:w-50 sm:h-50 w-35 h-35' />
          </div>
          <div className='p-4 flex flex-wrap overflow-x-hidden items-center justify-around w-full gap-15'>
            <div>
              <h2 className='font-bold'>¿Porque es importante?</h2>
              <p className='w-full sm:w-80'>
                La detección temprana de derrumbes puede salvar vidas y prevenir daños materiales.
                EcoSystem proporciona una herramienta eficaz para monitorear áreas propensas a deslizamientos
                de tierra y alertar a las autoridades y a la comunidad en caso de emergencia.
              </p>
            </div>
            <img src='/9272915.png' alt='example' width={400} height={400} className='sm:w-50 sm:h-50 w-35 h-35' />
          </div>
          <div className='p-4 flex flex-wrap overflow-x-hidden items-center justify-around h-fit w-full gap-15'>
            <div className='w-full sm:w-80'>
              <h2 className='font-bold'>¿A quien va dirigido?</h2>
              <p>
                EcoSystem está dirigido a comunidades en áreas propensas a derrumbes,
                autoridades locales, organizaciones de emergencia y cualquier organizacion interesada
                en la seguridad y prevención de desastres naturales.
              </p>
            </div>
            <img src='/9272915.png' alt='example' width={400} height={400} className='sm:w-50 sm:h-50 w-35 h-35' />
          </div>
        </section>
      </section>
    </main>
  )
}
