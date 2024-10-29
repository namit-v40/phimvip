import { z } from "zod";

export const EpisodeSchema = z.object({
    ep_id: z.number(),
    ep_title: z.string(),
    ep_name: z.string(),
    ep_slug: z.string(),
    link_embed: z.string(),
    link_m3u8: z.string(),
    sort_order: z.number(),
    user_id: z.number(),
    status: z.boolean(),
    createdAt: z.date(),
    updatedAt: z.date()
})

export const EpisodeListRes = z.object({
    episodes: z.array(EpisodeSchema),
    totalEpisodes: z.number(),
    currentPage: z.string(),
    totalPages: z.number(),
    message: z.string()
})

export const EpisodeRes = z.object({
    episode: EpisodeSchema,
    message: z.string()
})

export type EpisodeListResType = z.TypeOf<typeof EpisodeListRes>
export type EpisodeResType = z.TypeOf<typeof EpisodeRes>