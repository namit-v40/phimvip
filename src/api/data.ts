import http from '@/lib/http';
import { ActorListResType, CategoryListResType, CategoryResType, CountryListResType, CountryResType, DirectorListResType, TypeListResType, TypeResType, YearListResType, YearResType } from '@/schema/data.schema';

const dataApiRequest = {
    getCategory: () => http.get<CategoryListResType>(`/api/v1/category`),
    getCategoryBySlug: (slug: string) => http.get<CategoryResType>(`/api/v1/category/slug/${slug}`),

    getCountry: () => http.get<CountryListResType>(`/api/v1/country`),
    getCountryBySlug: (slug: string) => http.get<CountryResType>(`/api/v1/country/slug/${slug}`),

    getType: () => http.get<TypeListResType>(`/api/v1/type`),
    getTypeBySlug: (slug: string) => http.get<TypeResType>(`/api/v1/type/slug/${slug}`),

    getYear: () => http.get<YearListResType>(`/api/v1/year`),
    getYearByName: (name: string) => http.get<YearResType>(`/api/v1/year/name/${name}`),

    getActor: () => http.get<ActorListResType>(`/api/v1/actor`),
    getDirector: () => http.get<DirectorListResType>(`/api/v1/director`)
}

export default dataApiRequest