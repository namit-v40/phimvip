import movieApiRequest from '@/api/movie';
import Layout from '@/app/(layout)/Layout';
import TableMovie from '@/components/movie/TableMovie';
import Paginations from '@/components/pagination/Paginations';
import { useTranslations } from 'next-intl';
import React from 'react';
import BreadCrumb from '../../BreadCrumb';
import { baseOpenGraph } from '@/app/sharedMetadata';

export async function generateMetadata({ params }:{ params:{ slug:string } }) {
  const url = process.env.NEXT_PUBLIC_URL + '/movie/' + params.slug;

  return {
    title: `Phim ${params.slug||''} - Cập nhật nhanh chóng tại PhimVip.com`,
    description: `Xem các bộ phim mới nhất năm ${params.slug||''} với chất lượng cao tại PhimVip.com. Cập nhật phim mới liên tục và không quảng cáo, mang lại trải nghiệm giải trí hàng đầu.`,
    openGraph: {
      ...baseOpenGraph,
      title: `Phim ${params.slug||''} - Cập nhật nhanh chóng tại PhimVip.com`,
      description: `Xem các bộ phim mới nhất năm ${params.slug||''} với chất lượng cao tại PhimVip.com. Cập nhật phim mới liên tục và không quảng cáo, mang lại trải nghiệm giải trí hàng đầu.`,
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

export default async function Year({ params, searchParams }: { params: { slug:string }, searchParams:{ page:string } }) {
  const movies = await movieApiRequest.getMovieByYear(params.slug, parseInt(searchParams.page)||1);
  
  return (
    <Layout>
      <BreadCrumbComponent yearParam={params.slug}/>
      <TableHeader totalMovie={movies?.payload?.totalMovies}/>
      <TableMovie movies={movies?.payload?.movies}/>
      <TableFooter currentPage={parseInt(searchParams.page)||1} totalPage={movies?.payload?.totalPages}/>
      <Paginations currentPage={parseInt(searchParams.page)||1} totalPages={movies?.payload?.totalPages}/>
    </Layout>
  )
}

function BreadCrumbComponent({yearParam}:{yearParam:string}) {
  return <BreadCrumb data={yearParam} dataEn={yearParam}/>
}

function TableHeader({totalMovie}:{totalMovie:number}) {
  const pagination = useTranslations('pagination');
  return <p className=" text-[10px] sm:text-[12px] 2xl:text-[14px] my-[10px]"><strong>{totalMovie}</strong> {pagination('result')}</p>
}

function TableFooter({currentPage, totalPage}:{currentPage:number;totalPage:number}) {
  const pagination = useTranslations('pagination');
  return <p className=" text-[10px] sm:text-[12px] 2xl:text-[14px] my-[10px]">{pagination('page')} <strong>{currentPage}</strong> | {pagination('total')} <strong>{totalPage}</strong> {pagination('page')}</p>
}