import React from 'react'
// import Sekeleton from 'components/Sekeleton'
import { IconBack } from 'assets/icons'
import { useGetDetailMoviesMutation } from 'store/api'

const DetailPage = () => {
    const[getDetailMovies, detailMovies] = useGetDetailMoviesMutation()

    React.useEffect(() => {
      getDetailMovies('')
    }, [])
    console.log(detailMovies, 'detailMovies')
  return (
    <div className=' flex flex-col py-4 px-8'>
      <div className='flex flex-row items-center cursor-pointer'>
        <IconBack />
        <p className='pl-2 text-[#000] font-bold text-lg'>Back</p>
      </div>

      <main className='flex flex-col py-10 px-10 '>
        <div className='py-4'>
          <h1 className='text-2xl text-gray-600'>Detail Page</h1>
        </div>

        <div className='flex flex-row items-start justify-around space-x-4'>
          <div className='bg-slate-700 h-80 w-80' />
          <div className='flex-1 space-y-6 py-1'>
            <div className='space-y-3'>
              <div className='h-2 bg-slate-700 rounded' />
            </div>
          </div>
        </div>
        {/* <Sekeleton /> */}
      </main>
    </div>
  )
}

export default DetailPage
