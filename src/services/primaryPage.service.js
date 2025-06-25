
export async function pageGridData() {
    const response = await fetch(process.env.BASE_URL + '/api/home-page?populate[teaser][populate][title]=*&populate[teaser][populate][description]=*&populate[teaser][populate][card][populate]=*'
    );
    const jsonData = await response.json();
    return jsonData.data;
    
}