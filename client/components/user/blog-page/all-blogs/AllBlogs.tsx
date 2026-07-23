"use client";

import React, { useEffect, useState } from "react";
import { CiSearch } from "react-icons/ci";

import AllBlogCard from "./AllBlogCard";
import { BlogPost } from "@/lib/types";
import { blogApi } from "@/lib/api/blog";

const AllBlogs = () => {
  const [pageSize, setPageSize] = useState(3);
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [filteredPosts, setFilteredPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [categories, setCategories] = useState<string[]>(["All"]);

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      let size = 3;

      if (width < 640) size = 3;
      else if (width < 768) size = 9;
      else size = 9;

      setPageSize(size);
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  });

  useEffect(() => {
    const fetchBlogPosts = async () => {
      try {
        setLoading(true);
        const posts = await blogApi.getRecentBlogs();
        setBlogPosts(posts);
        setFilteredPosts(posts);
        
        // Extract unique categories
        const uniqueCategories = ["All", ...new Set(posts.map(post => post.category.name))];
        setCategories(uniqueCategories);
      } catch (error) {
        console.error("Error fetching blog posts:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogPosts();
  }, []);

  useEffect(() => {
    let filtered = blogPosts;

    // Filter by category
    if (selectedCategory !== "All") {
      filtered = filtered.filter(post => post.category.name === selectedCategory);
    }

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(post => 
        post.titleRaw.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.user.displayname.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredPosts(filtered);
  }, [blogPosts, selectedCategory, searchTerm]);

  const handleCategoryClick = (category: string) => {
    setSelectedCategory(category);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  if (loading) {
    return (
      <section className="relative">
        <div className="from-primary absolute top-0 right-0 aspect-square w-2/5 translate-x-1/2 rounded-full bg-radial to-transparent blur-[5em]"></div>
        <div className="from-primary absolute top-1/2 left-0 aspect-square w-2/5 -translate-x-1/2 rounded-full bg-radial to-transparent blur-[5em]"></div>

        <div className="px-container relative container mx-auto py-[2em]">
          <p className="mb-[0.8em] text-[18px] font-medium uppercase sm:text-[20px] md:text-[21px] lg:text-[23px] xl:text-[25px] 2xl:text-[26px]">
            All blog posts
          </p>
          <div className="flex items-center justify-center py-[4em]">
            <div className="text-foreground/60">Loading blog posts...</div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="relative">
      <div className="from-primary absolute top-0 right-0 aspect-square w-2/5 translate-x-1/2 rounded-full bg-radial to-transparent blur-[5em]"></div>
      <div className="from-primary absolute top-1/2 left-0 aspect-square w-2/5 -translate-x-1/2 rounded-full bg-radial to-transparent blur-[5em]"></div>

      <div className="px-container relative container mx-auto py-[2em]">
        <p className="mb-[0.8em] text-[18px] font-medium uppercase sm:text-[20px] md:text-[21px] lg:text-[23px] xl:text-[25px] 2xl:text-[26px]">
          All blog posts
        </p>

        <div className="mb-[1.5em] grid grid-cols-1 gap-[1.5em] text-[13px] sm:text-[15px] md:text-[17px] lg:grid-cols-5 lg:text-[19px] xl:text-[20px] 2xl:text-[21px]">
          <div className="flex flex-wrap gap-[0.5em] lg:col-span-3">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => handleCategoryClick(category)}
                className={`rounded-full border px-[2em] py-[0.4em] uppercase transition-colors ${
                  selectedCategory === category
                    ? "bg-primary text-white border-primary"
                    : "border-foreground/30 hover:border-foreground/50"
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          <div className="border-foreground/30 flex h-fit items-center gap-[1em] rounded-full border px-[1em] lg:col-span-2">
            <input
              type="text"
              placeholder="search"
              value={searchTerm}
              onChange={handleSearchChange}
              className="text-foreground placeholder:text-foreground/40 w-full bg-transparent py-[0.5em] focus:outline-none"
            />
            <CiSearch />
          </div>
        </div>

        {filteredPosts.length === 0 ? (
          <div className="flex items-center justify-center py-[4em]">
            <div className="text-foreground/60">
              {searchTerm || selectedCategory !== "All" 
                ? "No blog posts found matching your criteria." 
                : "No blog posts available at the moment."}
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 grid-rows-3 gap-[1.5em] sm:grid-cols-2 lg:grid-cols-3">
            {filteredPosts.slice(0, pageSize).map((post) => (
              <AllBlogCard key={post.tid} post={post} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default AllBlogs;
