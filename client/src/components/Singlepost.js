import React from 'react'

const Singlepost = () => {
  return (
    <div className='flex flex-col md:flex-row justify-center items-center md:items-start max-w-screen px-8 md:px-32 mt-8 overflow-x-hidden'>
        <img src='https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80' 
        alt='header img' className='h-full md:max-h-56 rounded-lg mx-0 md:mx-4'></img>
        <div className='my-4 md:my-0'>
            <div>
        <h2 className='Heading text-2xl font-semibold '>Here is why Digital Services Coordinators should establish strong research and data units</h2>
        <p className='info'>
            <a href='/' className='author font-bold text-gray-600 mr-2 text-sm'>John Doe</a>
            <time className='text-sm'>2023-03-19 21:58</time>
        </p>
            </div>
        <div>
        <p className='paragraph text-base  my-4 line-clamp-4'>In this blogpost, Julian Jaursch explains why Digital Services Coordinators should establish strong research and data units. To detect and mitigate infringements of the Digital Services Act (DSA), member states’ Digital Services Coordinators (DSCs) need a deep understanding of how platforms work and what potential risks are associated with them.Julian Jaursch explains why Digital Services Coordinators should establish strong research and data units. To detect and mitigate infringements of the Digital Services Act (DSA), member states’ Digital Services Coordinators (DSCs) need a deep understanding of how platforms work and what potential risks are associated with them.</p>
        </div>
        <div className='load-more border border-gray-700 w-28 rounded-sm text-center  py-2 bg-white hover:bg-zinc-900 hover:text-white cursor-pointer'>Read More</div>
        </div>
        </div>
  )
}

export default Singlepost