export type MovieListProps = {
    Search: MoviesResponseProps[]
}


export type GameListProps = {
    categories: string[]
    name: string
    image: string
    id: string
}


export type AmountListProps = {
    game: string
    amount: number
}

export type GameListResProps = {
    data: GameListProps[]
}


export type ParamsFilterProps = {
    _id: string
    title: string
    filter: string
    url: string
}


export type MoviesResponseProps = {
  Title: string
  Year: string
  imdbID: string
  Type: string
  Poster: string
  isWatch?: boolean
}

export type  MyObject = {
    id: number;
    name: string;
  };