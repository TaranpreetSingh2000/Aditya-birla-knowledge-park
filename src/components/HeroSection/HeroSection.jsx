import React from 'react'
import Image from "next/image";
import { homepage } from '@/services/homepage.service';

// const BASE_URL = "http://localhost:1336";
// async function loader() {
//     const response = await fetch(BASE_URL + '/api/home?populate[blocks][populate]=*&populate[blocks2][populate]=*')
//     const jsonData = await response.json()
//     return jsonData.data
// }

const HeroSection = async () => {
    const data = await homepage()
    // console.log(data)

    console.log("hero section data: ", data.blocks)
    return (
        <div className="relative w-full">
            <img
                src={`http://localhost:1336${data.blocks.image.url}`}
                alt="Hero Background"
                className="object-cover"
            />
            <div className="absolute top-6 left-1/2 transform -translate-x-1/2 w-[90%] flex flex-row items-center justify-between">
                <img
                    src="/vercel.svg"
                    alt="Logo"
                    className="object-contain w-10 h-10"
                />
                <ul className='flex flex-row gap-16 relative top-1/2 text-white'>
                    <li>the camp.</li>
                    <li>the experience.</li>
                    <li>the blog.</li>
                </ul>
                <button className='text-white px-4 py-2 bg-black border-2 border-white rounded-3xl'>BOOK NOW</button>
            </div>
            <div className='flex flex-col gap-5 absolute top-1/3 left-16'>
                <h2 className='text-white text-7xl font-bold'>barrel.</h2>
                <h2 className='text-white text-7xl font-bold'>your.</h2>
                <h2 className='text-white text-7xl font-bold'>happiness.</h2>
                <button className='mt-5 text-white w-32 px-4 py-2 bg-sky-600 rounded-3xl backdrop-blur-lg shadow-md'>BOOK NOW</button>
            </div>
        </div>
    )
}

export default HeroSection