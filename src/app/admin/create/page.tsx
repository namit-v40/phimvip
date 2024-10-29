import dataApiRequest from '@/api/data';
import AdminLayout from '@/app/(layout)/AdminLayout';
import CreateMovie from '@/components/admin/create/CreateMovie';
import React from 'react';

type Props = {}

export default async function  AdminCreateMovie({}: Props) {
  const categoryData = await dataApiRequest.getCategory();
  const countryData = await dataApiRequest.getCountry();
  const yearData = await dataApiRequest.getYear();
  const typeData = await dataApiRequest.getType();
  const actorData = await dataApiRequest.getActor();
  const directorData = await dataApiRequest.getDirector();

  const categories = categoryData?.payload?.categories
  .filter(cat => cat.cat_name && cat.cat_slug && cat.cat_en_name && cat.cat_en_slug)
  .map(c => ({value: c.cat_slug, label: c.cat_name}))

  const countries = countryData?.payload?.countries
  .filter(ctr => ctr.ctr_name && ctr.ctr_slug && ctr.ctr_en_name && ctr.ctr_en_slug)
  .map(c => ({value: c.ctr_slug, label: c.ctr_name}))

  const years = yearData?.payload?.years
  .filter(year => year.year_name)
  .map(y => ({value: y.year_name.toString(), label: y.year_name.toString()}))

  const types = typeData?.payload?.types
  .filter(type => type.type_name)
  .map(t => ({value: t.type_name, label: t.type_name}))

  const actors = actorData?.payload?.actors
  .filter(act => act.act_name)
  .map(a => ({value: a.act_name, label: a.act_name}))

  const directors = directorData?.payload?.directors
  .filter(dir => dir.dir_name)
  .map(d => ({value: d.dir_name, label: d.dir_name}))


  return (
    <AdminLayout>
      <CreateMovie data={{categories,countries,years,types,actors,directors}}/>
    </AdminLayout>
  )
}