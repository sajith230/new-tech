"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

import { IoCalendarOutline } from "react-icons/io5";
import { ImArrowUpRight2 } from "react-icons/im";
import { BlogPost } from "@/lib/types";
import { blogApi } from "@/lib/api/blog";

const HeaderContent = () => {
  const [featuredPost, setFeaturedPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFeaturedPost = async () => {
      try {
        setLoading(true);
        const posts = await blogApi.getRecentBlogs();
        
        // Find the latest post that has the "startag" tag
        const startagPost = posts.find(post => {
          const tags = blogApi.getBlogTags(post);
          return tags.includes('startag');
        });
        
        setFeaturedPost(startagPost || null);
      } catch (error) {
        console.error("Error fetching featured post:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchFeaturedPost();
  }, []);

  // Don't render the header section if no featured post with "startag"
  if (loading) {
    return (
      <div className="bg-foreground/10 relative mt-[1.5em] h-[500px] overflow-hidden rounded-[1em] sm:h-[550px] md:h-[600px] lg:h-[650px] xl:h-[700px] 2xl:h-[750px] flex items-center justify-center">
        <div className="text-foreground/60">Loading featured post...</div>
      </div>
    );
  }

  if (!featuredPost) {
    return null; // Don't render anything if no post has "startag"
  }

  const formattedDate = blogApi.formatDate(featuredPost.timestamp);
  const tags = blogApi.getBlogTags(featuredPost);
  const imageUrl = blogApi.getDefaultBlogImage();

  return (
    <div className="bg-foreground/10 relative mt-[1.5em] h-[500px] overflow-hidden rounded-[1em] sm:h-[550px] md:h-[600px] lg:h-[650px] xl:h-[700px] 2xl:h-[750px]">
      <Image
        src={imageUrl}
        alt={String(featuredPost.titleRaw || 'Featured Post')}
        fill
        className="object-cover object-center"
      />
      <div className="absolute right-0 bottom-0 left-0 rounded-[1em] bg-black/30 px-[3em] py-[2em] text-[13px] backdrop-blur-sm sm:text-[15px] md:text-[17px] lg:text-[19px] xl:text-[20px] 2xl:text-[21px]">
        <div className="grid grid-cols-1 gap-[1.4em] lg:grid-cols-10">
          <div className="lg:col-span-9">
            <p className="line-clamp-2 pb-[0.1em] text-[18px] font-semibold sm:text-[20px] md:text-[23px] lg:text-[25px] xl:text-[28px] 2xl:text-[30px]">
              {String(featuredPost.titleRaw || 'Untitled')}
            </p>
            <p className="mt-[0.4em] line-clamp-2 pb-[0.1em] font-medium">
              Featured post by {String(featuredPost.user?.displayname || 'Unknown')} in {String(featuredPost.category?.name || 'Blog')}
            </p>
          </div>
          <div className="row-start-1 flex w-full justify-end lg:col-span-1 lg:row-start-auto">
            <Link 
              href={`https://forum.techcd.lk/topic/${featuredPost.slug}`}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:opacity-80 transition-opacity"
            >
              <ImArrowUpRight2 className="text-foreground text-[2em]" />
            </Link>
          </div>
        </div>

        <div className="mt-[1.5em] flex flex-col gap-[1.5em] lg:flex-row lg:items-center lg:justify-between">
          <div className="flex items-center gap-[1em]">
            <div className="border-foreground/30 w-fit rounded-full border p-[0.5em]">
              <IoCalendarOutline />
            </div>
            <p>{formattedDate}</p>
          </div>
          <div className="flex flex-wrap gap-[0.5em]">
            {tags.map((tag, index) => (
              <div key={index} className="border-foreground/30 rounded-full border px-[3em] py-[0.4em]">
                {String(tag)}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeaderContent;
