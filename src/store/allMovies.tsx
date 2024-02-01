import { createSlice } from '@reduxjs/toolkit'
import type { AllMoviesProps } from 'modules/types'

const initialState: AllMoviesProps = {
  allMovies: []
}

const AllMovieSlice = createSlice({
  name: 'allMovieSlice',
  initialState,
  reducers: {
    getAllMovies: (state, action) => (state = action.payload)
  }
})

export const { getAllMovies } = AllMovieSlice.actions
export default AllMovieSlice.reducer
