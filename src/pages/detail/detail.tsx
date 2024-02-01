import React from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import Sekeleton from 'components/Sekeleton'
import { IconBack } from 'assets/icons'
import { useGetDetailMoviesMutation } from 'store/api'
import type { ParamProps } from 'modules/types'

const DetailPage = () => {
  const navigate = useNavigate()
  const param = useParams<ParamProps>()
  const [getDetailMovies, detailMovies] = useGetDetailMoviesMutation()
  const labelDetail = ['Country', 'Runtime', 'Actor', 'Director', 'Genre', 'Published', 'Writer']

  React.useEffect(() => {
    getDetailMovies(param.id || '')
  }, [])

  const Country = (detailMovies.data && detailMovies.data.Country) || ''
  const Runtime = (detailMovies.data && detailMovies.data.Runtime) || ''
  const Actors = (detailMovies.data && detailMovies.data.Actors) || ''
  const Director = (detailMovies.data && detailMovies.data.Director) || ''
  const Genre = (detailMovies.data && detailMovies.data.Genre) || ''
  const Released = (detailMovies.data && detailMovies.data.Released) || ''
  const Writer = (detailMovies.data && detailMovies.data.Writer) || ''

  const valueDetail = [Country, Runtime, Actors, Director, Genre, Released, Writer]

  return (
    <div className=' flex flex-col py-4 px-8'>
      <div className='flex flex-row items-center cursor-pointer' onClick={() => navigate(-1)}>
        <IconBack />
        <p className='pl-2 text-[#000] font-bold text-lg'>Back</p>
      </div>
      <main className='flex flex-col py-10 px-10 '>
        <div className='py-4'>
          <h1 className='text-2xl text-gray-600'>Detail Page</h1>
        </div>
        <div className='border border-gray-300 shadow rounded-md h-full p-5 bg'>
          {!detailMovies.isLoading && detailMovies.isSuccess && detailMovies.data && (
            <div className='flex flex-row items-start justify-around space-x-4'>
              <div className='w-80 bg-red-400'>
                <img
                  src={detailMovies.data.Poster}
                  alt={detailMovies.data.Poster}
                  className='w-full rounded-sm'
                />
              </div>
              <div className='flex-1  space-y-6 py-1'>
                <div className='space-y-3'>
                  <h1 className='text-gray-700 text-xl'> {detailMovies.data.Title}</h1>
                  <div className='flex flex-row '>
                    <div className='flex flex-col items-start px-2 space-y-2'>
                      {labelDetail.map((item, idx) => (
                        <p className='text-[#333] text-md' key={idx}>
                          {item}
                        </p>
                      ))}
                    </div>
                    <div className='flex flex-col items-start px-2 space-y-2'>
                      {valueDetail?.map((item, idx) => (
                        <p className='text-[#e50a4a] text-md' key={idx}>
                          {item}
                        </p>
                      ))}
                    </div>
                  </div>
                </div>
                <div className='flex flex-col items-start px-2'>
                  <h1 className='text-[#e50a4a] text-lg'>Plot</h1>
                  <p className='text-md text-black'> {detailMovies.data.Plot}</p>
                </div>

                <div className='flex flex-row items-end flex-1 self-stretch justify-end mr-14'>
                  <button className='p-2 bg-[#2596be] rounded-sm text-md text-white items-end' onClick={() => navigate(-1)}>
                    Back to Home
                  </button>
                </div>
              </div>
            </div>
          )}
          {detailMovies.isLoading && <Sekeleton />}
        </div>
      </main>
    </div>
  )
}

export default DetailPage
