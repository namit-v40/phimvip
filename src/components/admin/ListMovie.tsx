import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { z } from 'zod';
import { MovieSchema } from '@/schema/movie.schema';
import { Button } from '../ui/button';
import Image from 'next/image';
import { useTranslations } from 'next-intl';

const ListMovieSchema = z.array(MovieSchema)
type ListMovieType = z.TypeOf<typeof ListMovieSchema>
type MovieType = z.TypeOf<typeof MovieSchema>


type Props = {
    movies: ListMovieType
}

export default function ListMovie({ movies }: Props) {
  return (
    <div className='grid grid-cols-1 xl:grid-cols-2 gap-4'>
        {movies?.map(movie => (
            <MovieCard key={movie.mov_id} movie={movie} />
        ))}
    </div>
  )
}

function MovieCard({ movie }: { movie:MovieType }) {
    const adminTrans = useTranslations("admin_button")
    return (
        <Card className='flex p-2'>
            <div className='flex justify-center items-center w-full h-[150px] md:h-[200px] flex-[0_0_20%] md:flex-[0_0_15%] xl:flex-[0_0_20%]'>
                <Image src={movie?.poster_url} alt="poster" width={100} height={200} className='object-cover rounded-md w-full h-full'/>
            </div>
            <div className='flex-[0_0_80%] md:flex-[0_0_85%] xl:flex-[0_0_80%]'>
                <CardHeader className='justify-center items-center'>
                    <CardTitle>{movie?.mov_name}</CardTitle>
                    <CardDescription>{movie?.ori_name}</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className=''></div>
                </CardContent>
                <CardFooter className="flex gap-2 justify-end">
                    <Button variant="outline">{adminTrans('delete')}</Button>
                    <Button>{adminTrans('edit')}</Button>
                </CardFooter>
            </div>
        </Card>
    )
  }