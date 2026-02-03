const backendUrl = 'http://localhost:3000'

export async function fetchDataSensors (sensorType: string) {
    const res = await fetch(`${backendUrl}/get-data`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ sensorType })
    }) 

    const data = await res.json()

    return data.res
}

export async function fetchPreds (sensorType: string) {
    const res = await fetch(`${backendUrl}/get-pred`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ sensorType })
    }) 

    const data = await res.json()

    return data.res
}

export async function fetchProms () {
    const res = await fetch(`${backendUrl}/get-proms`)
    const data = await res.json()

    return data
}