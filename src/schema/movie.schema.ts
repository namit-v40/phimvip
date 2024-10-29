import {  z } from "zod";
import { ActorSchema, CategorySchema, CountrySchema, DirectorSchema, TypeSchema, YearSchema } from "./data.schema";
import { EpisodeSchema } from "./episode.schema";

export const MovieSchema = z.object({
    mov_id: z.number(),
    mov_name: z.string(),
    mov_slug: z.string(),
    ori_name: z.string(),
    content: z.string(),
    poster_url: z.string(),
    thumb_url: z.string(),
    time: z.string(),
    episode_current: z.string(),
    episode_total: z.string(),
    quality: z.string(),
    lang: z.string(),
    status: z.boolean(),
    year_id: z.number(),
    type_id: z.number(),
    user_id: z.number(),
    createdAt: z.date(),
    updatedAt: z.date(),
    Type: TypeSchema,
    Year: YearSchema,
    Categories: z.array(CategorySchema),
    Countries: z.array(CountrySchema),
    Actors: z.array(ActorSchema),
    Directors: z.array(DirectorSchema),
    Episodes: z.array(EpisodeSchema)
})

export const MovieListRes = z.object({
    movies: z.array(MovieSchema),
    totalMovies: z.number(),
    currentPage: z.string(),
    totalPages: z.number(),
    message: z.string()
})

export const MovieRes = z.object({
    movie: MovieSchema,
    message: z.string()
})

export type MovieListResType = z.TypeOf<typeof MovieListRes>
export type MovieResType = z.TypeOf<typeof MovieRes>