"use client";

import React, { useEffect, useState } from "react";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/user/ui/Select";

import { Product } from "@/lib/types";
import Pagination from "./Pagination";
import ProductGrid from "./ProductGrid";

type ProductGridAreaProps = {
  products: Product[];
  total: number;
  isFiltered: boolean;
  currentPage: number;
  setCurrentPage: (page: number) => void;
  searchString: string;
  setSearchString: (value: string) => void;
  sortValue: string;
  setSortValue: (value: string) => void;
};

const ProductGridArea: React.FC<ProductGridAreaProps> = ({
  products,
  total,
  isFiltered,
  currentPage,
  setCurrentPage,
  searchString,
  setSearchString,
  sortValue,
  setSortValue,
}) => {
  const [pageSize, setPageSize] = useState(3);

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      let size = 3;

      if (width < 1024) size = 6;
      else size = 9;

      setPageSize(size);
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const totalPages = Math.ceil(total / pageSize);
  const paginatedProducts = products.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize,
  );

  return (
    <div className="flex flex-col text-[13px] sm:text-[15px] md:text-[17px] lg:col-span-4 lg:text-[19px] xl:text-[20px] 2xl:text-[21px]">
      <div className="mb-[1.5em] flex shrink-0 flex-col justify-between gap-[1em] xl:flex-row xl:items-center">
        {paginatedProducts.length > 0 && (
          <div className="font-medium">
            {total} product{total > 1 && "s"} found
          </div>
        )}
        <div className="flex flex-col gap-[1em] sm:flex-row sm:items-center">
          <input
            value={searchString}
            onChange={(e) => setSearchString(e.target.value)}
            placeholder="Search by name"
            className="border-foreground/15 focus:border-foreground/30 placeholder:text-foreground/80 h-[2em] w-full rounded-[0.5em] border px-[1em] transition-colors focus:outline-none xl:w-[24ch]"
          />
          <Select
            value={sortValue}
            onValueChange={(value) => setSortValue(value)}
          >
            <SelectTrigger className="data-[placeholder]:text-foreground m-0 h-[2em] w-full leading-normal xl:w-[24ch]">
              <SelectValue placeholder="Sort Products" />
            </SelectTrigger>
            <SelectContent className="max-h-[12em]">
              <SelectItem
                value="price-des"
                className="text-[12px] sm:text-[13px] md:text-[14px] lg:text-[15px] xl:text-[16px] 2xl:text-[18px]"
              >
                Price- High to Low
              </SelectItem>
              <SelectItem
                value="price-asc"
                className="text-[12px] sm:text-[13px] md:text-[14px] lg:text-[15px] xl:text-[16px] 2xl:text-[18px]"
              >
                Price- Low to High
              </SelectItem>
              <SelectItem
                value="title-asc"
                className="text-[12px] sm:text-[13px] md:text-[14px] lg:text-[15px] xl:text-[16px] 2xl:text-[18px]"
              >
                Title- Ascending
              </SelectItem>
              <SelectItem
                value="title-desc"
                className="text-[12px] sm:text-[13px] md:text-[14px] lg:text-[15px] xl:text-[16px] 2xl:text-[18px]"
              >
                Title- Descending
              </SelectItem>
              <SelectItem
                value="date-des"
                className="text-[12px] sm:text-[13px] md:text-[14px] lg:text-[15px] xl:text-[16px] 2xl:text-[18px]"
              >
                Date- Latest
              </SelectItem>
              <SelectItem
                value="date-asc"
                className="text-[12px] sm:text-[13px] md:text-[14px] lg:text-[15px] xl:text-[16px] 2xl:text-[18px]"
              >
                Date- Oldest
              </SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <ProductGrid products={paginatedProducts} />
      {paginatedProducts.length > 0 && (
        <Pagination
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          totalPages={totalPages}
        />
      )}
      {paginatedProducts.length === 0 && (
        <div className="bg-foreground/5 border-foreground/20 flex min-h-[8em] grow items-center justify-center rounded-[1em] border">
          <p>No products found {isFiltered && "matching your filters"}</p>
        </div>
      )}
    </div>
  );
};

export default ProductGridArea;
