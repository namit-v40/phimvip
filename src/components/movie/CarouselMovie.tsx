import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { MovieSchema } from '@/schema/movie.schema';
import { z } from 'zod';
import Link from 'next/link';
import Image from 'next/image';

const ListMovieSchema = z.array(MovieSchema)
type MovieType = z.TypeOf<typeof ListMovieSchema>

export default function CarouselMovie({ movies }: {movies:MovieType}) {
    return (
        <Carousel opts={{ align: "start" }} className="w-full px-8">
            <CarouselContent>
                {movies.map(movie => (
                    <CarouselItem key={movie.mov_id} className="md:basis-1/2 lg:basis-1/3">
                        <Link href={`/movie/${movie.mov_slug}`} className="p-1">
                            <Card>
                                <CardContent className="p-4">
                                    <div className='w-full h-[160px] mb-2'>
                                        <Image className="rounded-md object-cover w-full h-full" width={300} height={50} src={movie.thumb_url} alt={movie.mov_name} />
                                    </div>
                                    <div className="flex flex-col justify-evenly">
                                        <h3 className="text-white text-[15px] tablet-m:text-[16px] font-medium line-clamp-1">{movie.mov_name}</h3>
                                        <p className="text-red-600 text-[13px] tablet-m:text-[14px] font-medium line-clamp-1">
                                            {movie.Year ? movie.Year.year_name : 'Đang cập nhật'}
                                        </p>
                                        <p className="text-white text-[13px] tablet-m:text-[14px] line-clamp-1">{movie.time}</p>
                                    </div>
                                </CardContent>
                            </Card>
                        </Link>
                    </CarouselItem>
                ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
        </Carousel>
    )
}