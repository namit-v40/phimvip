import dataApiRequest from '@/api/data';
import movieApiRequest from '@/api/movie';
import Layout from '@/app/(layout)/Layout';
import TableMovie from '@/components/movie/TableMovie';
import Paginations from '@/components/pagination/Paginations';
import React from 'react'
import BreadCrumb from '../../BreadCrumb';
import { useTranslations } from 'next-intl';
import { baseOpenGraph } from '@/app/sharedMetadata';

export async function generateMetadata({ params }:{ params:{ slug:string} }) {
  const category = await dataApiRequest.getCategoryBySlug(params.slug);

  const url = process.env.NEXT_PUBLIC_URL + '/movie/' + params.slug;

  return {
    title: `${category?.payload?.category?.cat_name||'Phim'} hay nhất - Cập nhật nhanh chóng tại PhimVip.com`,
    description: "Thưởng thức các bộ phim truyền hình hấp dẫn, đa dạng thể loại với chất lượng cao tại PhimVip.com. Cập nhật phim bộ mới liên tục và không quảng cáo, mang đến trải nghiệm xem phim tuyệt vời.",
    openGraph: {
      ...baseOpenGraph,
      title: `${category?.payload?.category?.cat_name||'Phim'} hay nhất - Cập nhật nhanh chóng tại PhimVip.com`,
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

export default async function Category({ params, searchParams }: { params: { slug:string }, searchParams:{ page:string } }) {
  const data = await dataApiRequest.getCategory();
  const movies = await movieApiRequest.getMovieByCategory(params.slug, parseInt(searchParams.page)||1);
  
  const category = data?.payload?.categories?.filter( c => c.cat_slug === params.slug || c.cat_en_slug === params.slug);
  
  return (
    <Layout>
      <BreadCrumbComponent catParam={category[0]}/>
      <TableHeader totalMovie={movies?.payload?.totalMovies}/>
      <TableMovie movies={movies?.payload?.movies}/>
      <TableFooter currentPage={parseInt(searchParams.page)||1} totalPage={movies?.payload?.totalPages}/>
      <Paginations currentPage={parseInt(searchParams.page)||1} totalPages={movies?.payload?.totalPages||1}/>
    </Layout>
  )
}

interface Category {
  status: boolean;
  createdAt: Date;
  updatedAt: Date;
  cat_id: number;
  cat_name: string;
  cat_slug: string;
  cat_en_name: string;
  cat_en_slug: string;
}

function BreadCrumbComponent({catParam}:{catParam:Category}) {
  return <BreadCrumb data={catParam?.cat_name} dataEn={catParam?.cat_en_name}/>
}

function TableHeader({totalMovie}:{totalMovie:number}) {
  const pagination = useTranslations('pagination');
  return <p className=" text-[10px] sm:text-[12px] 2xl:text-[14px] my-[10px]"><strong>{totalMovie}</strong> {pagination('result')}</p>
}

function TableFooter({currentPage, totalPage}:{currentPage:number;totalPage:number}) {
  const pagination = useTranslations('pagination');
  return <p className=" text-[10px] sm:text-[12px] 2xl:text-[14px] my-[10px]">{pagination('page')} <strong>{currentPage}</strong> | {pagination('total')} <strong>{totalPage}</strong> {pagination('page')}</p>
}