import React from 'react'
import Image from 'next/image'

const ImageInfoSection = () => {
    return (
        <div>
            <div className='flex flex-row gap-10 py-6'>
                <div className='w-1/2'>
                    <img src="/img-8.jpg"
                        alt="Info Image"
                        className="object-cover rounded-r-full h-full" />
                </div>
                <div className='w-1/2 py-4 flex flex-col justify-center gap-6'>
                    <h2 className='text-4xl font-bold'>the experience.</h2>
                    <p className='text-slate-400 pr-10'>
                        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Repellendus ea reprehenderit sequi, qui esse assumenda. Provident architecto totam corporis nulla ut velit nostrum tenetur nobis accusamus consequuntur!
                        Recusandae illo officia, est excepturi ullam eveniet sapiente omnis quae illum nesciunt! Voluptatibus modi, laborum asperiores architecto distinctio sed voluptatem magnam vitae ex cupiditate unde molestiae omnis impedit nisi exercitationem! Eum iure voluptatem ducimus veritatis rerum voluptates repellendus sit esse laudantium porro velit eius, ipsa nobis, placeat minus dignissimos!
                        Ipsam autem eius similique numquam illo ex deserunt eum natus dolor et quis sequi laborum, harum non rem rerum dicta! Perspiciatis quis provident ipsam?

                    </p>
                    <button className='w-32 text-white px-4 py-2 bg-amber-500 rounded-3xl backdrop-blur-lg shadow-md'>BOOK NOW</button>
                </div>
            </div>
        </div>
    )
}

export default ImageInfoSection