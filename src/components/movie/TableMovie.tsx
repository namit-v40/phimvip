import React from 'react';
import { useLocale, useTranslations } from 'next-intl';
import Image from 'next/image';
import Link from 'next/link';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
  
type Props = {
  movies: Array<any>
}

function TableMovie({movies}: Props) {
    const headerTable = useTranslations('header_table');
    const locale = useLocale();
    const t = useTranslations();

    return (
        <div className='border rounded-md'>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead className='text-[10px] sm:text-[12px] lg:text-[14px] 2xl:text-[15px] 3xl:text-[16px]'>{headerTable('name')}</TableHead>
                        <TableHead className='text-center text-[10px] sm:text-[12px] lg:text-[14px] 2xl:text-[15px] 3xl:text-[16px]'>{headerTable('year')}</TableHead>
                        <TableHead className='text-center text-[10px] sm:text-[12px] lg:text-[14px] 2xl:text-[15px] 3xl:text-[16px]'>{headerTable('status')}</TableHead>
                        <TableHead className='text-center text-[10px] sm:text-[12px] lg:text-[14px] 2xl:text-[15px] 3xl:text-[16px]'>{headerTable('type')}</TableHead>
                        <TableHead className='text-center text-[10px] sm:text-[12px] lg:text-[14px] 2xl:text-[15px] 3xl:text-[16px]'>{headerTable('country')}</TableHead>
                        <TableHead className='text-center text-[10px] sm:text-[12px] lg:text-[14px] 2xl:text-[15px] 3xl:text-[16px]'>{headerTable('date')}</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    
                        {!(movies?.length>0)
                        ?
                            <TableRow>
                                <TableCell colSpan={6}><p>{t('notfound_movie')}</p></TableCell>
                            </TableRow>
                        :
                            movies?.map((movie) => {
                                return (
                                    <TableRow key={movie.mov_id}>
                                        <TableCell className="font-medium min-w-[300px]">
                                            <Link href={`/movie/${movie.mov_slug}`} className='flex items-center gap-2 py-1'>
                                                <Image src={movie.poster_url} alt="poster" width={40} height={55} className="w-[40px] h-[55px] sm:w-[50px] sm:h-[75px] border rounded shadow object-cover" />
                                                <div className='cursor-pointer'>
                                                    <p className='text-[11px] sm:text-[13px] 2xl:text-[14px] 3xl:text-[16px] text-[#8b5cf6] font-bold hover:text-blue-700 line-clamp-1'>{locale==='vi'?movie?.mov_name:movie?.ori_name}</p>
                                                    <p className='text-[10px] sm:text-[12px] 2xl:text-[13px] 3xl:text-[15px] line-clamp-1'>{movie?.ori_name}</p>
                                                </div>
                                            </Link>
                                        </TableCell>
                                        <TableCell className="min-w-[50px] text-center  font-medium text-[10px] sm:text-[12px] 2xl:text-[13px] 3xl:text-[16px] text-nowrap">{movie.Year?movie.Year.year_name:"Đang cập nhật"}</TableCell>
                                        <TableCell className="text-center font-medium text-[10px] sm:text-[12px] 2xl:text-[13px] 3xl:text-[16px] text-nowrap">{movie.episode_current}</TableCell>
                                        <TableCell className="text-center font-medium text-[10px] sm:text-[12px] 2xl:text-[13px] 3xl:text-[16px] text-nowrap">{locale==='vi'?movie?.Type?.type_name:locale==='en'?movie?.Type?.type_en_name:"Đang cập nhật"}</TableCell>
                                        <TableCell className="text-center font-medium text-[10px] sm:text-[12px] 2xl:text-[13px] 3xl:text-[16px] text-nowrap">{locale==='vi'?movie?.Countries[0]?.ctr_name:locale==='en'?movie?.Countries[0]?.ctr_en_name:"Đang cập nhật"}</TableCell>
                                        <TableCell className="text-center font-medium text-[10px] sm:text-[12px] 2xl:text-[13px] 3xl:text-[16px] text-nowrap">{movie.updatedAt}</TableCell>
                                    </TableRow>
                                )
                            })
                        }
                </TableBody>
            </Table>
        </div>
    )
}

export default TableMovie