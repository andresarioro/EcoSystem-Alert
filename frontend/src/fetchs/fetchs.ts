export async function fetchDataSensors (sensorType: string) {
    const res = await fetch('http://localhost:3000/get-data', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ sensorType })
    }) 

    const data = await res.json()

    return data
}

export async function fetchPreds (sensorType: string) {
    const res = await fetch('http://localhost:3000/get-pred', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ sensorType })
    }) 

    const data = await res.json()

    return data
}