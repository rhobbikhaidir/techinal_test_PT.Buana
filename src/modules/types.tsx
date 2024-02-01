export type MovieListProps = {
    Search: MoviesResponseProps[]
}
export type ParamProps = {
    name: string
    language: string
    key: string
    id: string
  }

export type DetailMovieProps = {
    Title: string
    Year: string
    Rated: string
    Released: string
    Runtime: string
    Genre: string
    Director: string,
    Writer: string
    Actors: string
    Plot: string
    Language: string
    Country: string
    Awards: string
    Poster: string
    Ratings: RatingProps[]
    Metascore: string
    imdbRating: string
    imdbVotes: string
    imdbID: string
    Type: string
    DVD: string
    BoxOffice: string
    Production: string
    Website: string
    Response: string
}

export type RatingProps = {
    Source: string
    Value: string
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