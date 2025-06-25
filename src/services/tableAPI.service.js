export async function tableApiData() {
    const response = await fetch(process.env.NEXT_PUBLIC_BASE_URL + '/api/basic-tables')
    const jsonData = await response.json()
    // console.log(jsonData)
    return jsonData.data
} 