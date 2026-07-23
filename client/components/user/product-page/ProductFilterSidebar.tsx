import React from "react";

import { Category } from "@/lib/types";
import { Checkbox } from "@/components/user/ui/Checkbox";
import { DualRangeSlider } from "../ui/DualRangeSlider";

type ProductFilterSidebarProps = {
  categories: Category[];
  selectedCategories: Category[];
  handleCategoryChange: (cat: Category) => void;
  maxPrice: number;
  priceRange: number[];
  setPriceRange: (v: number[]) => void;
};

const ProductFilterSidebar: React.FC<ProductFilterSidebarProps> = ({
  categories,
  selectedCategories,
  handleCategoryChange,
  maxPrice,
  priceRange,
  setPriceRange,
}) => {
  return (
    <div className="bg-foreground/5 border-foreground/20 h-fit rounded-[1em] border p-[1em] text-[13px] sm:text-[15px] md:text-[17px] lg:col-span-1 lg:text-[19px] xl:text-[20px] 2xl:text-[21px]">
      <h2 className="mb-[1em] font-semibold uppercase">Categories</h2>
      <div className="space-y-[0.8em]">
        {categories.map((cat) => (
          <div key={cat.name}>
            <label className="flex cursor-pointer items-center gap-2 capitalize select-none">
              <Checkbox
                checked={selectedCategories.includes(cat)}
                onCheckedChange={() => handleCategoryChange(cat)}
                aria-label={`Filter by ${cat}`}
                tabIndex={0}
              />
              <span>{cat.name}</span>
            </label>
          </div>
        ))}
      </div>
      <div className="via-foreground mt-[1.2em] h-[1px] w-full bg-gradient-to-r from-transparent to-transparent"></div>

      <h2 className="my-[1em] font-semibold uppercase">Price range</h2>
      <div>
        <DualRangeSlider
          value={priceRange}
          onValueChange={(newValues) => {
            setPriceRange(newValues);
          }}
          min={0}
          max={maxPrice}
          step={1}
        />

        <div className="mt-[1em] flex items-center justify-between text-[11px] font-light sm:text-[12px] md:text-[13px] lg:text-[14px] xl:text-[15px] 2xl:text-[16px]">
          <p>Rs {priceRange[0]}</p>
          <p>Rs {priceRange[1]}</p>
        </div>
      </div>
      <div className="via-foreground mt-[1.2em] h-[1px] w-full bg-gradient-to-r from-transparent to-transparent"></div>
    </div>
  );
};

export default ProductFilterSidebar;
