import React from 'react';
import AdminLayout from '../(layout)/AdminLayout';
import ListMovie from '@/components/admin/ListMovie';
import movieApiRequest from '@/api/movie';
import dataApiRequest from '@/api/data';

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

export default async function Admin({ searchParams }: Props) {
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
    <AdminLayout>
      <ListMovie movies={movies?.payload?.movies}/>
    </AdminLayout>
  )
}