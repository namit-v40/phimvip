import { z } from "zod";

export const TypeSchema = z.object({
    type_id: z.number(),
    type_name: z.string(),
    type_slug: z.string(),
    type_en_name: z.string(),
    type_en_slug: z.string(),
    status: z.boolean(),
    createdAt: z.date(),
    updatedAt: z.date()
})

export const YearSchema = z.object({
    year_id: z.number(),
    year_name: z.number(),
    status: z.boolean(),
    createdAt: z.date(),
    updatedAt: z.date()
})

export const CategorySchema = z.object({
    cat_id: z.number(),
    cat_name: z.string(),
    cat_slug: z.string(),
    cat_en_name: z.string(),
    cat_en_slug: z.string(),
    status: z.boolean(),
    createdAt: z.date(),
    updatedAt: z.date()
})

export const CountrySchema = z.object({
    ctr_id: z.number(),
    ctr_name: z.string(),
    ctr_slug: z.string(),
    ctr_en_name: z.string(),
    ctr_en_slug: z.string(),
    status: z.boolean(),
    createdAt: z.date(),
    updatedAt: z.date()
})

export const ActorSchema = z.object({
    act_id: z.number(),
    act_name: z.string(),
    status: z.boolean(),
    createdAt: z.date(),
    updatedAt: z.date()
})

export const DirectorSchema = z.object({
    dir_id: z.number(),
    dir_name: z.string(),
    status: z.boolean(),
    createdAt: z.date(),
    updatedAt: z.date()
})

export const TypeListRes = z.object({ types: z.array(TypeSchema), message: z.string() })
export const TypeRes = z.object({ type: TypeSchema, message: z.string() })

export const YearListRes = z.object({ years: z.array(YearSchema),  message: z.string() })
export const YearRes = z.object({ year: YearSchema,  message: z.string() })

export const CategoryListRes = z.object({ categories: z.array(CategorySchema), message: z.string() })
export const CategoryRes = z.object({ category: CategorySchema, message: z.string() })

export const CountryListRes = z.object({ countries: z.array(CountrySchema), message: z.string() })
export const CountryRes = z.object({ country: CountrySchema, message: z.string() })

export const ActorListRes = z.object({ actors: z.array(ActorSchema), message: z.string() })

export const DirectorListRes = z.object({ directors: z.array(DirectorSchema), message: z.string() })


export type TypeListResType = z.TypeOf<typeof TypeListRes>
export type TypeResType = z.TypeOf<typeof TypeRes>

export type YearListResType = z.TypeOf<typeof YearListRes>
export type YearResType = z.TypeOf<typeof YearRes>

export type CategoryListResType = z.TypeOf<typeof CategoryListRes>
export type CategoryResType = z.TypeOf<typeof CategoryRes>

export type CountryListResType = z.TypeOf<typeof CountryListRes>
export type CountryResType = z.TypeOf<typeof CountryRes>

export type ActorListResType = z.TypeOf<typeof ActorListRes>
export type DirectorListResType = z.TypeOf<typeof DirectorListRes>