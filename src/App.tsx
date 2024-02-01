import { useEffect, useState } from 'react'
import './App.css'
import type {  MoviesResponseProps } from 'modules/types'
import { useGetListMoviesMutation } from './store/api'
import cornerRibbon from './assets/corner-top-right-ribbon.png'

function App() {
  const [getListMovies, movies] = useGetListMoviesMutation()
  const [menu, setMenu] = useState<MoviesResponseProps[]>((movies.data && movies.data?.Search) || [])
  useEffect(() => {
    getListMovies('avengers')
      .unwrap()
      .then((res) => {
        localStorage.setItem('listMovies', JSON.stringify(res.Search))
        setMenu(res.Search)
      })
  }, [])
  console.log(menu)
  console.log(movies.data, 'dadaaata')


  return (
    <div>
      <div className=' flex flex-col py-4 px-8'>
        <div className='flex flex-row  items-center'>
          <h1 className='text-2xl text-[#2596be] px-6 '>Search Movies</h1>
          <div className={`relative w-[327px] h-[51px]`}>
            <input
              placeholder='Search Title Movie'
              type='text'
              className={`w-[327px] h-[40px] p-2 rounded-sm text-black focus:border-none border-gray-400 border-[1px]`}
            />
            <button className='bg-[#2596be] absolute top-0 right-0 px-3 flex items-center text-sm leading-5 text-white  cursor-pointer border-l-[1px] border-gray-400 h-[40px]'>
              Search
            </button>
          </div>
        </div>
      </div>
      <main className='py-3 flex flex-col items-center px-3'>
        <div className='grid grid-cols-1 gap-1 sm:grid-cols-2 sm:gap-1  md:grid-cols-3 md:gap-2  lg:grid lg:grid-cols-5 lg:gap-4'>
          {movies.isLoading ||
            (false && (
              <div className='inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] text-info motion-reduce:animate-[spin_1.5s_linear_infinite]'>
                <span className='!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]'>
                  Loading...
                </span>
              </div>
            ))}
          {movies.isSuccess &&
            movies.data &&
            movies.data?.Search?.map((res, index) => (
              <div
                key={index}
                className='relative group mr-2 border-[1px] border-gray-400 rounded-sm'
              >
                <img src={res.Poster} alt={res.Poster} className='rounded-sm h-[300px] w-[270px]' />
                {res.isWatch && (
                  <div className='bg-transparent w-[120px] absolute top-[-8px] right-[-27px]'>
                    <img className='w-[100px] h-auto' src={cornerRibbon} alt='corner-ribbon' />
                  </div>
                )}
                <div className='flex flex-col items-start p-2'>
                  <h1 className='text-black text-md font-semibold '>Avanger</h1>
                  <h3 className='text-black my-1 '>2021 </h3>
                  <button className='p-2 bg-[#2596be] rounded-sm text-md text-white'>
                    Show Detail
                  </button>
                </div>
              </div>
            ))}
        </div>
      </main>
    </div>
  )
}
export default App
