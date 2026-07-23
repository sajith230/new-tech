"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

import { ImArrowUpRight2 } from "react-icons/im";
import { BlogPost } from "@/lib/types";
import { blogApi } from "@/lib/api/blog";

const RecentBlogs = () => {
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlogPosts = async () => {
      try {
        setLoading(true);
        const posts = await blogApi.getRecentBlogs();
        setBlogPosts(posts.slice(0, 4)); // Limit to 4 posts for the layout
      } catch (error) {
        console.error("Error fetching blog posts:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogPosts();
  }, []);

  const renderBlogPost = (post: BlogPost, index: number) => {
    const formattedDate = blogApi.formatDate(post.timestamp);
    const excerpt = blogApi.extractExcerpt(post.titleRaw, 100);
    const tags = blogApi.getBlogTags(post);
    const imageUrl = blogApi.getDefaultBlogImage();

    return (
      <div key={post.tid} className="grid grid-cols-1 gap-[1.5em] sm:grid-cols-2 sm:items-center lg:items-stretch">
        <div className="bg-foreground/20 relative h-[160px] overflow-hidden rounded-[0.8em] sm:h-[180px] md:h-[200px] lg:h-[220px] xl:h-[240px] 2xl:h-[260px]">
          <Image
            src={imageUrl}
            alt={post.titleRaw}
            fill
            className="object-cover object-center"
          />
        </div>

        <div className="flex flex-col gap-[0.5em] lg:justify-center">
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
              {post.titleRaw}
            </p>
            <ImArrowUpRight2 className="shrink-0" />
          </Link>
          <p className="text-foreground/40 line-clamp-2 pb-[0.1em] text-[13px] sm:text-[14px] md:text-[15px] lg:text-[16px] xl:text-[17px] 2xl:text-[18px]">
            {post.titleRaw} - Posted by {post.user.displayname} in {post.category.name}
          </p>
          <div className="flex flex-wrap gap-[0.5em] text-[12px] sm:text-[13px] md:text-[14px] lg:text-[15px] xl:text-[16px] 2xl:text-[17px]">
            {tags.map((tag, tagIndex) => (
              <div key={tagIndex} className="text-primary rounded-full bg-[#EEF4FF] px-[1em] py-[0.4em]">
                {String(tag)}
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };

  if (loading) {
    return (
      <section>
        <div className="px-container container mx-auto pt-[2em]">
          <p className="mb-[0.8em] text-[18px] font-medium uppercase sm:text-[20px] md:text-[21px] lg:text-[23px] xl:text-[25px] 2xl:text-[26px]">
            Recent blog posts
          </p>
          <div className="flex items-center justify-center py-[4em]">
            <div className="text-foreground/60">Loading blog posts...</div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section>
      <div className="px-container container mx-auto pt-[2em]">
        <p className="mb-[0.8em] text-[18px] font-medium uppercase sm:text-[20px] md:text-[21px] lg:text-[23px] xl:text-[25px] 2xl:text-[26px]">
          Recent blog posts
        </p>

        {blogPosts.length === 0 ? (
          <div className="flex items-center justify-center py-[4em]">
            <div className="text-foreground/60">No blog posts available at the moment.</div>
          </div>
        ) : (
          <>
        <div className="grid grid-cols-1 gap-[1.5em] lg:grid-cols-2">
              {/* First post - larger layout */}
              {blogPosts[0] && (
          <div className="grid grid-cols-1 gap-[1.5em] sm:grid-cols-2 sm:items-center lg:h-fit lg:grid-cols-1 lg:items-stretch">
            <div className="bg-foreground/20 relative h-[160px] overflow-hidden rounded-[0.8em] sm:h-[180px] md:h-[200px] lg:h-[220px] xl:h-[240px] 2xl:h-[260px]">
              <Image
                      src={blogApi.getDefaultBlogImage()}
                      alt={blogPosts[0].titleRaw}
                fill
                className="object-cover object-center"
              />
            </div>

            <div className="flex flex-col gap-[0.5em]">
              <p className="text-primary text-[12px] font-medium sm:text-[13px] md:text-[14px] lg:text-[15px] xl:text-[16px] 2xl:text-[17px]">
                      {blogApi.formatDate(blogPosts[0].timestamp)}
                    </p>
                    <Link 
                      href={`https://forum.techcd.lk/topic/${blogPosts[0].slug}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-between gap-[2em] text-[18px] sm:text-[20px] md:text-[21px] lg:text-[23px] xl:text-[25px] 2xl:text-[26px] hover:opacity-80 transition-opacity"
                    >
                <p className="line-clamp-1 pb-[0.1em]">
                      {String(blogPosts[0].titleRaw || 'Untitled')}
                </p>
                <ImArrowUpRight2 className="shrink-0" />
                    </Link>
              <p className="text-foreground/40 line-clamp-2 pb-[0.1em] text-[13px] sm:text-[14px] md:text-[15px] lg:text-[16px] xl:text-[17px] 2xl:text-[18px]">
                      {String(blogPosts[0].titleRaw || 'Untitled')} - Posted by {String(blogPosts[0].user?.displayname || 'Unknown')} in {String(blogPosts[0].category?.name || 'Blog')}
              </p>
                    <div className="flex flex-wrap gap-[0.5em] text-[12px] sm:text-[13px] md:text-[14px] lg:text-[15px] xl:text-[16px] 2xl:text-[17px]">
                      {blogApi.getBlogTags(blogPosts[0]).map((tag, tagIndex) => (
                        <div key={tagIndex} className="text-primary rounded-full bg-[#EEF4FF] px-[1em] py-[0.4em]">
                          {String(tag)}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Posts 2 and 3 in right column */}
              <div className="grid grid-cols-1 grid-rows-2 gap-[1.5em]">
                {blogPosts.slice(1, 3).map((post) => renderBlogPost(post, post.index))}
          </div>
        </div>

            {/* Fourth post - full width */}
            {blogPosts[3] && (
              <div className="mt-[1.5em]">
                {renderBlogPost(blogPosts[3], 3)}
              </div>
            )}
          </>
        )}
      </div>
    </section>
  );
};

export default RecentBlogs;
