"use client";

import React, { useEffect, useState } from "react";

import api from "@/lib/axios-instance";
import { Product, Category } from "@/lib/types";

import Error from "./Error";
import Loading from "./Loading";
import ProductFilterSidebar from "./ProductFilterSidebar";
import ProductGridArea from "./ProductGridArea";
import BrandCarousel from "../home-page/about/BrandCarousel";

const ProductArea = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const [fetchedProducts, setFetchedProducts] = useState<Product[]>([]);
  const [fetchedCategories, setFetchedCategories] = useState<Category[]>([]);

  const [currentPage, setCurrentPage] = useState(1);
  const [maxPrice, setMaxPrice] = useState(0);
  const [priceRange, setPriceRange] = useState([0, 0]);
  const [selectedCategories, setSelectedCategories] = useState<Category[]>([]);
  const [searchString, setSearchString] = useState("");
  const [sortValue, setSortValue] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const productRes = await api.get("/product?status=public");
        const categoryRes = await api.get("/product-category");
        const productData: Product[] = productRes.data;
        const categoryData: Category[] = categoryRes.data;

        const max = productData.sort(
          (a, b) => b.discountPrice - a.discountPrice,
        )[0].discountPrice;
        setMaxPrice(max);
        setPriceRange([0, max]);

        setFetchedProducts(productData);
        setFetchedCategories(categoryData);
      } catch {
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleCategoryChange = (cat: Category) => {
    setCurrentPage(1);
    setSelectedCategories((prev) =>
      prev.includes(cat) ? prev.filter((f) => f !== cat) : [...prev, cat],
    );
  };

  const filteredProducts = fetchedProducts.filter(
    (p) =>
      // category check
      (selectedCategories.length === 0 ||
        p.categories.some((cat) =>
          selectedCategories.some((sel) => sel.name === cat.name),
        )) &&
      // price check
      p.discountPrice >= priceRange[0] &&
      p.discountPrice <= priceRange[1] &&
      // Search string check
      p.title.toLowerCase().includes(searchString.toLowerCase()),
  );

  const sortedProducts = () => {
    switch (sortValue) {
      case "price-des":
        return filteredProducts.sort(
          (a, b) => b.discountPrice - a.discountPrice,
        );

      case "price-asc":
        return filteredProducts.sort(
          (a, b) => a.discountPrice - b.discountPrice,
        );

      case "title-des":
        return filteredProducts.sort((a, b) =>
          b.title.toLowerCase().localeCompare(b.title.toLowerCase()),
        );

      case "title-asc":
        return filteredProducts.sort((a, b) =>
          a.title.toLowerCase().localeCompare(b.title.toLowerCase()),
        );

      case "date-des":
        return filteredProducts.sort((a, b) => {
          const dateA = new Date(a.createdAt);
          const dateB = new Date(b.createdAt);

          if (dateA === dateB) return 0;
          return dateA < dateB ? 1 : -1;
        });

      case "date-asc":
        return filteredProducts.sort((a, b) => {
          const dateA = new Date(a.createdAt);
          const dateB = new Date(b.createdAt);

          if (dateA === dateB) return 0;
          return dateA > dateB ? 1 : -1;
        });

      default:
        return filteredProducts;
    }
  };

  return (
    <section className="relative overflow-hidden pb-[2em]">
      {filteredProducts.length > 0 && (
        <div className="from-primary absolute bottom-0 left-0 aspect-square w-2/5 -translate-x-1/2 rounded-full bg-radial to-transparent blur-[5em]"></div>
      )}

      <div className="px-container relative container mx-auto py-[2em]">
        {error && <Error />}
        {!error && loading && <Loading />}
        {!loading && !error && (
          <div className="relative grid grid-cols-1 gap-[1.5em] lg:grid-cols-5">
            <ProductFilterSidebar
              categories={fetchedCategories}
              selectedCategories={selectedCategories}
              handleCategoryChange={handleCategoryChange}
              maxPrice={maxPrice}
              priceRange={priceRange}
              setPriceRange={setPriceRange}
            />

            <ProductGridArea
              products={sortedProducts()}
              total={filteredProducts.length}
              isFiltered={fetchedProducts.length > filteredProducts.length}
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
              searchString={searchString}
              setSearchString={setSearchString}
              sortValue={sortValue}
              setSortValue={setSortValue}
            />
          </div>
        )}
      </div>

      <BrandCarousel />
    </section>
  );
};

export default ProductArea;
