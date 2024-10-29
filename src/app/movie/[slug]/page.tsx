import movieApiRequest from '@/api/movie';
import Layout from '@/app/(layout)/Layout';
import { baseOpenGraph } from '@/app/sharedMetadata';
import { Home } from 'lucide-react';
import Link from 'next/link';
import React from 'react';
import BreadCrumbDetail from './BreadCrumbDetail';
import Image from 'next/image';
import AccordionMovie from '@/components/movie/AccordionMovie';
import { Separator } from '@/components/ui/separator';
import { useLocale, useTranslations } from 'next-intl';

export async function generateMetadata({ params }:{ params:{ slug:string} }) {
    const movie = await movieApiRequest.getBySlug(params.slug);
    
    const url = process.env.NEXT_PUBLIC_URL + '/movie/' + movie?.payload?.movie?.mov_slug;
  
    return {
      title: movie.status===201?movie.payload?.movie?.mov_name:'',
      description: movie.status===201?movie?.payload?.movie?.content:'',
      openGraph: {
        ...baseOpenGraph,
        title: movie.status===201?`${movie?.payload?.movie?.mov_name} - ${movie?.payload?.movie?.ori_name} (${movie?.payload?.movie?.Year?.year_name})`:'',
        description: movie.status===201?movie?.payload?.movie?.content:'',
        url,
        images: [
          {
            url: movie.status===201?movie?.payload?.movie?.poster_url:''
          }
        ]
      },
      alternates: {
        canonical: url
      }
    };
}

type Props = {
    params: { slug:string }
}

export default async function DetailMovie({params}: Props) {
    const data = await movieApiRequest.getBySlug(params.slug);
    const movie = data?.payload?.movie;
    
    if (!data) {
      return (
        <div className="flex flex-col items-center justify-center h-[580px] text-white text-lg">
          <div className="flex gap-2 mb-4">
            <Home />
            <Link href="/">Trang chủ</Link>
          </div>
          <p>Không tìm thấy movie này</p>
        </div>
    )}

    const props = {
        type:{
          vi:{ label:movie?.Type?.type_name, href:movie?.Type?.type_slug },
          en:{ label:movie?.Type?.type_en_name, href:movie?.Type?.type_en_slug }
        },
        country:{
          vi:{ label:movie?.Countries[0]?.ctr_name, href:movie?.Countries[0]?.ctr_slug },
          en:{ label:movie?.Countries[0]?.ctr_en_name, href:movie?.Countries[0]?.ctr_en_slug }
        },
        data:{ 
            vi:movie?.mov_name, 
            en:movie?.ori_name }
    }

    return (
        <Layout>
            <div className="py-2">
                {/* Breadcrumb navigation */}
                <BreadCrumbDetail props={props} />
                <Separator />
                {/* Movie thumb */}
                <div className="w-full h-[200px] pt-4 sm:hidden">
                    <Image src={movie?.thumb_url} alt="poster" width={100} height={100} className="rounded-md w-full h-full object-cover" />
                </div>

                {/* Movie details section */}
                <div className="h-full border-2 p-2 rounded-xl my-4 sm:flex gap-2">
                    <MoviePoster movie={movie} />
                    <MovieInfo movie={movie} />
                </div>

                {/* Content and Episodes */}
                <div className="h-full border-2 p-2 rounded-xl my-4">
                    <AccordionMovie title="content">
                        <div dangerouslySetInnerHTML={{ __html: movie?.content }} className="text-[#909fdd] text-[12px] xl:text-[14px] 3xl:text-[23px] break-words whitespace-normal" />
                    </AccordionMovie>
                </div>
                <div className="h-full border-2 p-2 rounded-xl my-4">
                    <AccordionMovie title="list_ep">
                        <div className="flex flex-wrap justify-items-center gap-3">
                            {movie?.Episodes&&movie?.Episodes?.length>0
                                ?
                                movie?.Episodes?.map((episode) => (
                                    <Link key={episode?.ep_id} href={`/movie/${movie?.mov_slug}/ep/${episode?.ep_id}`} className="py-1 3xl:py-[10px] bg-gray-400 hover:bg-gray-500 text-center text-[12px] xl:text-[14px] 3xl:text-[20px] rounded-md w-[60px] lg:w-[80px] 3xl:w-[110px]">
                                        {episode?.ep_name}
                                    </Link>
                                ))
                                :
                                <p className="text-gray-600">Chưa có tập phim nào</p>
                            }
                        </div>
                    </AccordionMovie>
                </div>
            </div>
        </Layout>
    )
}

