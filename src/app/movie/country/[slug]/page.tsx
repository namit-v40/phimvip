import dataApiRequest from '@/api/data';
import movieApiRequest from '@/api/movie';
import Layout from '@/app/(layout)/Layout';
import TableMovie from '@/components/movie/TableMovie';
import Paginations from '@/components/pagination/Paginations';
import { useTranslations } from 'next-intl';
import React from 'react';
import BreadCrumb from '../../BreadCrumb';
import { baseOpenGraph } from '@/app/sharedMetadata';

export async function generateMetadata({ params }:{ params:{ slug:string} }) {
  const country = await dataApiRequest.getCountryBySlug(params.slug);

  const url = process.env.NEXT_PUBLIC_URL + '/movie/' + params.slug;

  return {
    title: `${country?.payload?.country?.ctr_name||'Phim'} hay nhất - Cập nhật nhanh chóng tại PhimVip.com`,
    description: "Thưởng thức các bộ phim truyền hình hấp dẫn, đa dạng thể loại với chất lượng cao tại PhimVip.com. Cập nhật phim bộ mới liên tục và không quảng cáo, mang đến trải nghiệm xem phim tuyệt vời.",
    openGraph: {
      ...baseOpenGraph,
      title: `${country?.payload?.country?.ctr_name||'Phim'} hay nhất - Cập nhật nhanh chóng tại PhimVip.com`,
      description: "Thưởng thức các bộ phim truyền hình hấp dẫn, đa dạng thể loại với chất lượng cao tại PhimVip.com. Cập nhật phim bộ mới liên tục và không quảng cáo, mang đến trải nghiệm xem phim tuyệt vời.",
      url,
      images: [
        {
          url: '/images/logo.png'
        }
      ]
    },
    alternates: {
      canonical: url
    }
  };
}

export default async function Country({ params, searchParams }: { params: { slug:string }, searchParams:{ page:string } }) {
  const data = await dataApiRequest.getCountry();
  const movies = await movieApiRequest.getMovieByCountry(params.slug, parseInt(searchParams.page)||1);
  
  const country = data?.payload?.countries?.filter( c => c.ctr_slug === params.slug || c.ctr_en_slug === params.slug);
  
  return (
    <Layout>
      <BreadCrumbComponent ctrParam={country[0]}/>
      <TableHeader totalMovie={movies?.payload?.totalMovies}/>
      <TableMovie movies={movies?.payload?.movies}/>
      <TableFooter currentPage={parseInt(searchParams.page)||1} totalPage={movies?.payload?.totalPages}/>
      <Paginations currentPage={parseInt(searchParams.page)||1} totalPages={movies?.payload?.totalPages||1}/>
    </Layout>
  )
}

interface Country {
  status: boolean;
  ctr_id: number;
  ctr_name: string;
  ctr_slug: string;
  ctr_en_name: string;
  ctr_en_slug: string;
  createdAt: Date;
  updatedAt: Date;
}

function BreadCrumbComponent({ctrParam}:{ctrParam:Country}) {
  return <BreadCrumb data={ctrParam?.ctr_name} dataEn={ctrParam?.ctr_en_name}/>
}

function TableHeader({totalMovie}:{totalMovie:number}) {
  const pagination = useTranslations('pagination');
  return <p className=" text-[10px] sm:text-[12px] 2xl:text-[14px] my-[10px]"><strong>{totalMovie}</strong> {pagination('result')}</p>
}

function TableFooter({currentPage, totalPage}:{currentPage:number;totalPage:number}) {
  const pagination = useTranslations('pagination');
  return <p className=" text-[10px] sm:text-[12px] 2xl:text-[14px] my-[10px]">{pagination('page')} <strong>{currentPage}</strong> | {pagination('total')} <strong>{totalPage}</strong> {pagination('page')}</p>
}