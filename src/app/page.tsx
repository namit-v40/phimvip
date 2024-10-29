import TableMovie from "@/components/movie/TableMovie";
import { useTranslations } from "next-intl";
import Paginations from "@/components/pagination/Paginations";
import Layout from "./(layout)/Layout";
import { baseOpenGraph } from "./sharedMetadata";
import movieApiRequest from "@/api/movie";
import FilterCard from "@/components/filter/FilterCard";
import dataApiRequest from "@/api/data";

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

export default async function Home() {
  const { payload } = await movieApiRequest.getLatestMovie(1, 15);

  const categoryData = await dataApiRequest.getCategory();
  const countryData = await dataApiRequest.getCountry();
  const yearData = await dataApiRequest.getYear();

  const categories = categoryData?.payload?.categories;
  const countries = countryData?.payload?.countries;
  const years = yearData?.payload?.years;

  const movies = payload?.movies;
  const totalPage = payload?.totalPages;

  const props = {
    categories: categories.map(cat => ({ cat_slug:cat.cat_slug,cat_en_slug:cat.cat_en_slug,cat_name:cat.cat_name,cat_en_name:cat.cat_en_name })),
    countries: countries.map(ctr => ({ ctr_slug:ctr.ctr_slug, ctr_en_slug:ctr.ctr_en_slug, ctr_name:ctr.ctr_name, ctr_en_name:ctr.ctr_en_name })),
    years: years.map(year => ({ year_name:year.year_name.toString()}))
  }

  const filterState = {
    query: '',
    year: '',
    type: '',
    category: '',
    country: '',
    lang: '',
    quality: '',
    actor: '',
    director: '',
    sort: 1
  }

  return (
    <Layout>
      <Description />
      <FilterCard props={props} filterState={filterState}/>
      <TableMovie movies={movies}/>
      <TableFooter currentPage={1} totalPage={totalPage}/>
      <Paginations currentPage={1} totalPages={totalPage}/>
    </Layout>
  );
}

function Description() {
  const description = useTranslations('description');
  return <h2 className="text-[#1496d5] text-[12px] md:text-[14px] font-medium mb-[10px] text-justify">{description('value')}</h2>
}

function TableFooter({currentPage, totalPage}:{currentPage:number;totalPage:number}) {
  const pagination = useTranslations('pagination');
  return <p className=" text-[10px] sm:text-[12px] 2xl:text-[14px] my-[10px]">{pagination('page')} <strong>{currentPage}</strong> | {pagination('total')} <strong>{totalPage}</strong> {pagination('page')}</p>
}