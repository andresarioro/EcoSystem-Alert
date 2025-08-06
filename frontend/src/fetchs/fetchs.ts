export async function fetchSnH() {
    const res = await fetch('http://localhost:3000/datos-h')
    const data = await res.json()

    return data.res
}

export async function fetchSnA() {
    const res = await fetch('http://localhost:3000/datos-a')
    const data = await res.json()

    return data.res
}

export async function fetchSnG() {
    const res = await fetch('http://localhost:3000/datos-g')
    const data = await res.json()

    return data.res
}

export async function fetchSnC() {
    const res = await fetch('http://localhost:3000/datos-c')
    const data = await res.json()

    return data.res
}

export async function fetchSnL() {
    const res = await fetch('http://localhost:3000/datos-l')
    const data = await res.json()

    return data.res
}

export async function fetchPredH() {
    const res = await fetch('http://localhost:3000/pred-h')
    const data = await res.json()

    return data.res
}

export async function fetchPredA() {
    const res = await fetch('http://localhost:3000/pred-a')
    const data = await res.json()

    return data.res
}

export async function fetchPredG() {
    const res = await fetch('http://localhost:3000/pred-g')
    const data = await res.json()

    return data.res
}

export async function fetchPredC() {
    const res = await fetch('http://localhost:3000/pred-c')
    const data = await res.json()

    return data.res
}

export async function fetchPredL() {
    const res = await fetch('http://localhost:3000/pred-l')
    const data = await res.json()

    return data.res
}