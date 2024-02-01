import React, { useEffect, useState } from 'react'
import { ToastContainer, toast } from 'react-toastify'
import type { MoviesResponseProps } from 'modules/types'
import { useGetListMoviesMutation } from 'store/api'
import cornerRibbon from 'assets/corner-top-right-ribbon.png'
import useNetwork from 'modules/useNetwork'
import Loading from 'components/Loading'
import { IconLoading } from 'assets/icons'
import "react-toastify/dist/ReactToastify.css";

const Home = () => {
  const [getListMovies, movies] = useGetListMoviesMutation()
  const isOnline = useNetwork()
  const [menu, setMenu] = useState<MoviesResponseProps[]>(
    (movies.data && movies.data?.Search) || []
  )
  const [search, setSearch] = useState<string>('')
  const [Imdbid, setImdbid] = useState<string>('')
  const [loading, setLoading] = useState<boolean>(false)

  useEffect(() => {
    if (!menu?.length && isOnline) {
      getListMovies('avengers')
        .unwrap()
        .then((res) => {
          const formatRes = res?.Search?.map((res) => ({ ...res, isWatch: false }))
          localStorage.setItem('listMovies', JSON.stringify(formatRes))
          setMenu(formatRes)
        })
    }

    const listMovies = localStorage.getItem('listMovies') || []
    if (listMovies && !isOnline) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const checkMovies: any = listMovies ? listMovies : []
      console.log(listMovies, 'blblla')

      if (checkMovies !== undefined) {
        const formatMovies = checkMovies?.length ? JSON.parse(checkMovies) : []
        setMenu(formatMovies)
      }
    }
  }, [isOnline])

  const handleSearch = () => {
    if (!search.trim()) {
        toast.error('Input Cannot be empty', {
          position: 'top-right'
        })
        return
      }
    if (!isOnline) {
      toast.error('you are offline, please connect the internet', {
        position: 'top-right'
      })
      return
    }
    getListMovies(search)
      .unwrap()
      .then((res) => {
        localStorage.setItem('listMovies', JSON.stringify(res.Search))
        setMenu(res.Search)
      })
  }

  const onDetailPage = (param: MoviesResponseProps) => {
 
    if (!isOnline) {
      toast.error('you are offline, please connect the internet', {
        position: 'top-right'
      })
      return
    }
    setLoading(true)
    setImdbid(param.imdbID)

    const newObj: MoviesResponseProps = { ...param, isWatch: true }

    const newMenu = menu.map((item) => (item.imdbID === newObj.imdbID ? newObj : item))
    setMenu(newMenu)
    localStorage.setItem('listMovies', JSON.stringify(newMenu))
  }

  return (
    <div>
      <div className=' flex flex-col py-4 px-8'>
        <div className='flex flex-row  items-center'>
          <h1 className='text-2xl text-[#2596be] px-6 '>Search Movies</h1>
          <div className={`relative w-[327px] h-[51px]`}>
            <input
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  handleSearch()
                }
              }}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder='Search Title Movie'
              type='text'
              className={`w-[327px] h-[40px] p-2 rounded-sm text-black focus:border-none border-gray-400 border-[1px]`}
            />
            <button
              onClick={handleSearch}
              className='bg-[#2596be] absolute top-0 right-0 px-3 flex items-center text-sm leading-5 text-white  cursor-pointer border-l-[1px] border-gray-400 h-[40px] w-[67px]'
            >
              {movies.isLoading ? (
                <div className='flex flex-row items-center'>
                  <span className='text-sm pr-1'>Wait</span>
                  <IconLoading />
                </div>
              ) : (
                'Search'
              )}
            </button>
          </div>
        </div>
      </div>

      <main className='py-3 flex flex-col items-center px-3'>
        {!movies.isLoading && !menu?.length && (
          <p className='text-2xl text-black'>Movies Not Found</p>
        )}
        {movies.isLoading && <Loading />}

        <div className='grid grid-cols-1 gap-1 sm:grid-cols-2 sm:gap-1  md:grid-cols-3 md:gap-2  lg:grid lg:grid-cols-5 lg:gap-4'>
          {menu &&
            !movies.isLoading &&
            menu.map((res, index) => (
              <div
                key={index}
                className='relative group mr-2 border-[1px] border-gray-400 rounded-sm'
              >
                <img src={res.Poster} alt={res.Poster} className='rounded-sm h-[300px] w-full' />
                {res.isWatch && (
                  <div className='bg-transparent w-[120px] absolute top-[-8px] right-[-27px]'>
                    <img className='w-[100px] h-auto' src={cornerRibbon} alt='corner-ribbon' />
                  </div>
                )}
                <div className='flex flex-col items-start p-2 '>
                  <h1 className='text-black text-md font-semibold '>{res.Title}</h1>
                  <h3 className='text-black my-1 '>{res.Year}</h3>
                  <button
                    className='p-2 bg-[#2596be] rounded-sm text-md text-white w-[110px] h-[39px] items-end'
                    onClick={onDetailPage.bind(null, res)}
                  >
                    {loading && res.imdbID === Imdbid ? (
                      <div className='flex flex-row items-center'>
                        <span className='text-md pr-2'>Loading ..</span>
                        <IconLoading />
                      </div>
                    ) : (
                      'Show Detail'
                    )}
                  </button>
                </div>
              </div>
            ))}
        </div>
        <ToastContainer />
      </main>
    </div>
  )
}

export default Home
