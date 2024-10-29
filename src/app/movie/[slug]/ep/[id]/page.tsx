import movieApiRequest from '@/api/movie';
import Layout from '@/app/(layout)/Layout';
import { baseOpenGraph } from '@/app/sharedMetadata';
import ListEpisode from '@/components/episode/ListEpisode';
import MovieHot from '@/components/episode/MovieHot';
import VideoPlayer from '@/components/episode/VideoPlayer';
import { Home } from 'lucide-react';
import Link from 'next/link';
import React from 'react';
import BreadCrumbEpisode from './BreadCrumbEpisode';
import CarouselMovie from '@/components/movie/CarouselMovie';

export async function generateMetadata({ params }:{ params:{ slug:string; id:string } }) {
    const data = await movieApiRequest.getBySlug(params.slug);
    const movie = data?.payload?.movie;
    const currentEp = data?.payload?.movie?.Episodes.find((ep) => ep.ep_id === parseInt(params.id));

    const url = process.env.NEXT_PUBLIC_FRONTEND_URL + '/movie/' + params.slug + '/ep/' + params.id;
  
    return {
      title: currentEp?.ep_title,
      description: movie?.content,
      openGraph: {
        ...baseOpenGraph,
        title: movie?`${movie?.mov_name} - ${movie?.ori_name} (${movie?.Year.year_name}) - ${currentEp?.ep_name}`:'',
        description: movie?.content,
        url,
        images: [
          {
            url: movie?.poster_url
          }
        ]
      },
      alternates: {
        canonical: url
      }
    };
}

type Props = {
    params: { id:string; slug:string}
}

export default async function page({ params }: Props) {
    const data = await movieApiRequest.getBySlug(params.slug);
    const dataMovieHot = await movieApiRequest.getLatestMovie(1,20);

    const movie = data?.payload?.movie;

    const movieHot = dataMovieHot?.payload?.movies;

    const episodes = movie?.Episodes;
    const currentEp = movie?.Episodes.find((ep) => ep.ep_id === parseInt(params.id));

    const props = {
        type:{
          vi:{ label:movie?.Type?.type_name, href:movie?.Type?.type_slug },
          en:{ label:movie?.Type?.type_en_name, href:movie?.Type?.type_en_slug }
        },
        country:{
          vi:{ label:movie?.Countries[0]?.ctr_name, href:movie?.Countries[0]?.ctr_slug },
          en:{ label:movie?.Countries[0]?.ctr_en_name, href:movie?.Countries[0]?.ctr_en_slug }
        },
        movie:{
            vi:{ label:movie?.mov_name, href:movie?.mov_slug },
            en:{ label:movie?.ori_name, href:movie?.mov_slug }
        },
        data: currentEp?.ep_title
    }
    
    return (
        <Layout>
            {!movie || !currentEp
            ?
                <div className="flex flex-col items-center justify-center h-[580px] text-white text-lg">
                    <div className="flex gap-2 mb-4">
                        <Home />
                        <Link href="/">Trang chủ</Link>
                    </div>
                    <p>Không tìm thấy movie này</p>
                </div>
            :
                <div className="py-2 px-0 lg:px-4 2xl:px-40">
                    {/* Breadcrumb navigation */}
                    <BreadCrumbEpisode props={props}/>

                    {/* Video and Episode list */}
                    <div className="h-full p-2 rounded-xl my-4">
                        <div className="flex flex-col items-center gap-2 h-full">
                            {/* view to watch movie */}
                            <div className="w-full h-full">
                                <VideoPlayer videoUrl={currentEp.link_m3u8} />
                            </div>

                            <div className="w-full rounded-lg">
                                <div className="py-[2px] px-4 border-l-4 mb-2">
                                <h2 className="font-bold text-[15px] 3xl:text-[23px]">THÔNG TIN PHIM</h2>
                                </div>
                                <img className="block md:hidden rounded-md h-[170px] w-full object-cover mb-4" src={movie.thumb_url} alt="" />
                                <div className="flex gap-3">
                                    <img className="hidden md:block sm:h-[200px] sm:w-[150px] 3xl:h-[300px] 3xl:w-[200px] rounded-md" src={movie.poster_url} alt="" />
                                    
                                    <div>
                                    <h2 className="font-medium text-[15px] xl:text-[17px] 3xl:text-[23px]">{movie?movie.mov_name:'Đang cập nhật'}</h2>
                                    <p className="text-[13px] xl:text-[15px] 3xl:text-[20px]">Trạng thái: {movie?movie.lang:'Đang cập nhật'}</p>
                                    <p className="text-[13px] xl:text-[15px] 3xl:text-[20px]">Quốc gia: {movie&&movie.Countries.length>0?movie.Countries[0].ctr_name:'Đang cập nhật'}</p>
                                    <p className="text-[13px] xl:text-[15px] 3xl:text-[20px]">Thời gian: {movie?movie.time:'Đang cập nhật'}</p>
                                    <p className="text-[13px] xl:text-[15px] 3xl:text-[20px]">Năm: {movie&&movie.Year?movie.Year.year_name:'Đang cập nhật'}</p>
                                    <p className="text-[13px] xl:text-[15px] 3xl:text-[20px]">Thể loại: {movie&&movie.Categories.length>0?movie.Categories.map(cat=>cat.cat_name).join(" - "):'Đang cập nhật'}</p>
                                    <p className="text-[13px] xl:text-[15px] 3xl:text-[20px]">Diễn viên: {movie&&movie.Actors.length>0?movie.Actors.map(act=>act.act_name).join(" - "):'Đang cập nhật'}</p>
                                    </div>
                                </div>
                                <div className="mt-2">
                                <h2 className="font-medium text-[15px] 2xl:text-[17px]">Nội dung phim</h2>
                                <p dangerouslySetInnerHTML={{ __html: movie.content }} className="text-[13px] xl:text-[15px] 3xl:text-[20px] break-words whitespace-normal"/>
                                </div>
                            </div>

                            {/* Show list episode */}
                            <ListEpisode slug={params.slug} episodes={episodes} currentEpId={params.id}/>
                             
                            {/* Movie hot */}
                            <div className="w-full rounded-lg">
                                <div className="py-[2px] px-4 border-l-4 mb-2">
                                    <h2 className="text-[15px] xl:text-[17px] 3xl:text-[23px] font-semibold">PHIM MỚI NHẤT</h2>
                                </div>
                                <CarouselMovie movies={movieHot}/>
                            </div>
                        </div>
                    </div>
                </div>
            }
        </Layout>
    )
}