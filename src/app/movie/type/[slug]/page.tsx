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
  const type = await dataApiRequest.getTypeBySlug(params.slug);

  const url = process.env.NEXT_PUBLIC_URL + '/movie/' + params.slug;

  return {
    title: `${type?.payload?.type?.type_name||'Phim'} hay nhất - Cập nhật nhanh chóng tại PhimVip.com`,
    description: "Thưởng thức các bộ phim truyền hình hấp dẫn, đa dạng thể loại với chất lượng cao tại PhimVip.com. Cập nhật phim bộ mới liên tục và không quảng cáo, mang đến trải nghiệm xem phim tuyệt vời.",
    openGraph: {
      ...baseOpenGraph,
      title: `${type?.payload?.type?.type_name||'Phim'} hay nhất - Cập nhật nhanh chóng tại PhimVip.com`,
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

export default async function Type({ params, searchParams }: { params: { slug:string }, searchParams:{ page:string } }) {
  const data = await dataApiRequest.getType();
  const movies = await movieApiRequest.getMovieByType(params.slug, parseInt(searchParams.page)||1);
  
  const type = data?.payload?.types?.filter( t => t.type_slug === params.slug || t.type_en_slug === params.slug);
  
  return (
    <Layout>
      <BreadCrumbComponent typeParam={type[0]}/>
      <TableHeader totalMovie={movies?.payload?.totalMovies}/>
      <TableMovie movies={movies?.payload?.movies}/>
      <TableFooter currentPage={parseInt(searchParams.page)||1} totalPage={movies?.payload?.totalPages}/>
      <Paginations currentPage={parseInt(searchParams.page)||1} totalPages={movies?.payload?.totalPages||1}/>
    </Layout>
  )
}

interface Type {
  status: boolean;
  createdAt: Date;
  updatedAt: Date;
  type_id: number;
  type_name: string;
  type_slug: string;
  type_en_name: string;
  type_en_slug: string;
}

function BreadCrumbComponent({typeParam}:{typeParam:Type}) {
  return <BreadCrumb data={typeParam?.type_name} dataEn={typeParam?.type_en_name}/>
}

function TableHeader({totalMovie}:{totalMovie:number}) {
  const pagination = useTranslations('pagination');
  return <p className=" text-[10px] sm:text-[12px] 2xl:text-[14px] my-[10px]"><strong>{totalMovie}</strong> {pagination('result')}</p>
}

function TableFooter({currentPage, totalPage}:{currentPage:number;totalPage:number}) {
  const pagination = useTranslations('pagination');
  return <p className=" text-[10px] sm:text-[12px] 2xl:text-[14px] my-[10px]">{pagination('page')} <strong>{currentPage}</strong> | {pagination('total')} <strong>{totalPage}</strong> {pagination('page')}</p>
}