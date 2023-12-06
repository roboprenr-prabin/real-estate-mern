import React from 'react'

export default function CreateListing() {
  return (
    <main className='p-3 max-w-4xl mx-auto'>
        <h1 className='text-3xl font-semibold text-center my-7'>Create a Listing</h1>

        <form className='flex flex-col gap-4 sm:flex-row'>
            <div className="flex flex-col gap-4 flex-1">
                <input type="text" placeholder='Name' className='border p-3 rounded-lg' id='name' maxLength={62} minLength={10} required/>
                <textarea type="text" placeholder='Description' className='border p-3 rounded-lg' id='description' required/>
                <input type="text" placeholder='Address' className='border p-3 rounded-lg' id='address' required/>
                <div className='flex gap-6 flex-wrap'>
                    <div className="flex gap-2">
                        <input className='w-5' type="checkbox" name="" id="sale" />
                        <span>Sell</span>
                    </div>
                    <div className="flex gap-2">
                        <input className='w-5' type="checkbox" name="" id="rent" />
                        <span>Rent</span>
                    </div>
                    <div className="flex gap-2">
                        <input className='w-5' type="checkbox" name="" id="parking" />
                        <span>Parking Spot</span>
                    </div>
                    <div className="flex gap-2">
                        <input className='w-5' type="checkbox" name="" id="furnished" />
                        <span>Furnished</span>
                    </div>
                    <div className="flex gap-2">
                        <input className='w-5' type="checkbox" name="" id="offer"/>
                        <span>Offer</span>
                    </div>
                </div>
                <div className="flex flex-wrap gap-3">
                    <div className="flex items-center gap-2">
                        <input type="number" name="" id="bedrooms" max={10} min={1} required className='p-3 border border-grey-300 rounded-lg'/>
                        <p>Beds</p>
                    </div>
                    <div className="flex items-center gap-2">
                        <input type="number" name="" id="bathrooms" max={10} min={1} required className='p-3 border border-grey-300 rounded-lg'/>
                        <p>Baths</p>
                    </div>
                    <div className="flex items-center gap-2">
                        <input type="number" name="" id="regularPrice" min={1} required className='p-3 border border-grey-300 rounded-lg'/>
                        <div className='flex flex-col items-center'>
                            <p>Regular Price</p>
                            <span className='text-xs'>($ / Month)</span>
                        </div>
                    </div>
                    <div className="flex items-center gap-2">
                        <input type="number" name="" id="discountPrice" min={1} required className='p-3 border border-grey-300 rounded-lg'/>
                        <div className='flex flex-col items-center'>
                            <p>Discount Price</p>
                            <span className='text-xs'>($ / Month)</span>
                        </div>
                    </div>
                </div>
            </div>
            <div className="flex flex-col gap-3 flex-1">
                <p className='font-semibold'>Images: <span className='font-normal text-gray-700'>The first image will be the cover (max 6)</span></p>

                <div className="flex gap-4">
                    <input className='p-3 border border-gray-300 rounded w-full' type="file" id='images' accept='image/*' multiple/>
                    <button className='p-3 text-green-700 border border-green-700 rounded uppercase hover:shadow-lg disabled:opacity-80'>Upload</button>
                </div>
                <button className='bg-slate-700 p-3 text-white rounded-lg uppercase hover:opacity-95 disabled:opacity-80'>Create Listing</button>
            </div>

        </form>
    </main>
  )
}
