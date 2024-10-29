"use client";
import React from 'react';
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { useTranslations } from 'next-intl';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

type Props = {
  currentPage: number;
  totalPages: number;
}

export default function Paginations({ currentPage, totalPages }:Props) {
  const pagination = useTranslations('pagination');

  const router = useRouter();
  const path = usePathname();
  const searchParams = useSearchParams();
  const params = new URLSearchParams(searchParams.toString());

  // Logic to show only 5 pages at a time
  const getPageRange = () => {
    const range = [];

    // Start by calculating the startPage and endPage
    let startPage = Math.max(1, currentPage - 2);
    const endPage = Math.min(totalPages, startPage + 4)||1;

    // Adjust startPage if we're near the end to always show 5 pages
    if (endPage - startPage < 4) {
      startPage = Math.max(1, endPage - 4);
    }

    for (let i = startPage; i <= endPage; i++) {
      range.push(i);
    }

    return range;
  };

  const pageRange = getPageRange();

  // Handle page changes for both search and fetch
  const onPageChange = (page:number) => {
    if (page !== currentPage) {
      params.set("page", page.toString());
      // Tạo URL mới với query params đã được cập nhật
      const newQueryString = params.toString();
      router.replace(`${path==='/'?'/movie':''}?${newQueryString}`);
    }
  };

  // Handle pagination navigation (next/previous page)
  const handlePagination = (direction:string) => {
    let newPage = currentPage;
    if (direction === "next" && currentPage < totalPages) {
      newPage = currentPage + 1;
    } else if (direction === "prev" && currentPage > 1) {
      newPage = currentPage - 1;
    }
    onPageChange(newPage);  // Update to the new page
  };

  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious className={`${currentPage===1?'hover:bg-transparent cursor-default':''}`} onClick={(e) => {e.preventDefault();handlePagination("prev")}} title={pagination('previous')} href="#" />
        </PaginationItem>
        <PaginationItem>
          {pageRange.map((page) => {
            return (
              <PaginationLink className={`${page === currentPage?'bg-indigo-600 hover:bg-indigo-600 text-white hover:text-white cursor-default':''}`} key={page} href='#' onClick={(e) => {e.preventDefault(); onPageChange(page)}}>{page}</PaginationLink>
            );
          })}
        </PaginationItem>
        <PaginationItem>
          <PaginationNext className={`${currentPage===totalPages?'hover:bg-transparent cursor-default':''}`} onClick={(e) => {e.preventDefault();handlePagination("next")}} title={pagination('next')} href="#" />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  )
}