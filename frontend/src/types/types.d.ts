export type PredictionData = {
    predictionsH: number[],
    predictionsG: number[],
    predictionsA: number[],
    predictionsL: number[],
    predictionsC: number[],
    predictionsV: number[]
}

export type SensorData = {
    valores: number
}

enum LvlAlerts {
    FIRST_LEVEL = 1,
    SECOND_LEVEL = 2,
    THIRD_LEVEL = 3
}

export type alerts = {
    alertMsg: string,
    alertLvl: LvlAlerts,
}

/*predictionsA
: 
(3) ['732.01', '410.76', '545.52']
predictionsG
: 
(3) ['349.87', '504.69', '688.87']
predictionsH
: 
(3) ['551.82', '348.57', '488.02']
predictionsL
: 
(3) ['329.05', '507.80', '306.94'] */