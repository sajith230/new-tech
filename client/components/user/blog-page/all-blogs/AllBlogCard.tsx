import React from "react";
import Image from "next/image";
import Link from "next/link";

import { ImArrowUpRight2 } from "react-icons/im";
import { BlogPost } from "@/lib/types";
import { blogApi } from "@/lib/api/blog";

interface AllBlogCardProps {
  post: BlogPost;
}

const AllBlogCard: React.FC<AllBlogCardProps> = ({ post }) => {
  const formattedDate = blogApi.formatDate(post.timestamp);
  const tags = blogApi.getBlogTags(post);
  const imageUrl = blogApi.getDefaultBlogImage();

  return (
    <div className="grid grid-cols-1 gap-[1.5em]">
      <div className="bg-foreground/20 relative h-[160px] overflow-hidden rounded-[0.8em] sm:h-[180px] md:h-[200px] lg:h-[220px] xl:h-[240px] 2xl:h-[260px]">
        <Image
          src={imageUrl}
          alt={post.titleRaw}
          fill
          className="object-cover object-center"
        />
      </div>

      <div className="flex flex-col gap-[0.5em]">
        <p className="text-primary text-[12px] font-medium sm:text-[13px] md:text-[14px] lg:text-[15px] xl:text-[16px] 2xl:text-[17px]">
          {formattedDate}
        </p>
        <Link 
          href={`https://forum.techcd.lk/topic/${post.slug}`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-between gap-[2em] text-[18px] sm:text-[20px] md:text-[21px] lg:text-[23px] xl:text-[25px] 2xl:text-[26px] hover:opacity-80 transition-opacity"
        >
          <p className="line-clamp-1 pb-[0.1em]">
            {String(post.titleRaw || 'Untitled')}
          </p>
          <ImArrowUpRight2 className="shrink-0" />
        </Link>
        <p className="text-foreground/40 line-clamp-2 pb-[0.1em] text-[13px] sm:text-[14px] md:text-[15px] lg:text-[16px] xl:text-[17px] 2xl:text-[18px]">
          {String(post.titleRaw || 'Untitled')} - Posted by {String(post.user?.displayname || 'Unknown')} in {String(post.category?.name || 'Blog')}. Views: {post.viewcount || 0}
        </p>
        <div className="flex flex-wrap gap-[0.5em] text-[12px] sm:text-[13px] md:text-[14px] lg:text-[15px] xl:text-[16px] 2xl:text-[17px]">
          {tags.map((tag, index) => (
            <div key={index} className="text-primary rounded-full bg-[#EEF4FF] px-[1em] py-[0.4em]">
              {String(tag)}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AllBlogCard;
