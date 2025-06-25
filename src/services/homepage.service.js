export async function homepage() {
    const response = await fetch(process.env.BASE_URL + '/api/home?populate[blocks][populate]=*&populate[blocks2][populate]=*')
    const jsonData = await response.json()
    return jsonData.data
}