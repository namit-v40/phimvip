import React from 'react';
import { baseOpenGraph } from '../sharedMetadata';
import movieApiRequest from '@/api/movie';
import Layout from '../(layout)/Layout';
import TableMovie from '@/components/movie/TableMovie';
import Paginations from '@/components/pagination/Paginations';
import { useTranslations } from 'next-intl';
import dataApiRequest from '@/api/data';
import FilterCard from '@/components/filter/FilterCard';

export async function generateMetadata() {
    const url = process.env.NEXT_PUBLIC_URL + '/';
  
    return {
      title: "Trang chủ Phimvip - Xem phim chất lượng cao không quảng cáo - Cập nhật liên tục tại PhimVip.com",
      description: "PhimVip.com là trang xem phim chất lượng cao, không quảng cáo, cập nhật phim mới liên tục. Trải nghiệm giải trí hàng đầu với tốc độ nhanh và nội dung phong phú.",
      openGraph: {
        ...baseOpenGraph,
        title: "Trang chủ Phimvip - Xem phim chất lượng cao không quảng cáo - Cập nhật liên tục tại PhimVip.com",
        description: "PhimVip.com là trang xem phim chất lượng cao, không quảng cáo, cập nhật phim mới liên tục. Trải nghiệm giải trí hàng đầu với tốc độ nhanh và nội dung phong phú.",
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

type Props = {
    searchParams: {
        query: string,
        year: string,
        type: string,
        category: string,
        country: string,
        lang: string,
        quality: string,
        actor: string,
        director: string,
        sort: string,
        page: string
    }
}

export default async function page({ searchParams }: Props) {
    const filter = {
        query: searchParams.query,
        year: searchParams.year,
        type: searchParams.type,
        category: searchParams.category,
        country: searchParams.country,
        lang: searchParams.lang,
        quality: searchParams.quality,
        actor: searchParams.actor,
        director: searchParams.director,
        sort: parseInt(searchParams.sort)||1
    }
    
    const movies = await movieApiRequest.filterMovie(filter, parseInt(searchParams.page)||1);

    const categoryData = await dataApiRequest.getCategory();
    const countryData = await dataApiRequest.getCountry();
    const yearData = await dataApiRequest.getYear();

    const categories = categoryData?.payload?.categories;
    const countries = countryData?.payload?.countries;
    const years = yearData?.payload?.years;

    const props = {
      categories: categories.map(cat => ({ cat_slug:cat.cat_slug,cat_en_slug:cat.cat_en_slug,cat_name:cat.cat_name,cat_en_name:cat.cat_en_name })),
      countries: countries.map(ctr => ({ ctr_slug:ctr.ctr_slug, ctr_en_slug:ctr.ctr_en_slug, ctr_name:ctr.ctr_name, ctr_en_name:ctr.ctr_en_name })),
      years: years.map(year => ({ year_name:year.year_name.toString()}))
    }
    const filterState = filter

    return (
        <Layout>
            <FilterCard props={props} filterState={filterState}/>
            <TableHeader totalMovie={movies?.payload?.totalMovies}/>
            <TableMovie movies={movies?.payload?.movies}/>
            <TableFooter currentPage={parseInt(searchParams.page)||1} totalPage={movies?.payload?.totalPages}/>
            <Paginations currentPage={parseInt(searchParams.page)||1} totalPages={movies?.payload?.totalPages}/>
        </Layout>
    )
}

function TableHeader({totalMovie}:{totalMovie:number}) {
    const pagination = useTranslations('pagination');
    return <p className=" text-[10px] sm:text-[12px] 2xl:text-[14px] my-[10px]"><strong>{totalMovie}</strong> {pagination('result')}</p>
}

function TableFooter({currentPage, totalPage}:{currentPage:number;totalPage:number}) {
    const pagination = useTranslations('pagination');
    return <p className=" text-[10px] sm:text-[12px] 2xl:text-[14px] my-[10px]">{pagination('page')} <strong>{currentPage}</strong> | {pagination('total')} <strong>{totalPage}</strong> {pagination('page')}</p>
}