const MoviePoster = ({ movie }:any) => {
  const t = useTranslations('detail_movie');

  return(
    <div className="relative w-[300px] h-[350px] xl:w-[350px] xl:h-[400px] 3xl:h-[440px] sm:block hidden">
      <img src={movie?.poster_url} alt="poster" className="rounded-md w-full h-full object-cover" />
      {movie?.Episodes&&movie?.Episodes?.length>0&&
        <div className="absolute bottom-0 w-full px-2 py-1 bg-transparent backdrop-blur-lg rounded-md">
          <div className="flex justify-center">
            <Link href={`${movie?.Episodes&&movie?.Episodes?.length>0?`/movie/${movie?.mov_slug}/ep/${movie?.Episodes&&movie?.Episodes?.length>0&&movie?.Episodes[0]?.ep_id}`:''}`} className="line-clamp-1 py-1 px-4 bg-red-800 text-white text-[15px] 3xl:text-[20px] rounded-md">
                {t('button')}
            </Link>
          </div>
        </div>
      }
    </div>
)};

const MovieInfo = ({ movie }:{movie:any}) => {
  const t = useTranslations('detail_movie');
  const locale = useLocale();

  const dataTable = [
    { title: t('status'), value: movie?.episode_current },
    { title: t('ep'), value: movie?.episode_total },
    { title: t('time'), value: movie?.time },
    { title: t('year'), value: movie?movie?.Year?.year_name:'' },
    { title: t('quality'), value: movie?.quality },
    { title: t('language'), value: movie?.lang },
    { title: t('director'), value: movie?.Directors?.map((d: { dir_name: any; }) => d.dir_name).join(", ") || "Đang cập nhật" },
    { title: t('actor'), value: movie?.Actors?.map((a: { act_name: any; }) => a.act_name).join(", ") || "Đang cập nhật" },
    { title: t('type'), value: locale==='vi'?movie?.Type?.type_name:movie?.Type?.type_en_name },
    { title: t('country'), value: locale==='vi'?movie?.Countries[0]?.ctr_name:movie?.Countries[0]?.ctr_en_name }
  ];

  return(
    <div className="w-full p-2 rounded-md bg-opacity-30 backdrop-blur">
      <div className="text-center border-b mr-2 pb-2">
          <p className={`${locale==='vi'?'':'mb-[25px]'} line-clamp-2 font-bold text-[#8b5cf6] text-[13px] md:text-[14px] xl:text-[16px] 3xl:text-[20px]`}>{locale==='vi'?movie?.mov_name.toUpperCase():movie?.ori_name.toUpperCase()}</p>
          <span className={`${locale==='vi'?'block':'hidden'} line-clamp-2 font-normal text-[#1496d5] text-[12px] md:text-[13px] xl:text-[15px] 3xl:text-[19px]`}>{movie?.ori_name}</span>
      </div>
      <div className="flex flex-col gap-1 pr-2">
        {dataTable.map(({ title, value }) => (
          <div key={title}>
            <div className="flex gap-5 py-[2px] border-b">
              <div className="w-[160px] line-clamp-1 text-[#1496d5] font-medium text-[14px] xl:text-[16px] 3xl:text-[19px]">{title}</div>
              <div className="w-full line-clamp-1 text-[#909fdd] text-[14px] xl:text-[16px] 3xl:text-[19px]">{value?value:"Đang cập nhật"}</div>
            </div>
          </div>
        ))}
        <div className="w-full text-center mt-2 bg-transparent backdrop-blur-lg rounded-md sm:hidden">
          <Link href={`${movie?.Episodes&&movie?.Episodes?.length>0?`/movie/${movie?.mov_slug}/ep/${movie?.Episodes&&movie?.Episodes?.length>0&&movie?.Episodes[0]?.ep_id}`:''}`} className="line-clamp-1 py-1 px-4 bg-red-800 text-white text-[14px] rounded-md">
            {t('button')}
          </Link>
        </div>
      </div>
    </div>
  )
}