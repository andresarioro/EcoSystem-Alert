import { CheckIcon, ExclamationTriangleIcon, MinusIcon } from "@heroicons/react/24/outline";
import { LineGraficA } from "../LineGrafics/LineGraficA";
import { LineGraficG } from "../LineGrafics/LineGraficG";
import { LineGraficH } from "../LineGrafics/LineGraficH";
import { LineGraficL } from "../LineGrafics/LineGraficL";
import { LineGraficC } from "../LineGrafics/LineGraficC";
import { useEffect, useState } from "react";
import { fetchPredA, fetchPredC, fetchPredG, fetchPredH, fetchPredL } from "../../fetchs/fetchs";

export function GroupGraffics() {
    const [hPreds, setHPreds] = useState<number[]>([])
    const [aPreds, setAPreds] = useState<number[]>([])
    const [gPreds, setGPreds] = useState<number[]>([])
    const [cPreds, setCPreds] = useState<number[]>([])
    const [lPreds, setLPreds] = useState<number[]>([])

    useEffect(() => {
        const getPreds = async () => {
            const hPred = await fetchPredH()
            setHPreds(hPred)

            const aPred = await fetchPredA()
            setAPreds(aPred)

            const gPred = await fetchPredG()
            setGPreds(gPred)

            const cPred = await fetchPredC()
            setCPreds(cPred)

            const lPred = await fetchPredL()
            setLPreds(lPred)
        }

        getPreds()
    }, [])

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

                {/*Primera grafica */}

                <section className="w-full flex flex-col justify-center items-center gap-4">
                    <h1 className="text-center font-bold text-xl">Humedad: </h1>
                    <LineGraficH />
                    {/*Agregar logica despues */}
                    <div className="flex flex-col items-center justify-center gap-4">
                        <h1 className="text-lg font-bold text-center">Predicciones del sensor: </h1>
                        <section className="flex items-center justify-center gap-5">
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
                    </div>
                </section>



                <section className="w-full flex flex-col justify-center items-center gap-4 border-t-1 border-black pt-10">
                    <h1 className="text-center font-bold text-xl">Giroscopio: </h1>
                    <LineGraficG />
                    {/*Agregar logica despues */}
                    <div className="flex flex-col items-center justify-center gap-4">
                        <h1 className="text-lg font-bold text-center">Predicciones del sensor: </h1>
                        <section className="flex items-center justify-center gap-5">
                            <div className="flex flex-col justify-center items-center">
                                {gPreds[0]}
                                <CheckIcon className="w-10 h-10"/>
                                Todo bien
                            </div>
                            <div className="flex flex-col justify-center items-center">
                                {gPreds[1]}
                                <MinusIcon className="w-10 h-10"/>
                                Precaucion
                            </div>
                            <div className="flex flex-col justify-center items-center">
                                {gPreds[2]}
                                <ExclamationTriangleIcon className="w-10 h-10"/>
                                Alerta
                            </div>
                        </section>
                    </div>
                </section>


                <section className="w-full flex flex-col justify-center items-center gap-4 border-t-1 border-black pt-10">
                    <h1 className="text-center font-bold text-xl">Acelerometro: </h1>
                    <LineGraficA />
                    {/*Agregar logica despues */}
                    <div className="flex flex-col items-center justify-center gap-4">
                        <h1 className="text-lg font-bold text-center">Predicciones del sensor: </h1>
                        <section className="flex items-center justify-center gap-5">
                            <div className="flex flex-col justify-center items-center">
                                {aPreds[0]}
                                <CheckIcon className="w-10 h-10"/>
                                Todo bien
                            </div>
                            <div className="flex flex-col justify-center items-center">
                                {aPreds[1]}
                                <MinusIcon className="w-10 h-10"/>
                                Precaucion
                            </div>
                            <div className="flex flex-col justify-center items-center">
                                {aPreds[2]}
                                <ExclamationTriangleIcon className="w-10 h-10"/>
                                Alerta
                            </div>
                        </section>
                    </div>
                </section>


                <section className="w-full flex flex-col justify-center items-center gap-4 border-t-1 border-black pt-10">
                    <h1 className="text-center font-bold text-xl">Cambio</h1>
                    {/* cambio por m */}
                    <LineGraficC />
                    {/*Agregar logica despues */}
                    <div className="flex flex-col items-center justify-center gap-4">
                        <h1 className="text-lg font-bold text-center">Predicciones del sensor: </h1>
                        <section className="flex items-center justify-center gap-5">
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
                    </div>
                </section>


                <section className="w-full flex flex-col justify-center items-center gap-4 border-t-1 border-black py-10">
                    <h1 className="text-center font-bold text-xl">Lluvia: </h1>
                    <LineGraficL />
                    {/*Agregar logica despues */}
                    <div className="flex flex-col items-center justify-center gap-4">
                        <h1 className="text-lg font-bold text-center">Predicciones del sensor: </h1>
                        <section className="flex items-center justify-center gap-5">
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
                    </div>
                </section>
            </section>
        </main>
        // varias graficas que representan al paso del tiempo
    )
}