import http from '@/lib/http';
import { MovieListResType, MovieResType } from '@/schema/movie.schema';

type Filter = {
    query: string,
    year: string,
    type: string,
    category: string,
    country: string,
    lang: string,
    quality: string,
    actor: string,
    director: string,
    sort: number
}

const movieApiRequest = {
  filterMovie: (filter: Filter,currentPage: number) => http.get<MovieListResType>(`/api/v1/movie/filter?query=${filter.query||''}&year=${filter.year||''}&type=${filter.type||''}&category=${filter.category||''}&country=${filter.country||''}&lang=${filter.lang||''}&quality=${filter.quality||''}&actor=${filter.actor||''}&director=${filter.director||''}&sort=${filter.sort||1}&page=${currentPage||1}&limit=10`), 
  getBySlug: (slug: string) => http.get<MovieResType>(`/api/v1/movie/slug/${slug}`), 
  getLatestMovie: (currentPage: number, limit: number) => http.get<MovieListResType>(`/api/v1/movie/latest?page=${currentPage}&limit=${limit}`), 
  getMovieByType: (type: string, currentPage: number) => http.get<MovieListResType>(`/api/v1/movie/type/${type}?page=${currentPage}&limit=15`), 
  getMovieByYear: (year: string, currentPage: number) => http.get<MovieListResType>(`/api/v1/movie/year/${year}?page=${currentPage}&limit=15`), 
  getMovieByCategory: (category: string, currentPage: number) => http.get<MovieListResType>(`/api/v1/movie/category/${category}?page=${currentPage}&limit=15`), 
  getMovieByCountry: (country: string, currentPage: number) => http.get<MovieListResType>(`/api/v1/movie/country/${country}?page=${currentPage}&limit=15`), 
}

export default movieApiRequest