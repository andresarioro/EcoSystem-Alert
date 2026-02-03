import { CheckIcon, ExclamationTriangleIcon, MinusIcon } from "@heroicons/react/24/outline";
import { LineGraficH } from "../LineGrafics/LineGraficH";
import { LineGraficL } from "../LineGrafics/LineGraficL";
import { LineGraficC } from "../LineGrafics/LineGraficC";
import { useEffect, useState } from "react";
import { fetchPreds } from "../../fetchs/fetchs";
import { LineGraficV } from "../LineGrafics/LineGraficV";

export function GroupGraffics() {
    const [hPreds, setHPreds] = useState<number[]>([])
    const [cPreds, setCPreds] = useState<number[]>([])
    const [lPreds, setLPreds] = useState<number[]>([])
    const [vPreds, setVpreds] = useState<number[]>([])

    useEffect(() => {
        const getPreds = async () => {
            const hPred = await fetchPreds('H')
            setHPreds(hPred)

            const cPred = await fetchPreds('C')
            setCPreds(cPred)

            const lPred = await fetchPreds('L')
            setLPreds(lPred)

            const vPred = await fetchPreds('V')
            setVpreds(vPred)
        }

        getPreds()
    }, [])

    console.log(hPreds, cPreds)

    return (
        <main className='text-black font-montserrat flex flex-col items-center justify-center min-h-screen w-full bg-gray-200'>
            <section className='overflow-y-auto overflow-x-hidden scrollbar-custom box-shadow-custom flex flex-col items-center gap-10 bg-white w-85/100 md:w-70/100 h-[600px] sm:h-[700px] rounded-xl'>
                <header className='flex w-full justify-between items-center px-2'>
                    <div className='max-w-sm p-2'>
                        <img src='/orth.svg' alt='Marina-Orth-logo' className='w-20 md:w-40 h-auto object-contain rounded' />
                    </div>
                    <h1 className='text-lg md:text-3xl text-center font-bold mt-5'>Ecosystem Dashboard</h1>
                    <div className='max-w-sm'>
                        <img src='/Ecosystem-logo.svg' alt='Ecosystem-logo' className='w-20 md:w-40 h-auto object-contain rounded' />
                    </div>
                </header>

                {/*Imagen satelite */}
                <section className="w-9/10 rounded-md p-2 bg-gradient-to-t from-[var(--primary-color)]/20 to-[var(--primary-color)]">
                    {/* Imagen */}
                    <div className="w-full flex flex-col items-center justify-center gap-2">
                        <h1 className="text-xl font-bold">Territorio desde satelite</h1>
                        <img src="https://i.ibb.co/GfSTPm9v/imagen-2025-08-27-211821955.png" alt="imagen-satelital" className="w-95/100 md:85/100 h-100 rounded-md bg-gray-400 object-cover" />
                    </div>
                    {/*informacion */}
                    <div className="w-full flex justify-between items-center mt-5">
                        <p className="text-sm w-7/10">En esta pagina se veran las vistas satelitales de calor del territorio</p>
                        <button className="rounded-md px-4 py-1 bg-[#1cd933] text-sm font-bold">En desarrollo...</button> 
                    </div>
                </section>

                {/*Primera grafica */}

                <section className="w-full flex flex-col justify-center items-center gap-4">
                    <h1 className="text-center font-bold text-xl">Humedad: </h1>
                    <LineGraficH />
                    {/*Agregar logica despues */}
                    <div className="flex flex-col items-center justify-center gap-4">
                        <h1 className="text-lg font-bold text-center">Predicciones del sensor: </h1>
                        {hPreds ? <section className="flex items-center justify-center gap-5">
                            <div className="flex flex-col justify-center items-center">
                                {hPreds[0]}
                                <CheckIcon className="w-10 h-10"/>
                                Todo bien
                            </div>
                            <div className="flex flex-col justify-center items-center">
                                {hPreds[1]}
                                <MinusIcon className="w-10 h-10"/>
                                Precaucion
                            </div>
                            <div className="flex flex-col justify-center items-center">
                                {hPreds[2]}
                                <ExclamationTriangleIcon className="w-10 h-10"/>
                                Alerta
                            </div>
                        </section>
                        : <p className="text-lg font-bold text-center">No hay predicciones disponibles actuales para mostrar</p>}
                    </div>
                </section>


                <section className="w-full flex flex-col justify-center items-center gap-4 border-t-1 border-black pt-10">
                    <h1 className="text-center font-bold text-xl">Aceleracion y giro de la tierra</h1>
                    {/* cambio por m */}
                    <LineGraficC />
                    {/*Agregar logica despues */}
                    <div className="flex flex-col items-center justify-center gap-4">
                        <h1 className="text-lg font-bold text-center">Predicciones del sensor: </h1>
                        {cPreds ? <section className="flex items-center justify-center gap-5">
                            <div className="flex flex-col justify-center items-center">
                                {cPreds[0]}
                                <CheckIcon className="w-10 h-10"/>
                                Todo bien
                            </div>
                            <div className="flex flex-col justify-center items-center">
                                {cPreds[1]}
                                <MinusIcon className="w-10 h-10"/>
                                Precaucion
                            </div>
                            <div className="flex flex-col justify-center items-center">
                                {cPreds[2]}
                                <ExclamationTriangleIcon className="w-10 h-10"/>
                                Alerta
                            </div>
                        </section>
                        : <p className="text-lg font-bold text-center">No hay predicciones disponibles actuales para mostrar</p>}
                    </div>
                </section>


                <section className="w-full flex flex-col justify-center items-center gap-4 border-t-1 border-black py-10">
                    <h1 className="text-center font-bold text-xl">Lluvia: </h1>
                    <LineGraficL />
                    {/*Agregar logica despues */}
                    <div className="flex flex-col items-center justify-center gap-4">
                        <h1 className="text-lg font-bold text-center">Predicciones del sensor: </h1>
                        {lPreds ? <section className="flex items-center justify-center gap-5">
                            <div className="flex flex-col justify-center items-center">
                                {lPreds[0]}
                                <CheckIcon className="w-10 h-10"/>
                                Todo bien
                            </div>
                            <div className="flex flex-col justify-center items-center">
                                {lPreds[1]}
                                <MinusIcon className="w-10 h-10"/>
                                Precaucion
                            </div>
                            <div className="flex flex-col justify-center items-center">
                                {lPreds[2]}
                                <ExclamationTriangleIcon className="w-10 h-10"/>
                                Alerta
                            </div>
                        </section>
                        : <p className="text-lg font-bold text-center">No hay predicciones disponibles actuales para mostrar</p>}
                    </div>
                </section>

                <section className="w-full flex flex-col justify-center items-center gap-4 border-t-1 border-black py-10">
                    <h1 className="text-center font-bold text-xl">Vibracion: </h1>
                    <LineGraficV />
                    {/*Agregar logica despues */}
                    <div className="flex flex-col items-center justify-center gap-4">
                        <h1 className="text-lg font-bold text-center">Predicciones del sensor: </h1>
                        {lPreds ? <section className="flex items-center justify-center gap-5">
                            <div className="flex flex-col justify-center items-center">
                                {vPreds[0]}
                                <CheckIcon className="w-10 h-10"/>
                                Todo bien
                            </div>
                            <div className="flex flex-col justify-center items-center">
                                {vPreds[1]}
                                <MinusIcon className="w-10 h-10"/>
                                Precaucion
                            </div>
                            <div className="flex flex-col justify-center items-center">
                                {vPreds[2]}
                                <ExclamationTriangleIcon className="w-10 h-10"/>
                                Alerta
                            </div>
                        </section>
                        : <p className="text-lg font-bold text-center">No hay predicciones disponibles actuales para mostrar</p>}
                    </div>
                </section>
            </section>
        </main>
        // varias graficas que representan al paso del tiempo
    )
}