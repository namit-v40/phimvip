import http from '@/lib/http';
import { EpisodeListResType, EpisodeResType } from '@/schema/episode.schema';

const episodeApiRequest = {
  getByid: (id: number) => http.get<EpisodeResType>(`/api/v1/episode/${id}`),
  getByMovieid: (mov_id: number) => http.get<EpisodeListResType>(`/api/v1/episode/mv/${mov_id}`),
}

export default episodeApiRequest