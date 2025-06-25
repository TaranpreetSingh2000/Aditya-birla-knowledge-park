
import { pageGridData } from '@/services/primaryPage.service';

const PrimaryTeaserSection = async () => {
    const data = await pageGridData();
    console.log(data)

    return (
        <div className='flex flex-col gap-16 justify-center place-items-center'>
            <div className='flex flex-col gap-10 text-center w-1/2 mx-auto'>
                <h1 className='text-5xl text-black font-normal'>{data.teaser?.title?.titleComponent}</h1>
                <p className='font-normal text-gray-400'>{data.teaser?.description?.description}</p>
            </div>
            <div className='grid grid-cols-5 gap-14 max-w-5xl mx-auto'>
                {
                    data?.teaser?.card?.map(item => (
                        <div key={item.id} className='flex flex-col gap-3 justify-center items-center text-center'>
                            <div>
                                <img src={`${process.env.BASE_URL}${item.imagefield.url}`}
                                    alt="Image Here" className='w-10 h-10 rounded-lg' />
                            </div>
                            <h4 className='font-semibold text-black'>{item.cardTitle}</h4>
                            <p className='font-normal text-gray-400 text-sm'>{item.cardDescription
                            }</p>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}

export default PrimaryTeaserSection


// async function loader() {
//     try {
//         const path = "/api/home-page?populate[teaser][populate]=*"
//         const BASE_URL = "http://localhost:1337";
//         const url = new URL(path, BASE_URL);

//         const response = await fetch(url.href);
//         if (!response.ok) throw new Error("Network response was not ok");

//         const json = await response.json();
//         return json.data;
//     } catch (error) {
//         console.error("Failed to load teaser:", error);
//         return null;
//     }
// }

