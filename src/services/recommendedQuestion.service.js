export const fetchRecommendationOptions = async () => {
    const res = await fetch(process.env.NEXT_PUBLIC_BASE_URL + "/api/products-recommendation-engines?populate=*");
    if (!res.ok) throw new Error("Failed to fetch options");
    return await res.json();
};

export async function recommendedProduct() {
    const response = await fetch(process.env.NEXT_PUBLIC_BASE_URL + '/api/recommended-questions?populate=*'
    );
    const jsonData = await response.json();
    return jsonData;

}


