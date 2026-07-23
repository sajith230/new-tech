import axios from "axios";
import { BlogPost, ForumApiResponse } from "../types";

const BLOG_CATEGORY_ID = 3; // "Blogs" category ID from the API

export const blogApi = {
  // Get all recent posts and filter for blog category
  async getRecentBlogs(page: number = 1): Promise<BlogPost[]> {
    try {
      // Use the local API route instead of direct forum API call to avoid CORS
      const response = await axios.get<ForumApiResponse>(
        `/api/forum/recent?page=${page}`
      );
      
      // Filter topics that belong to the "Blogs" category (cid: 3)
      const blogPosts = response.data.topics.filter(
        (topic) => topic.category.name === "Blogs" || topic.cid === BLOG_CATEGORY_ID
      );
      
      // Debug: Log the first blog post to see what data is available
      if (blogPosts.length > 0) {
        console.log("Sample blog post data:", {
          title: blogPosts[0].titleRaw,
          tags: blogPosts[0].tags,
          category: blogPosts[0].category,
          user: blogPosts[0].user?.displayname,
          hasTagsArray: Array.isArray(blogPosts[0].tags),
          tagCount: blogPosts[0].tags?.length || 0
        });
      }
      
      return blogPosts;
    } catch (error) {
      console.error("Error fetching blog posts:", error);
      return [];
    }
  },

  // Get blog post content by topic ID
  async getBlogPostContent(tid: number): Promise<any> {
    try {
      const response = await axios.get(`/api/forum/topic/${tid}`);
      return response.data;
    } catch (error) {
      console.error("Error fetching blog post content:", error);
      return null;
    }
  },

  // Get all categories (Note: This would need a separate API route if needed)
  async getCategories(): Promise<any> {
    try {
      // For now, we can extract categories from the recent posts response
      console.log("Categories would be extracted from recent posts");
      return [];
    } catch (error) {
      console.error("Error fetching categories:", error);
      return [];
    }
  },

  // Format timestamp to readable date
  formatDate(timestamp: number): string {
    try {
      const date = new Date(timestamp);
      return date.toLocaleDateString("en-US", {
        weekday: "long",
        day: "numeric",
        month: "short",
        year: "numeric",
      });
    } catch (error) {
      return "Date unavailable";
    }
  },

  // Extract excerpt from content
  extractExcerpt(content: string, maxLength: number = 150): string {
    if (!content) return "No content available...";
    
    // Remove HTML tags if any
    const textContent = content.replace(/<[^>]*>/g, "");
    
    if (textContent.length <= maxLength) {
      return textContent;
    }
    
    return textContent.substring(0, maxLength).trim() + "...";
  },

  // Get default blog image (you can customize this)
  getDefaultBlogImage(): string {
    return "/images/sample-img.jpg"; // Using existing sample image
  },

  // Get blog tags as categories
  getBlogTags(post: BlogPost): string[] {
    const tags: string[] = [];
    
    // Try to get tags from the post.tags field (NodeBB returns tag objects)
    if (post.tags && Array.isArray(post.tags) && post.tags.length > 0) {
      const validTags: string[] = [];
      
      post.tags.forEach(tag => {
        let tagValue: string | null = null;
        
        // Handle both string tags and NodeBB tag objects
        if (typeof tag === 'string') {
          tagValue = (tag as string).trim();
        } else if (tag && typeof tag === 'object' && 'value' in tag && tag.value) {
          tagValue = String((tag as any).value).trim();
        }
        
        if (tagValue && tagValue.length > 0) {
          validTags.push(tagValue);
        }
      });
      
      tags.push(...validTags);
    }
    
    // Only return real tags from the forum API - no hardcoded fallbacks
    
    // Remove duplicates and return
    return [...new Set(tags)];
  }
};
